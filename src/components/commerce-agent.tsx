"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowRight, Check, Send, ShoppingBag, Sparkles } from "@/components/icons";
import type { Product } from "@/lib/catalog-types";
import { money } from "@/lib/format";
import { useCart } from "@/components/cart";

type Prompt = { label: string; query: string };

const prompts: Prompt[] = [
  { label: "Ração para cachorro", query: "Preciso de ração para um cachorro" },
  { label: "Cuidados para gatos", query: "Quero opções de cuidados para gatos" },
  { label: "Casa e jardim", query: "O que vocês têm para casa e jardim?" },
  { label: "Banho e tosa", query: "Quero agendar banho e tosa" },
];

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function findProducts(products: Product[], rawQuery: string) {
  const query = normalize(rawQuery);
  const terms = query.split(/\s+/).filter((term) => term.length > 2);
  const expansions = [
    { match: ["cao", "cachorro", "racao"], terms: ["cao", "cachorro", "racao", "pet"] },
    { match: ["gato", "felino", "sache"], terms: ["gato", "felino", "sache", "pet"] },
    { match: ["jardim", "casa", "planta", "horta", "vaso"], terms: ["jardim", "casa", "planta", "horta", "vaso"] },
    { match: ["cuidado", "banho", "higiene", "escova", "shampoo"], terms: ["cuidado", "banho", "higiene", "escova", "shampoo"] },
  ];
  const vocabulary = new Set(terms);
  expansions.forEach((group) => {
    if (group.match.some((term) => query.includes(term))) group.terms.forEach((term) => vocabulary.add(term));
  });

  const ranked = products.map((product) => {
    const corpus = normalize(`${product.name} ${product.brand || ""} ${product.category_name || ""} ${product.description || ""} ${product.variants.map((variant) => variant.label).join(" ")}`);
    const score = [...vocabulary].reduce((total, term) => total + (corpus.includes(term) ? (product.name && normalize(product.name).includes(term) ? 4 : 1) : 0), 0);
    return { product, score };
  }).sort((a, b) => b.score - a.score || (a.product.min_price_cents || 0) - (b.product.min_price_cents || 0));

  const matched = ranked.filter((item) => item.score > 0).slice(0, 3).map((item) => item.product);
  return { products: matched.length ? matched : ranked.slice(0, 3).map((item) => item.product), exact: matched.length > 0 };
}

export function CommerceAgent({ products, demo }: { products: Product[]; demo: boolean }) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [selection, setSelection] = useState<Record<string, string>>({});
  const [added, setAdded] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const auraX = useSpring(pointerX, { stiffness: 90, damping: 24 });
  const auraY = useSpring(pointerY, { stiffness: 90, damping: 24 });
  const cart = useCart();
  const answer = useMemo(() => findProducts(products, submittedQuery), [products, submittedQuery]);
  const visible = submittedQuery ? answer.products : products.slice(0, 3);
  const serviceIntent = normalize(submittedQuery).includes("banho") || normalize(submittedQuery).includes("tosa");

  function ask(value: string) {
    const next = value.trim();
    if (!next) return;
    setQuery(next);
    setIsThinking(true);
    window.setTimeout(() => {
      setSubmittedQuery(next);
      setIsThinking(false);
    }, reduced ? 0 : 420);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(query);
  }

  function addProduct(product: Product) {
    const variant = product.variants.find((item) => item.id === selection[product.id]) || product.variants[0];
    if (!variant || variant.stock_quantity === 0) return;
    cart.add({ variantId: variant.id, productSlug: product.slug, name: product.name, variant: variant.label, priceCents: variant.price_cents, imageUrl: product.images[0] || product.image_url }, { open: true });
    setAdded(product.id);
    window.setTimeout(() => setAdded(null), 1500);
  }

  return <section
    className="commerce-agent-hero"
    aria-labelledby="agent-title"
    onPointerMove={(event) => {
      if (reduced) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      pointerX.set(event.clientX - bounds.left - 170);
      pointerY.set(event.clientY - bounds.top - 170);
    }}
  >
    <motion.div className="agent-aura" aria-hidden="true" style={{ x: auraX, y: auraY }} />
    <div className="agent-word" aria-hidden="true">{"ROTTAVA".split("").map((letter, index) => <motion.span key={`${letter}-${index}`} initial={reduced ? false : { y: index % 2 ? -30 : 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .05 * index, duration: .65, ease: [.16, 1, .3, 1] }}>{letter}</motion.span>)}</div>
    <div className="agent-intro">
      <span className="agent-kicker"><Sparkles aria-hidden="true" /> AGENTE ROTTAVA · COMPRA ASSISTIDA</span>
      <h1 id="agent-title">Diga o que está<br />faltando <em>por aí.</em></h1>
      <p>O agente consulta o catálogo, aproxima as opções e coloca a variante escolhida no seu carrinho. Você revisa tudo antes de confirmar.</p>
      <div className="agent-facts" aria-label="Como o agente trabalha"><span><b>01</b> Você conta</span><span><b>02</b> Ele encontra</span><span><b>03</b> Você decide</span></div>
      <Link className="agent-skip" href="/produtos">Prefiro explorar o catálogo <ArrowRight aria-hidden="true" /></Link>
    </div>

    <div className="agent-console">
      <header><div className="agent-mark"><span>R</span><i /></div><div><b>Agente de compra</b><small><i /> conectado ao catálogo</small></div><span className="agent-cart-count"><ShoppingBag aria-hidden="true" /> {cart.count}</span></header>
      <div className="agent-conversation" aria-live="polite">
        <div className="agent-message"><span>R</span><p>Olá! O que você precisa encontrar hoje?</p></div>
        <AnimatePresence mode="wait">
          {isThinking ? <motion.div key="thinking" className="agent-thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><i /><i /><i /><span>Consultando produtos e variantes…</span></motion.div> : submittedQuery ? <motion.div key={submittedQuery} className="agent-response" initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -8 }}>
            <small>VOCÊ PEDIU</small><q>{submittedQuery}</q>
            <p>{serviceIntent ? "Para serviço, vou levar você à solicitação de horário. Nenhum preço ou agenda será inventado." : answer.exact ? `Encontrei ${answer.products.length} ${answer.products.length === 1 ? "opção próxima" : "opções próximas"} no catálogo.` : "Não achei uma correspondência exata. Separei itens disponíveis para você continuar."}</p>
          </motion.div> : null}
        </AnimatePresence>
      </div>

      {!submittedQuery && <div className="agent-prompts">{prompts.map((prompt, index) => <motion.button key={prompt.label} onClick={() => ask(prompt.query)} whileHover={reduced ? undefined : { x: 4 }} whileTap={reduced ? undefined : { scale: .98 }}><span>0{index + 1}</span>{prompt.label}<ArrowRight aria-hidden="true" /></motion.button>)}</div>}

      {serviceIntent && !isThinking ? <motion.div className="agent-service-result" initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><div><small>SERVIÇO</small><b>Banho & tosa</b><p>Conte sobre seu pet e envie uma solicitação para a equipe confirmar.</p></div><Link href="/banho-e-tosa">Solicitar horário <ArrowRight aria-hidden="true" /></Link></motion.div> : !isThinking && visible.length > 0 && <motion.div layout className="agent-results">
        {visible.map((product, index) => {
          const variant = product.variants.find((item) => item.id === selection[product.id]) || product.variants[0];
          const image = product.images[0] || product.image_url;
          return <motion.article layout key={product.id} initial={reduced ? false : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduced ? 0 : index * .07 }}>
            <Link href={`/produto/${product.slug}`} className="agent-product-image">{image ? <Image src={image} alt={product.name} fill sizes="120px" unoptimized={image.startsWith("http")} /> : <span>R</span>}</Link>
            <div><small>{product.brand || product.category_name}</small><Link href={`/produto/${product.slug}`}><b>{product.name}</b></Link>{product.variants.length > 1 ? <label><span className="sr-only">Opção de {product.name}</span><select value={variant?.id} onChange={(event) => setSelection((current) => ({ ...current, [product.id]: event.target.value }))}>{product.variants.map((option) => <option key={option.id} value={option.id} disabled={option.stock_quantity === 0}>{option.label} · {money(option.price_cents)}</option>)}</select></label> : <span>{variant?.label}</span>}</div>
            <div className="agent-product-action"><strong>{money(variant?.price_cents)}</strong><button onClick={() => addProduct(product)} disabled={!variant || variant.stock_quantity === 0}>{added === product.id ? <Check aria-hidden="true" /> : <ShoppingBag aria-hidden="true" />}<span>{added === product.id ? "No carrinho" : "Adicionar"}</span></button></div>
          </motion.article>;
        })}
      </motion.div>}
      {!isThinking && !serviceIntent && visible.length === 0 && <div className="agent-empty"><small>CATÁLOGO EM SINCRONIZAÇÃO</small><b>Posso chamar a equipe.</b><p>A loja ainda não publicou produtos vendáveis. Não vou sugerir itens, preços ou estoque inexistentes.</p><Link href="/atendimento">Abrir atendimento <ArrowRight aria-hidden="true" /></Link></div>}

      <form className="agent-input" onSubmit={submit}><label className="sr-only" htmlFor="agent-query">O que você procura?</label><input id="agent-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex.: ração para um cão adulto" autoComplete="off" /><button aria-label="Encontrar no catálogo" disabled={!query.trim() || isThinking}><span>Encontrar</span><Send aria-hidden="true" /></button></form>
      <footer><span>{demo ? "Produtos e preços demonstrativos neste ambiente" : "Preços e disponibilidade vêm do catálogo ativo"}</span><span>Você confirma antes de comprar</span></footer>
    </div>
  </section>;
}
