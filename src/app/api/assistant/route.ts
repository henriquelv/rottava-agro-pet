import { createHash } from "node:crypto";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { NextResponse } from "next/server";
import { z } from "zod";
import { listProducts } from "@/lib/db";
import { factualBenefits, rankCatalog, type ShoppingProfile } from "@/lib/catalog-guidance";

const RequestSchema = z.object({
  message: z.string().trim().min(2).max(600),
  productIds: z.array(z.string()).max(6).default([]),
  profile: z.object({
    pet: z.enum(["cao", "gato", "geral"]).optional(),
    lifeStage: z.string().max(40).optional(),
    size: z.string().max(40).optional(),
    need: z.string().max(60).optional(),
    detail: z.string().max(160).optional(),
  }).optional(),
  history: z.array(z.object({ role: z.enum(["user", "assistant"]), text: z.string().max(600) })).max(8).default([]),
});

const AssistantSchema = z.object({
  answer: z.string(),
  productIds: z.array(z.string()).max(3),
  benefits: z.array(z.object({ productId: z.string(), items: z.array(z.string()).max(3) })).max(3),
  suggestedQuestions: z.array(z.string()).max(3),
  needsHuman: z.boolean(),
});

const windowMs = 60_000;
const requests = new Map<string, { count: number; expiresAt: number }>();

function fingerprint(request: Request) {
  const source = `${request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local"}|${request.headers.get("user-agent") ?? "unknown"}`;
  return createHash("sha256").update(source).digest("hex");
}

function withinRateLimit(id: string) {
  const now = Date.now();
  const current = requests.get(id);
  if (!current || current.expiresAt < now) {
    requests.set(id, { count: 1, expiresAt: now + windowMs });
    return true;
  }
  current.count += 1;
  return current.count <= 12;
}

function fallback(products: Awaited<ReturnType<typeof listProducts>>, message: string) {
  return {
    answer: products.length
      ? `Entendi sua dúvida sobre “${message}”. Separei os pontos que o catálogo confirma para você comparar com calma. Se houver uma necessidade de saúde, confirme a escolha com um médico-veterinário.`
      : "Não encontrei uma opção segura no catálogo para responder agora. Posso encaminhar sua dúvida para a equipe da loja.",
    productIds: products.slice(0, 3).map((product) => product.id),
    benefits: products.slice(0, 3).map((product) => ({ productId: product.id, items: factualBenefits(product) })),
    suggestedQuestions: ["Qual tem o menor preço?", "Quais tamanhos estão cadastrados?", "Quero falar com a equipe"],
    needsHuman: products.length === 0,
  };
}

export async function POST(request: Request) {
  const id = fingerprint(request);
  if (!withinRateLimit(id)) return NextResponse.json({ message: "Muitas perguntas em sequência. Aguarde um instante." }, { status: 429 });

  const parsed = RequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Pergunta inválida." }, { status: 400 });

  const allProducts = await listProducts();
  const requested = parsed.data.productIds.map((productId) => allProducts.find((product) => product.id === productId)).filter((product): product is (typeof allProducts)[number] => Boolean(product));
  const ranked = rankCatalog(allProducts, { ...(parsed.data.profile as ShoppingProfile), detail: parsed.data.message }, 8);
  const candidates = [...requested, ...ranked].filter((product, index, items) => items.findIndex((item) => item.id === product.id) === index).slice(0, 8);
  if (!process.env.OPENAI_API_KEY) return NextResponse.json({ ...fallback(candidates, parsed.data.message), source: "catalog" });

  const catalog = candidates.map((product) => ({
    id: product.id,
    name: product.name,
    brand: product.brand,
    category: product.category_name,
    description: product.description,
    metadata: product.metadata,
    variants: product.variants.map((variant) => ({ id: variant.id, label: variant.label, priceCents: variant.price_cents, stockQuantity: variant.stock_quantity })),
  }));

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.parse({
      model: process.env.OPENAI_MODEL || "gpt-6-luna",
      store: false,
      safety_identifier: id,
      reasoning: { effort: "low" },
      max_output_tokens: 700,
      instructions: `Você é a assistente de compras da Rottava Pet Casa e Jardim. Fale em português do Brasil, com atenção, acolhimento e objetividade. Seja zelosa: primeiro entenda a necessidade, explique diferenças verificáveis e ajude a pessoa a decidir sem pressionar. Use somente os fatos no catálogo fornecido. Nunca invente benefício nutricional, indicação veterinária, desconto, estoque, prazo, frete, avaliação ou política. Preços são exibidos pela interface, então não os repita. Não diagnostique animais; diante de sintomas, alergias, doenças, medicação ou troca terapêutica, recomende avaliação veterinária e marque needsHuman quando a equipe também precisar confirmar algo. Você pode sugerir no máximo três IDs existentes no catálogo recebido. Benefícios devem ser pontos de adequação ou comparação comprovados pelos campos recebidos. Termine com uma pergunta curta que faça a conversa avançar.`,
      input: JSON.stringify({ question: parsed.data.message, profile: parsed.data.profile, recentHistory: parsed.data.history, catalog }),
      text: { format: zodTextFormat(AssistantSchema, "rottava_shopping_guidance") },
    });
    const result = response.output_parsed;
    if (!result) return NextResponse.json({ ...fallback(candidates, parsed.data.message), source: "catalog" });
    const allowed = new Set(candidates.map((product) => product.id));
    return NextResponse.json({
      answer: result.answer,
      productIds: result.productIds.filter((productId) => allowed.has(productId)).slice(0, 3),
      benefits: result.benefits.filter((benefit) => allowed.has(benefit.productId)).map((benefit) => ({ ...benefit, items: benefit.items.slice(0, 3) })),
      suggestedQuestions: result.suggestedQuestions.slice(0, 3),
      needsHuman: result.needsHuman,
      source: "openai",
    });
  } catch (error) {
    console.error("assistant_response_failed", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ ...fallback(candidates, parsed.data.message), source: "catalog" });
  }
}
