import type { Product } from "./catalog-types";

export type ShoppingProfile = {
  pet?: "cao" | "gato" | "geral";
  lifeStage?: string;
  size?: string;
  need?: string;
  detail?: string;
};

const labels: Record<string, string> = {
  cao: "cães",
  gato: "gatos",
  geral: "pets em geral",
  filhote: "filhotes",
  adulto: "adultos",
  senior: "sênior",
  pequeno: "porte pequeno",
  medio: "porte médio",
  grande: "porte grande",
  racao: "alimentação seca",
  sache: "alimentação úmida",
  petisco: "petiscos",
};

export function normalizeSearch(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function rankCatalog(products: Product[], profile: ShoppingProfile, limit = 3) {
  const detailTerms = normalizeSearch(profile.detail ?? "").split(/\s+/).filter((term) => term.length > 2);
  return products.map((product) => {
    const metadata = product.metadata;
    const corpus = normalizeSearch([
      product.name,
      product.brand,
      product.category_name,
      product.description,
      metadata?.pet,
      metadata?.lifeStage,
      metadata?.size,
      metadata?.productType,
      metadata?.needs?.join(" "),
      metadata?.flavors?.join(" "),
      metadata?.tags?.join(" "),
      product.variants.map((variant) => variant.label).join(" "),
    ].filter(Boolean).join(" "));
    let score = 0;
    if (profile.pet && metadata?.pet === profile.pet) score += 12;
    if (profile.lifeStage && profile.lifeStage !== "qualquer" && metadata?.lifeStage === profile.lifeStage) score += 8;
    if (profile.size && profile.size !== "qualquer" && metadata?.size === profile.size) score += 5;
    if (profile.need && profile.need !== "qualquer" && metadata?.productType === profile.need) score += 7;
    for (const term of detailTerms) if (corpus.includes(term)) score += normalizeSearch(product.name).includes(term) ? 5 : 2;
    return { product, score };
  }).filter(({ product }) => !profile.pet || product.metadata?.pet === profile.pet || (profile.pet === "geral" && product.metadata?.pet === "geral"))
    .sort((a, b) => b.score - a.score || (a.product.min_price_cents ?? Infinity) - (b.product.min_price_cents ?? Infinity))
    .slice(0, limit)
    .map(({ product }) => product);
}

export function factualBenefits(product: Product) {
  const metadata = product.metadata;
  const facts: string[] = [];
  if (product.brand) facts.push(`Produto da marca ${product.brand}`);
  if (metadata?.lifeStage) facts.push(`Cadastro indicado para ${labels[metadata.lifeStage] ?? metadata.lifeStage}`);
  if (metadata?.size) facts.push(`Opção cadastrada para ${labels[metadata.size] ?? metadata.size}`);
  if (metadata?.flavors?.length) facts.push(`Sabores informados: ${metadata.flavors.slice(0, 2).join(" e ")}`);
  if (metadata?.needs?.length) facts.push(`Necessidade cadastrada: ${metadata.needs[0].replaceAll("-", " ")}`);
  if (product.variants.length > 1) facts.push(`${product.variants.length} tamanhos ou apresentações para comparar`);
  if (product.variants[0]?.label) facts.push(`Apresentação disponível: ${product.variants[0].label}`);
  return facts.slice(0, 3);
}

export function profileSummary(profile: ShoppingProfile) {
  return [profile.pet, profile.lifeStage, profile.size, profile.need]
    .filter((value) => value && value !== "qualquer")
    .map((value) => labels[value!] ?? value)
    .join(" · ");
}
