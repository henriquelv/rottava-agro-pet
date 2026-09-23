"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, Check, LoaderCircle, Send, PawPrint, Leaf, Sparkles, Heart, Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Product } from "@/lib/db";
import { money } from "@/lib/format";
import { useCart } from "./cart";
import { useFavorites } from "./favorites";

export function ProductCard({ product }: { product: Product }) {
  const variant = product.variants[0];
  const favorites = useFavorites(); const favorite = favorites.has(product.id);
  const primary = product.images[0] || product.image_url; const secondary = product.images[1];
  return <motion.article layout className="product-card" initial={{ opacity: 0, scale: .985 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-40px" }} whileHover={{ y: -5 }} transition={{ duration: .32, ease: [.2, .75, .25, 1] }}>
    <div className="product-media">{product.demo?.badge && <span className="product-badge">{product.demo.badge}</span>}<motion.button whileTap={{ scale: .88 }} className={`favorite-button ${favorite ? "active" : ""}`} onClick={() => { favorites.toggle(product.id); toast(favorite ? "Removido dos favoritos" : "Guardado nos favoritos"); }} aria-label={favorite ? `Remover ${product.name} dos favoritos` : `Favoritar ${product.name}`}><Heart fill={favorite ? "currentColor" : "none"} aria-hidden="true" /></motion.button><Link href={`/produto/${product.slug}`} className={`product-image ${secondary ? "has-secondary" : ""}`}>{primary ? <><Image className="product-primary-image" unoptimized={primary.startsWith("http")} src={primary} alt={product.name} fill sizes="(max-width: 700px) 50vw, 25vw" />{secondary && <Image className="product-secondary-image" unoptimized={secondary.startsWith("http")} src={secondary} alt="" fill sizes="(max-width: 700px) 50vw, 25vw" />}</> : <ProductArt product={product} />}</Link>{variant && <QuickAdd product={product} variant={variant} label />}</div>
    <div className="product-meta"><span>{product.brand || product.category_name || "Rottava"}</span><h3><Link href={`/produto/${product.slug}`}>{product.name}</Link></h3>{product.demo?.rating && <div className="rating" aria-label={`Avaliação demonstrativa ${product.demo.rating} de 5`}><Star fill="currentColor" aria-hidden="true" /><b>{product.demo.rating.toFixed(1)}</b><small>({product.demo.reviewsCount})</small></div>}<div className="price-row"><div>{product.demo?.compareAtCents && <del>{money(product.demo.compareAtCents)}</del>}<b>{money(product.min_price_cents)}</b></div></div></div>
  </motion.article>;
}

function ProductArt({ product }: { product: Product }) {
  const category = product.category_name || "Pet";
  const Icon = category.includes("Jardim") ? Leaf : category === "Cuidados" ? Sparkles : PawPrint;
  return <span className={`image-placeholder product-art ${category.includes("Jardim") ? "garden" : category === "Cuidados" ? "care" : "pet"}`}><i /><Icon aria-hidden="true" /><small>{product.demo ? "FIXTURE DEMO" : "IMAGEM EM PREPARAÇÃO"}</small><b>{product.name.split(" ").slice(0, 2).join(" ")}</b></span>;
}

function QuickAdd({ product, variant, label = false }: { product: Product; variant: Product["variants"][number]; label?: boolean }) {
  const { add } = useCart(); const [done, setDone] = useState(false);
  return <button className={label ? "quick-add" : "round-add"} onClick={() => { add({ variantId: variant.id, productSlug: product.slug, name: product.name, variant: variant.label, priceCents: variant.price_cents, imageUrl: product.image_url }, { open: true }); setDone(true); toast.success(`${product.name} entrou no carrinho`); setTimeout(() => setDone(false), 1400); }} aria-label={`Adicionar ${product.name} ao carrinho`}>{done ? <><Check size={17} /> {label && "Adicionado"}</> : <><Plus size={18} /> {label && "Adicionar rápido"}</>}</button>;
}

export function ProductBuy({ product }: { product: Product }) {
  const [selected, setSelected] = useState(product.variants[0]?.id || ""); const [quantity, setQuantity] = useState(1); const [done, setDone] = useState(false); const { add } = useCart(); const reduced = useReducedMotion();
  const variant = product.variants.find((v) => v.id === selected);
  if (!variant) return <p className="unavailable">Este produto não possui uma variante vendável no momento.</p>;
  const stockText = variant.stock_quantity == null ? "Disponibilidade confirmada no pedido" : variant.stock_quantity > 0 ? product.demo ? `${variant.stock_quantity} unidades no fixture de teste` : "Em estoque — sujeito à confirmação" : "Indisponível";
  function addSelected() { add({ variantId: variant!.id, productSlug: product.slug, name: product.name, variant: variant!.label, priceCents: variant!.price_cents, imageUrl: product.images[0] || product.image_url }, { open: true, quantity }); setDone(true); toast.success(`${quantity} ${quantity === 1 ? "item adicionado" : "itens adicionados"} ao carrinho`); window.setTimeout(() => setDone(false), 1600); }
  return <div className="buy-box"><fieldset><legend>Selecione a opção</legend><div className="variant-grid">{product.variants.map((v) => <button type="button" aria-pressed={selected === v.id} className={selected === v.id ? "selected" : ""} key={v.id} onClick={() => setSelected(v.id)}><span>{v.label}</span><b>{money(v.price_cents)}</b></button>)}</div></fieldset>
    <div className="buy-price"><small>Preço</small><AnimatePresence mode="wait" initial={false}><motion.strong key={variant.id} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -8 }} transition={{ duration: .18 }}>{money(variant.price_cents)}</motion.strong></AnimatePresence><span className={variant.stock_quantity === 0 ? "out" : ""}>{stockText}</span></div>
    <div className="buy-actions"><div className="buy-quantity" aria-label="Quantidade"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Diminuir quantidade"><Minus aria-hidden="true" /></button><output aria-live="polite">{quantity}</output><button onClick={() => setQuantity((value) => Math.min(99, value + 1))} aria-label="Aumentar quantidade"><Plus aria-hidden="true" /></button></div><button className="button primary buy-cta" disabled={variant.stock_quantity === 0} onClick={addSelected}>{done ? <><Check aria-hidden="true" /> Adicionado</> : <><ShoppingBag aria-hidden="true" /> Adicionar ao carrinho</>}</button></div>
    <div className="purchase-assurances"><span><ShieldCheck aria-hidden="true" /> Compra protegida</span><span><Truck aria-hidden="true" /> Retirada após confirmação</span><span><RotateCcw aria-hidden="true" /> Revisão antes do pedido</span></div>
    {done && <Link className="text-link" href="/carrinho">Revisar carrinho <ArrowRight size={16} /></Link>}
    <div className="mobile-buy-bar"><div><small>{variant.label}</small><b>{money(variant.price_cents)}</b></div><button disabled={variant.stock_quantity === 0} onClick={addSelected}>{done ? "Adicionado" : "Adicionar"}</button></div>
  </div>;
}

export function FavoritesView({ products }: { products: Product[] }) {
  const { ids } = useFavorites(); const selected = products.filter((product) => ids.includes(product.id));
  return selected.length ? <div className="product-grid catalog-grid">{selected.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-cart"><Heart /><h2>Guarde o que chamou sua atenção.</h2><p>Use o coração nos produtos para montar sua seleção. Ela fica salva neste dispositivo.</p><Link className="button primary" href="/produtos">Descobrir produtos</Link></div>;
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
  const [human, setHuman] = useState(false); const [text, setText] = useState(""); const [showProducts, setShowProducts] = useState(false); const cart = useCart(); const reduced = useReducedMotion();
  function action(value: string) {
    const lower = value.toLowerCase(); const wantsProducts = lower.includes("produto") || lower.includes("ração") || lower.includes("brinquedo");
    setMessages((m) => [...m, { who: "user", text: value }, { who: "bot", text: value === "Falar com uma pessoa" ? "Certo. A automação foi pausada e sua conversa entrou na fila da equipe. O horário real de atendimento ainda precisa ser configurado." : wantsProducts ? "Encontrei estas opções no mesmo catálogo usado pelo site. Você pode adicionar ao carrinho sem sair da conversa." : value === "Meus pedidos" ? "Entre na sua conta para consultar apenas os pedidos vinculados à sua identidade." : "Posso ajudar com produtos, banho e tosa ou encaminhar você para uma pessoa." }]);
    if (value === "Falar com uma pessoa") setHuman(true); if (wantsProducts) setShowProducts(true);
  }
  return <div className="chat-shell"><header><div className="bot-avatar">R</div><div><b>{human ? "Fila de atendimento" : "Assistente Rottava"}</b><small>{human ? "Automação pausada" : "Consulta o mesmo catálogo do site"}</small></div><span className="chat-cart"><ShoppingBag aria-hidden="true" />{cart.count}</span></header><div className="messages" aria-live="polite"><AnimatePresence initial={false}>{messages.map((m, i) => <motion.div layout key={`${m.who}-${i}`} initial={reduced ? false : { opacity: 0, x: m.who === "user" ? 16 : -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduced ? 0 : .22 }} className={`message ${m.who}`}>{m.text}</motion.div>)}</AnimatePresence>{showProducts && <motion.div className="chat-products" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }}>{products.map((product) => { const variant = product.variants[0]; return <motion.article layout key={product.id}><div><small>{product.brand}</small><b>{product.name}</b><span>{money(variant?.price_cents)}</span></div><button disabled={!variant} onClick={() => variant && cart.add({ variantId: variant.id, productSlug: product.slug, name: product.name, variant: variant.label, priceCents: variant.price_cents })}><Plus aria-hidden="true" /> Adicionar</button></motion.article>; })}</motion.div>}</div>{!human && <div className="quick-actions">{["Comprar produtos", "Banho e tosa", "Meus pedidos", "Falar com uma pessoa"].map((a) => <button key={a} onClick={() => action(a)}>{a}</button>)}</div>}<form onSubmit={(e) => { e.preventDefault(); if (!text.trim()) return; action(text.trim()); setText(""); }}><input value={text} onChange={(e) => setText(e.target.value)} placeholder={human ? "Deixe sua mensagem para a equipe" : "Escreva uma dúvida"} aria-label="Mensagem" /><button aria-label="Enviar"><Send aria-hidden="true" /></button></form><p className="chat-safe">Nunca envie senha ou dados completos do cartão pelo chat.</p></div>;
}
