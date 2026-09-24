"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowBack, ArrowRight, BowlFood, Cat, Check, Dog, Scissors, Search, ShoppingBag } from "@/components/icons";
import type { Product } from "@/lib/catalog-types";
import { money } from "@/lib/format";
import { useCart } from "@/components/cart";
import { SelectMenu } from "@/components/select-menu";

type Pet = "cao" | "gato" | "geral";
type Answers = { pet?: Pet; lifeStage?: string; size?: string; need?: string; detail?: string };
type Choice = { value: string; label: string; note?: string };

const stages: Choice[] = [
  { value: "filhote", label: "Filhote", note: "crescimento" },
  { value: "adulto", label: "Adulto", note: "rotina diária" },
  { value: "senior", label: "Sênior", note: "idade madura" },
  { value: "qualquer", label: "Não tenho certeza", note: "mostrar opções amplas" },
];
const sizes: Choice[] = [
  { value: "pequeno", label: "Pequeno", note: "até cerca de 10 kg" },
  { value: "medio", label: "Médio", note: "aprox. 10 a 25 kg" },
  { value: "grande", label: "Grande", note: "acima de 25 kg" },
  { value: "qualquer", label: "Não sei", note: "posso comparar" },
];
const needs: Choice[] = [
  { value: "racao", label: "Alimentação diária", note: "ração seca" },
  { value: "sache", label: "Alimento úmido", note: "sachês e porções" },
  { value: "petisco", label: "Petiscos", note: "agrado e treino" },
  { value: "qualquer", label: "Quero comparar", note: "melhores combinações" },
];

function normalize(value: string) { return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); }

function rankProducts(products: Product[], answers: Answers) {
  return products.map((product) => {
    const metadata = product.metadata;
    const corpus = normalize(`${product.name} ${product.brand ?? ""} ${product.description ?? ""} ${metadata?.tags?.join(" ") ?? ""}`);
    let score = 0;
    if (answers.pet && metadata?.pet === answers.pet) score += 12;
    if (answers.lifeStage && answers.lifeStage !== "qualquer" && metadata?.lifeStage === answers.lifeStage) score += 8;
    if (answers.size && answers.size !== "qualquer" && metadata?.size === answers.size) score += 5;
    if (answers.need && answers.need !== "qualquer" && metadata?.productType === answers.need) score += 7;
    if (answers.detail) for (const term of normalize(answers.detail).split(/\s+/).filter((item) => item.length > 2)) if (corpus.includes(term)) score += 3;
    return { product, score };
  }).filter(({ product }) => !answers.pet || product.metadata?.pet === answers.pet || (answers.pet === "geral" && product.metadata?.pet === "geral"))
    .sort((a, b) => b.score - a.score || (a.product.min_price_cents ?? Infinity) - (b.product.min_price_cents ?? Infinity))
    .slice(0, 3).map(({ product }) => product);
}

function OptionGrid({ choices, onChoose }: { choices: Choice[]; onChoose: (value: string) => void }) {
  const reduced = useReducedMotion();
  return <motion.div className="agent-choice-grid" layout>{choices.map((choice, index) => <motion.button key={choice.value} onClick={() => onChoose(choice.value)} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : index * .045 }} whileTap={reduced ? undefined : { scale: .98 }}><span>{choice.label}</span>{choice.note && <small>{choice.note}</small>}<ArrowRight aria-hidden="true" /></motion.button>)}</motion.div>;
}

export function CommerceAgent({ products, signedIn = false }: { products: Product[]; signedIn?: boolean }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [history, setHistory] = useState<Answers[]>([]);
  const [detail, setDetail] = useState("");
  const [selection, setSelection] = useState<Record<string, string>>({});
  const [added, setAdded] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const cart = useCart();
  const results = useMemo(() => rankProducts(products, answers), [products, answers]);
  const step = !answers.pet ? "pet" : !answers.lifeStage && answers.pet !== "geral" ? "stage" : !answers.size && answers.pet === "cao" ? "size" : !answers.need ? "need" : "results";

  function update(next: Partial<Answers>) { setHistory((current) => [...current, answers]); setAnswers((current) => ({ ...current, ...next })); }
  function back() { const previous = history.at(-1); if (!previous) return; setAnswers(previous); setHistory((current) => current.slice(0, -1)); }
  function restart(pet?: Pet) { setHistory([]); setAnswers(pet ? { pet } : {}); setDetail(""); }
  function submitDetail(event: FormEvent) { event.preventDefault(); if (detail.trim()) setAnswers((current) => ({ ...current, detail: detail.trim() })); }
  function addProduct(product: Product) {
    const variant = product.variants.find((item) => item.id === selection[product.id]) ?? product.variants[0];
    if (!variant) return;
    cart.add({ variantId: variant.id, productSlug: product.slug, name: product.name, variant: variant.label, priceCents: variant.price_cents, imageUrl: product.images[0] || product.image_url });
    setAdded(product.id); window.setTimeout(() => setAdded(null), 1400);
  }

  return <div className="agent-home">
    <section className="commerce-agent-hero" aria-labelledby="agent-title">
      <div className="agent-intro">
        <span className="agent-kicker"><i aria-hidden="true" /> COMPRA ASSISTIDA · CATÁLOGO ROTTAVA</span>
        <h1 id="agent-title">Me conta sobre o seu pet. Eu cuido da busca.</h1>
        <p>Responda poucas perguntas e compare opções reais do catálogo. Você escolhe, revisa o carrinho e só então segue para o pagamento.</p>
        <div className="agent-facts" aria-label="Como funciona"><span><b>01</b> Perfil do pet</span><span><b>02</b> Curadoria</span><span><b>03</b> Compra revisável</span></div>
        <Link className="agent-skip" href="/produtos">Prefiro explorar sozinho <ArrowRight aria-hidden="true" /></Link>
      </div>

      <div className={`agent-console ${step === "results" ? "is-results" : ""}`}>
        <header><div className="agent-mark"><span>R</span><i /></div><div><b>Rottava, sua assistente de compra</b><small><i /> usando {products.length} produtos do catálogo</small></div><button className="agent-cart-count" onClick={cart.open} aria-label={`Abrir carrinho com ${cart.count} itens`}><ShoppingBag aria-hidden="true" /> {cart.count}</button></header>
        <div className="agent-conversation" aria-live="polite">
          <div className="agent-message"><span>R</span><p>{step === "pet" ? "Para quem vamos escolher hoje?" : step === "stage" ? `Qual é a fase de vida do seu ${answers.pet === "gato" ? "gato" : "cão"}?` : step === "size" ? "Qual é o porte dele?" : step === "need" ? "O que você quer resolver agora?" : `Separei três opções para ${answers.pet === "gato" ? "seu gato" : answers.pet === "cao" ? "seu cão" : "a rotina do seu pet"}.`}</p></div>
          {history.length > 0 && <button className="agent-back" onClick={back}><ArrowBack aria-hidden="true" /> Voltar uma pergunta</button>}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={step} initial={reduced ? false : { opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={reduced ? undefined : { opacity: 0, x: -12 }} transition={{ duration: .22 }}>
            {step === "pet" && <OptionGrid choices={[{ value: "cao", label: "Cão", note: "ração, petiscos e cuidado" }, { value: "gato", label: "Gato", note: "alimentação e rotina felina" }, { value: "geral", label: "Pet em geral", note: "acessórios e utilidades" }]} onChoose={(value) => update({ pet: value as Pet })} />}
            {step === "stage" && <OptionGrid choices={stages} onChoose={(value) => update({ lifeStage: value })} />}
            {step === "size" && <OptionGrid choices={sizes} onChoose={(value) => update({ size: value })} />}
            {step === "need" && <OptionGrid choices={needs} onChoose={(value) => update({ need: value })} />}
            {step === "results" && <div className="agent-result-stage">
              <form className="agent-detail" onSubmit={submitDetail}><Search aria-hidden="true" /><label className="sr-only" htmlFor="agent-detail">Raça, sabor ou detalhe opcional</label><input id="agent-detail" value={detail} onChange={(event) => setDetail(event.target.value)} placeholder="Raça, sabor ou detalhe (opcional)" /><button disabled={!detail.trim()}>Refinar</button></form>
              <div className="agent-results">{results.map((product, index) => {
                const variant = product.variants.find((item) => item.id === selection[product.id]) ?? product.variants[0];
                return <motion.article layout key={product.id} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : index * .07 }}>
                  <Link href={`/produto/${product.slug}`} className="agent-product-image"><span>{product.brand?.slice(0, 1) || "R"}</span><small>{product.metadata?.weight || product.category_name}</small></Link>
                  <div><small>{index === 0 ? "MELHOR COMBINAÇÃO" : product.brand || product.category_name}</small><Link href={`/produto/${product.slug}`}><b>{product.name}</b></Link>{product.variants.length > 1 ? <SelectMenu className="agent-variant-menu" label={`Opção de ${product.name}`} value={variant?.id || ""} onChange={(value) => setSelection((current) => ({ ...current, [product.id]: value }))} options={product.variants.map((option) => ({ value: option.id, label: `${option.label} · ${money(option.price_cents)}` }))} /> : <span>{variant?.label}</span>}</div>
                  <div className="agent-product-action"><strong>{money(variant?.price_cents)}</strong><button onClick={() => addProduct(product)}>{added === product.id ? <Check aria-hidden="true" /> : <ShoppingBag aria-hidden="true" />}<span>{added === product.id ? "Adicionado" : "Adicionar"}</span></button></div>
                </motion.article>;
              })}</div>
              <div className="agent-next"><button onClick={() => restart()}>Recomeçar</button>{cart.count > 0 && <Link href={signedIn ? "/checkout" : "/entrar?retorno=/checkout"}>Seguir para {signedIn ? "pagamento" : "identificação"} <ArrowRight /></Link>}</div>
            </div>}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>

    <section className="home-category-squares" aria-labelledby="category-title"><header><span>OU COMECE POR UMA CATEGORIA</span><h2 id="category-title">Quatro portas, uma mesma Rottava.</h2></header><div>
      <button onClick={() => restart("cao")}><Dog weight="light" /><span><b>Cães</b><small>{products.filter((item) => item.metadata?.pet === "cao").length} itens</small></span><ArrowRight /></button>
      <button onClick={() => restart("gato")}><Cat weight="light" /><span><b>Gatos</b><small>{products.filter((item) => item.metadata?.pet === "gato").length} itens</small></span><ArrowRight /></button>
      <button onClick={() => restart("geral")}><BowlFood weight="light" /><span><b>Pet em geral</b><small>{products.filter((item) => item.metadata?.pet === "geral").length} itens</small></span><ArrowRight /></button>
      <Link href="/banho-e-tosa"><Scissors weight="light" /><span><b>Banho & tosa</b><small>solicitar cuidado</small></span><ArrowRight /></Link>
    </div></section>
  </div>;
}
