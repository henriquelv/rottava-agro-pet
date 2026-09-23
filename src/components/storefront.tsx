"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, Check, LoaderCircle, Send, PawPrint, Leaf, Sparkles } from "lucide-react";
import type { Product } from "@/lib/db";
import { money } from "@/lib/format";
import { useCart } from "./cart";

export function ProductCard({ product }: { product: Product }) {
  const variant = product.variants[0];
  return <article className="product-card">
    <Link href={`/produto/${product.slug}`} className="product-image">{product.image_url ? <Image unoptimized src={product.image_url} alt="" fill sizes="(max-width: 700px) 50vw, 25vw" /> : <ProductArt product={product} />}</Link>
    <div className="product-meta"><span>{product.category_name || "Pet"}{product.brand && ` · ${product.brand}`}</span><h3><Link href={`/produto/${product.slug}`}>{product.name}</Link></h3><div><b>{money(product.min_price_cents)}</b>{variant && <QuickAdd product={product} variant={variant} />}</div></div>
  </article>;
}

function ProductArt({ product }: { product: Product }) {
  const category = product.category_name || "Pet";
  const Icon = category.includes("Jardim") ? Leaf : category === "Cuidados" ? Sparkles : PawPrint;
  return <span className={`image-placeholder product-art ${category.includes("Jardim") ? "garden" : category === "Cuidados" ? "care" : "pet"}`}><i /><Icon /><small>COLEÇÃO DEMO</small><b>{product.name.split(" ").slice(0, 2).join(" ")}</b></span>;
}

function QuickAdd({ product, variant }: { product: Product; variant: Product["variants"][number] }) {
  const { add } = useCart(); const [done, setDone] = useState(false);
  return <button className="round-add" onClick={() => { add({ variantId: variant.id, productSlug: product.slug, name: product.name, variant: variant.label, priceCents: variant.price_cents, imageUrl: product.image_url }); setDone(true); setTimeout(() => setDone(false), 1400); }} aria-label={`Adicionar ${product.name} ao carrinho`}>{done ? <Check size={17} /> : <Plus size={18} />}</button>;
}

export function ProductBuy({ product }: { product: Product }) {
  const [selected, setSelected] = useState(product.variants[0]?.id || ""); const [done, setDone] = useState(false); const { add } = useCart();
  const variant = product.variants.find((v) => v.id === selected);
  if (!variant) return <p className="unavailable">Este produto não possui uma variante vendável no momento.</p>;
  return <div className="buy-box"><fieldset><legend>Escolha a variação</legend><div className="variant-grid">{product.variants.map((v) => <button type="button" className={selected === v.id ? "selected" : ""} key={v.id} onClick={() => setSelected(v.id)}><span>{v.label}</span><b>{money(v.price_cents)}</b></button>)}</div></fieldset>
    <div className="buy-row"><div><small>Valor atual</small><strong>{money(variant.price_cents)}</strong><span>{variant.stock_quantity == null ? "Disponibilidade confirmada no pedido" : variant.stock_quantity > 0 ? "Disponível" : "Indisponível"}</span></div><button className="button primary" disabled={variant.stock_quantity === 0} onClick={() => { add({ variantId: variant.id, productSlug: product.slug, name: product.name, variant: variant.label, priceCents: variant.price_cents, imageUrl: product.image_url }); setDone(true); }}>{done ? <><Check /> Adicionado</> : <><ShoppingBag /> Adicionar</>}</button></div>
    {done && <Link className="text-link" href="/carrinho">Revisar carrinho <ArrowRight size={16} /></Link>}
  </div>;
}

export function CartView({ signedIn }: { signedIn: boolean }) {
  const cart = useCart();
  if (!cart.items.length) return <div className="empty-cart"><ShoppingBag /><h2>Seu carrinho está leve</h2><p>Descubra o que faz sentido para a rotina do seu companheiro.</p><Link className="button primary" href="/produtos">Explorar produtos</Link></div>;
  return <div className="cart-layout"><div className="cart-list">{cart.items.map((item) => <article className="cart-line" key={item.variantId}><div className="cart-thumb">{item.imageUrl ? <Image src={item.imageUrl} alt="" fill /> : <span>R</span>}</div><div><span>Produto</span><h3>{item.name}</h3><p>{item.variant}</p><b>{money(item.priceCents)}</b></div><div className="quantity"><button onClick={() => cart.update(item.variantId, item.quantity - 1)} aria-label="Diminuir"><Minus /></button><output>{item.quantity}</output><button onClick={() => cart.update(item.variantId, item.quantity + 1)} aria-label="Aumentar"><Plus /></button></div><button className="trash" onClick={() => cart.update(item.variantId, 0)} aria-label="Remover"><Trash2 /></button></article>)}</div>
    <aside className="order-summary"><span className="eyebrow">RESUMO</span><dl><div><dt>Subtotal</dt><dd>{money(cart.subtotal)}</dd></div><div><dt>Frete</dt><dd>Calculado no checkout</dd></div><div className="total"><dt>Total parcial</dt><dd>{money(cart.subtotal)}</dd></div></dl><p>Estoque, preço e entrega serão revalidados antes do pedido.</p><Link className="button primary wide" href={signedIn ? "/checkout" : "/entrar?retorno=/checkout"}>{signedIn ? "Finalizar compra" : "Entrar para continuar"}<ArrowRight /></Link><Link className="button ghost wide" href="/atendimento">Continuar com atendimento</Link></aside>
  </div>;
}

export function CheckoutView() {
  const cart = useCart(); const router = useRouter(); const idempotencyKey = useRef(crypto.randomUUID()); const [mode, setMode] = useState<"pickup" | "delivery">("pickup"); const [payment, setPayment] = useState<"in_person" | "pix" | "card">("in_person"); const [state, setState] = useState<"idle" | "loading" | "error">("idle"); const [message, setMessage] = useState("");
  async function submit() {
    setState("loading"); setMessage("");
    const response = await fetch("/api/orders", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ items: cart.items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })), fulfillmentMode: mode, paymentMode: payment, idempotencyKey: idempotencyKey.current }) });
    const result = await response.json();
    if (!response.ok) { setState("error"); setMessage(result.message || "Não foi possível confirmar."); return; }
    cart.clear(); router.push(`/pedido/${result.order.id}/confirmacao`);
  }
  return <div className="checkout-layout"><section className="checkout-steps"><div className="step"><span>01</span><div><h2>Como deseja receber?</h2><div className="choice-grid"><button className={mode === "pickup" ? "selected" : ""} onClick={() => setMode("pickup")}><b>Retirar na loja</b><small>Disponível após confirmação</small></button><button className={mode === "delivery" ? "selected" : ""} onClick={() => setMode("delivery")}><b>Entrega própria</b><small>Cobertura ainda não configurada</small></button></div></div></div><div className="step"><span>02</span><div><h2>Forma de pagamento</h2><div className="choice-grid"><button className={payment === "in_person" ? "selected" : ""} onClick={() => setPayment("in_person")}><b>Presencial</b><small>Saldo a receber; não significa pago</small></button><button disabled><b>Pix</b><small>Gateway ainda não homologado</small></button><button disabled><b>Cartão</b><small>Gateway ainda não homologado</small></button></div></div></div></section><aside className="order-summary"><span className="eyebrow">REVISÃO</span><dl><div><dt>{cart.count} {cart.count === 1 ? "item" : "itens"}</dt><dd>{money(cart.subtotal)}</dd></div><div><dt>Recebimento</dt><dd>{mode === "pickup" ? "Retirada" : "Entrega"}</dd></div><div className="total"><dt>Total</dt><dd>{money(cart.subtotal)}</dd></div></dl>{mode === "delivery" && <p className="form-error">A loja ainda precisa configurar cobertura e frete. Selecione retirada.</p>}{message && <p className="form-error">{message}</p>}<button className="button primary wide" disabled={!cart.items.length || mode === "delivery" || state === "loading"} onClick={submit}>{state === "loading" ? <LoaderCircle className="spin" /> : "Confirmar pedido"}</button><p>Ao confirmar, um único pedido será criado e o estoque ficará sujeito à validação da loja.</p></aside></div>;
}

export function ChatView({ products = [] }: { products?: Product[] }) {
  const [messages, setMessages] = useState([{ who: "bot", text: "Olá! Eu sou o atendimento digital da Rottava. Posso ajudar a encontrar produtos, organizar seu carrinho ou encaminhar você para a equipe." }]);
  const [human, setHuman] = useState(false); const [text, setText] = useState(""); const [showProducts, setShowProducts] = useState(false); const cart = useCart();
  function action(value: string) {
    const lower = value.toLowerCase(); const wantsProducts = lower.includes("produto") || lower.includes("ração") || lower.includes("brinquedo");
    setMessages((m) => [...m, { who: "user", text: value }, { who: "bot", text: value === "Falar com uma pessoa" ? "Certo. A automação foi pausada e sua conversa entrou na fila da equipe. O horário real de atendimento ainda precisa ser configurado." : wantsProducts ? "Encontrei estas opções no mesmo catálogo usado pelo site. Você pode adicionar ao carrinho sem sair da conversa." : value === "Meus pedidos" ? "Entre na sua conta para consultar apenas os pedidos vinculados à sua identidade." : "Posso ajudar com produtos, banho e tosa ou encaminhar você para uma pessoa." }]);
    if (value === "Falar com uma pessoa") setHuman(true); if (wantsProducts) setShowProducts(true);
  }
  return <div className="chat-shell"><header><div className="bot-avatar">R</div><div><b>{human ? "Fila de atendimento" : "Assistente Rottava"}</b><small>{human ? "Automação pausada" : "Consulta o mesmo catálogo do site"}</small></div><span className="chat-cart"><ShoppingBag />{cart.count}</span></header><div className="messages" aria-live="polite">{messages.map((m, i) => <div key={i} className={`message ${m.who}`}>{m.text}</div>)}{showProducts && <div className="chat-products">{products.map((product) => { const variant = product.variants[0]; return <article key={product.id}><div><small>{product.brand}</small><b>{product.name}</b><span>{money(variant?.price_cents)}</span></div><button disabled={!variant} onClick={() => variant && cart.add({ variantId: variant.id, productSlug: product.slug, name: product.name, variant: variant.label, priceCents: variant.price_cents })}><Plus /> Adicionar</button></article>; })}</div>}</div>{!human && <div className="quick-actions">{["Comprar produtos", "Banho e tosa", "Meus pedidos", "Falar com uma pessoa"].map((a) => <button key={a} onClick={() => action(a)}>{a}</button>)}</div>}<form onSubmit={(e) => { e.preventDefault(); if (!text.trim()) return; action(text.trim()); setText(""); }}><input value={text} onChange={(e) => setText(e.target.value)} placeholder={human ? "Deixe sua mensagem para a equipe" : "Escreva uma dúvida"} aria-label="Mensagem" /><button aria-label="Enviar"><Send /></button></form><p className="chat-safe">Nunca envie senha ou dados completos do cartão pelo chat.</p></div>;
}
