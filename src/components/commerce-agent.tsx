"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowBack, ArrowRight, Check, LoaderCircle, Search, Send, ShoppingBag } from "@/components/icons";
import type { Product } from "@/lib/catalog-types";
import { factualBenefits, profileSummary, rankCatalog, type ShoppingProfile } from "@/lib/catalog-guidance";
import { money } from "@/lib/format";
import { useCart } from "@/components/cart";
import { SelectMenu } from "@/components/select-menu";

type Pet = "cao" | "gato" | "geral";
type Answers = ShoppingProfile;
type Choice = { value: string; label: string; note?: string };
type AssistantReply = { answer: string; productIds: string[]; benefits: { productId: string; items: string[] }[]; suggestedQuestions: string[]; needsHuman: boolean; source: "openai" | "catalog" };

const stages: Choice[] = [
  { value: "filhote", label: "Filhote", note: "crescimento" },
  { value: "adulto", label: "Adulto", note: "rotina diária" },
  { value: "senior", label: "Sênior", note: "idade madura" },
  { value: "qualquer", label: "Não tenho certeza", note: "vamos comparar" },
];
const sizes: Choice[] = [
  { value: "pequeno", label: "Pequeno", note: "até cerca de 10 kg" },
  { value: "medio", label: "Médio", note: "aprox. 10 a 25 kg" },
  { value: "grande", label: "Grande", note: "acima de 25 kg" },
  { value: "qualquer", label: "Não sei", note: "posso orientar" },
];
const needs: Choice[] = [
  { value: "racao", label: "Alimentação diária", note: "ração seca" },
  { value: "sache", label: "Alimento úmido", note: "sachês e porções" },
  { value: "petisco", label: "Petiscos", note: "agrado e treino" },
  { value: "qualquer", label: "Quero comparar", note: "ver diferenças" },
];

function OptionGrid({ choices, onChoose }: { choices: Choice[]; onChoose: (value: string) => void }) {
  const reduced = useReducedMotion();
  return <motion.div className="agent-choice-grid" layout>{choices.map((choice, index) => <motion.button key={choice.value} onClick={() => onChoose(choice.value)} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : index * .045 }} whileTap={reduced ? undefined : { scale: .98 }}><span>{choice.label}</span>{choice.note && <small>{choice.note}</small>}<ArrowRight aria-hidden="true" /></motion.button>)}</motion.div>;
}

export function CommerceAgent({ products, signedIn = false }: { products: Product[]; signedIn?: boolean }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [history, setHistory] = useState<Answers[]>([]);
  const [question, setQuestion] = useState("");
  const [selection, setSelection] = useState<Record<string, string>>({});
  const [added, setAdded] = useState<string | null>(null);
  const [reply, setReply] = useState<AssistantReply | null>(null);
  const [asking, setAsking] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const reduced = useReducedMotion();
  const cart = useCart();
  const ranked = useMemo(() => rankCatalog(products, answers), [products, answers]);
  const results = useMemo(() => reply?.productIds.length ? reply.productIds.map((id) => products.find((product) => product.id === id)).filter((product): product is Product => Boolean(product)) : ranked, [products, ranked, reply]);
  const step = !answers.pet ? "pet" : !answers.lifeStage && answers.pet !== "geral" ? "stage" : !answers.size && answers.pet === "cao" ? "size" : !answers.need ? "need" : "results";

  function clearAdvice() { setReply(null); setQuestion(""); setShowComparison(false); }
  function update(next: Partial<Answers>) { setHistory((current) => [...current, answers]); setAnswers((current) => ({ ...current, ...next })); clearAdvice(); }
  function back() { const previous = history.at(-1); if (!previous) return; setAnswers(previous); setHistory((current) => current.slice(0, -1)); clearAdvice(); }
  function restart(pet?: Pet) { setHistory([]); setAnswers(pet ? { pet } : {}); clearAdvice(); document.querySelector("#assistente")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); }

  async function askAssistant(value: string) {
    const message = value.trim();
    if (!message || asking) return;
    setQuestion(message); setAsking(true);
    try {
      const response = await fetch("/api/assistant", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ message, profile: answers, productIds: ranked.map((product) => product.id) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Não foi possível responder agora.");
      setReply(data);
    } catch {
      setReply({ answer: "Não consegui consultar a orientação agora. Os produtos abaixo continuam vindo do catálogo; se a dúvida for decisiva, fale com a equipe.", productIds: ranked.map((product) => product.id), benefits: ranked.map((product) => ({ productId: product.id, items: factualBenefits(product) })), suggestedQuestions: [], needsHuman: true, source: "catalog" });
    } finally { setAsking(false); }
  }

  function submitQuestion(event: FormEvent) { event.preventDefault(); void askAssistant(question); }
  function addProduct(product: Product) {
    const variant = product.variants.find((item) => item.id === selection[product.id]) ?? product.variants[0];
    if (!variant || variant.stock_quantity === 0) return;
    cart.add({ variantId: variant.id, productSlug: product.slug, name: product.name, variant: variant.label, priceCents: variant.price_cents, imageUrl: product.images[0] || product.image_url });
    setAdded(product.id); window.setTimeout(() => setAdded(null), 1400);
  }

  return <div className="agent-home">
    <section id="assistente" className="commerce-agent-hero" aria-labelledby="agent-title">
      <div className="agent-intro">
        <span className="agent-kicker"><i aria-hidden="true" /> COMPRA ASSISTIDA · CATÁLOGO ROTTAVA</span>
        <h1 id="agent-title">Escolher bem começa por escutar.</h1>
        <p>Conte um pouco sobre o seu pet. A Rottava compara o que existe no catálogo, explica diferenças e deixa a decisão final com você.</p>
        <div className="agent-facts" aria-label="Como funciona"><span><b>01</b> Entende a rotina</span><span><b>02</b> Compara opções</span><span><b>03</b> Acompanha a compra</span></div>
        <Link className="agent-skip" href="/produtos">Prefiro explorar sozinho <ArrowRight aria-hidden="true" /></Link>
      </div>

      <div className={`agent-console ${step === "results" ? "is-results" : ""}`}>
        <header><div className="agent-mark"><span>R</span><i /></div><div><b>Rottava, sua assistente de compra</b><small><i /> consulta produtos e variantes reais</small></div><button className="agent-cart-count" onClick={cart.open} aria-label={`Abrir carrinho com ${cart.count} itens`}><ShoppingBag aria-hidden="true" /> {cart.count}</button></header>
        <div className="agent-conversation" aria-live="polite">
          <div className="agent-message"><span>R</span><p>{step === "pet" ? "Oi! Para quem vamos escolher hoje?" : step === "stage" ? `Qual é a fase de vida do seu ${answers.pet === "gato" ? "gato" : "cão"}?` : step === "size" ? "Qual é o porte dele?" : step === "need" ? "O que você quer cuidar primeiro?" : reply?.answer ?? `Entendi: ${profileSummary(answers) || "vamos comparar"}. Separei opções e os pontos que vale observar.`}</p></div>
          {history.length > 0 && <button className="agent-back" onClick={back}><ArrowBack aria-hidden="true" /> Voltar</button>}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={step} initial={reduced ? false : { opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={reduced ? undefined : { opacity: 0, x: -12 }} transition={{ duration: .22 }}>
            {step === "pet" && <OptionGrid choices={[{ value: "cao", label: "Cão", note: "alimentação e cuidado" }, { value: "gato", label: "Gato", note: "rotina felina" }, { value: "geral", label: "Pet em geral", note: "acessórios e utilidades" }]} onChoose={(value) => update({ pet: value as Pet })} />}
            {step === "stage" && <OptionGrid choices={stages} onChoose={(value) => update({ lifeStage: value })} />}
            {step === "size" && <OptionGrid choices={sizes} onChoose={(value) => update({ size: value })} />}
            {step === "need" && <OptionGrid choices={needs} onChoose={(value) => update({ need: value })} />}
            {step === "results" && <div className="agent-result-stage">
              <form className="agent-detail" onSubmit={submitQuestion}><Search aria-hidden="true" /><label className="sr-only" htmlFor="agent-detail">Pergunte sobre os produtos</label><input id="agent-detail" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Pergunte sobre diferenças, tamanhos ou benefícios…" maxLength={600} /><button disabled={!question.trim() || asking}>{asking ? <LoaderCircle className="spin" /> : <><span>Perguntar</span><Send /></>}</button></form>
              <div className="agent-result-tools"><span>{results.length} opções para comparar</span><button onClick={() => setShowComparison((value) => !value)} aria-expanded={showComparison}>{showComparison ? "Fechar comparação" : "Comparar lado a lado"}</button></div>
              {showComparison && <div className="agent-comparison" role="region" aria-label="Tabela comparativa de produtos">{results.map((product) => { const variant = product.variants.find((item) => item.id === selection[product.id]) ?? product.variants[0]; return <article key={product.id}><b>{product.name}</b><dl><div><dt>Marca</dt><dd>{product.brand || "Não informada"}</dd></div><div><dt>Perfil</dt><dd>{[product.metadata?.lifeStage, product.metadata?.size].filter(Boolean).join(" · ") || product.category_name || "Geral"}</dd></div><div><dt>Opção</dt><dd>{variant?.label || "A confirmar"}</dd></div><div><dt>Preço</dt><dd>{money(variant?.price_cents)}</dd></div></dl></article>; })}</div>}
              <div className="agent-results">{results.map((product, index) => {
                const variant = product.variants.find((item) => item.id === selection[product.id]) ?? product.variants[0];
                const benefits = reply?.benefits.find((item) => item.productId === product.id)?.items ?? factualBenefits(product);
                const image = product.images[0] || product.image_url;
                return <motion.article layout key={product.id} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : index * .07 }}>
                  <Link href={`/produto/${product.slug}`} className="agent-product-image">{image ? <Image src={image} alt="" fill sizes="72px" unoptimized={image.startsWith("http")} /> : <span>{product.brand?.slice(0, 1) || "R"}</span>}</Link>
                  <div className="agent-product-copy"><small>{index === 0 ? "MAIS PRÓXIMA DO PERFIL" : product.brand || product.category_name}</small><Link href={`/produto/${product.slug}`}><b>{product.name}</b></Link>{benefits.length > 0 && <ul>{benefits.slice(0, 2).map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>}{product.variants.length > 1 ? <SelectMenu className="agent-variant-menu" label={`Opção de ${product.name}`} value={variant?.id || ""} onChange={(value) => setSelection((current) => ({ ...current, [product.id]: value }))} options={product.variants.map((option) => ({ value: option.id, label: `${option.label} · ${money(option.price_cents)}`, disabled: option.stock_quantity === 0 }))} /> : <span>{variant?.label}</span>}</div>
                  <div className="agent-product-action"><strong>{money(variant?.price_cents)}</strong><button onClick={() => addProduct(product)} disabled={!variant || variant.stock_quantity === 0}>{added === product.id ? <Check aria-hidden="true" /> : <ShoppingBag aria-hidden="true" />}<span>{added === product.id ? "Adicionado" : "Adicionar"}</span></button></div>
                </motion.article>;
              })}</div>
              {reply?.suggestedQuestions.length ? <div className="agent-followups" aria-label="Perguntas sugeridas">{reply.suggestedQuestions.map((item) => <button key={item} onClick={() => void askAssistant(item)}>{item}</button>)}</div> : null}
              {reply?.needsHuman && <Link className="agent-human-link" href="/atendimento">Quer confirmação da equipe? Continuar no atendimento <ArrowRight /></Link>}
              <div className="agent-next"><button onClick={() => restart()}>Recomeçar</button>{cart.count > 0 && <Link href={signedIn ? "/checkout" : "/entrar?retorno=/checkout"}>Seguir para {signedIn ? "pagamento" : "identificação"} <ArrowRight /></Link>}</div>
            </div>}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  </div>;
}
