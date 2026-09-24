"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Minus, Plus, Search, ShoppingBag, Trash2, X } from "@/components/icons";
import { money } from "@/lib/format";
import { useCart } from "./cart";
import { useFeedback } from "./feedback";
import { Sheet } from "./sheet";

type SearchResult = { id: string; name: string; slug: string; brand: string | null; category_name: string | null; min_price_cents: number | null };

export function SearchPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpen(true); }
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);
  useEffect(() => {
    if (!open) return;
    if (window.matchMedia("(min-width: 761px)").matches) window.setTimeout(() => input.current?.focus(), 40);
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/catalog/search?q=${encodeURIComponent(query)}`, { signal: controller.signal });
        if (response.ok) { setResults(await response.json()); setActive(0); }
      } finally { setLoading(false); }
    }, 140);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [query, open]);
  function visit(href: string) { setOpen(false); router.push(href); }
  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const count = results.length + 1;
    if (event.key === "ArrowDown") { event.preventDefault(); setActive((value) => (value + 1) % count); }
    if (event.key === "ArrowUp") { event.preventDefault(); setActive((value) => (value - 1 + count) % count); }
    if (event.key === "Enter") { event.preventDefault(); if (active < results.length) visit(`/produto/${results[active].slug}`); else visit(`/produtos${query ? `?busca=${encodeURIComponent(query)}` : ""}`); }
  }
  return <>
    <button className="search-trigger" onClick={() => setOpen(true)} aria-label="Abrir busca"><Search aria-hidden="true" /><span>Busque rações, cuidados…</span><kbd>Ctrl&nbsp;K</kbd></button>
    <AnimatePresence>{open && <motion.div className="search-overlay" role="presentation" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduced ? undefined : { opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
      <motion.section className="search-command" role="dialog" aria-modal="true" aria-label="Busca de produtos" initial={reduced ? false : { opacity: 0, y: -18, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduced ? undefined : { opacity: 0, y: -10, scale: .99 }} transition={{ type: "spring", stiffness: 360, damping: 34 }}>
        <div className="search-input-row"><Search aria-hidden="true" /><input ref={input} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={onKeyDown} placeholder="Produto, marca ou necessidade…" aria-controls="search-results" aria-activedescendant={`search-option-${active}`} /><button onClick={() => setOpen(false)} aria-label="Fechar busca"><X aria-hidden="true" /></button></div>
        <div id="search-results" role="listbox" className="search-results" aria-label={query ? "Resultados no catálogo" : "Sugestões para começar"}>
          <p className="search-heading">{loading ? "Consultando o catálogo…" : query ? "Resultados no catálogo" : "Sugestões para começar"}</p>
          {!loading && results.length === 0 && <p className="search-empty">Nenhum item encontrado. Tente marca, espécie ou peso.</p>}
          {results.map((product, index) => <button id={`search-option-${index}`} role="option" aria-selected={active === index} className={active === index ? "is-active" : ""} key={product.id} onMouseEnter={() => setActive(index)} onClick={() => visit(`/produto/${product.slug}`)}>
            <span className="search-result-mark">R</span><span><b>{product.name}</b><small>{[product.category_name, product.brand].filter(Boolean).join(" · ")}</small></span><strong>{money(product.min_price_cents)}</strong><ArrowRight aria-hidden="true" />
          </button>)}
          <button id={`search-option-${results.length}`} role="option" aria-selected={active === results.length} className={`search-all ${active === results.length ? "is-active" : ""}`} onMouseEnter={() => setActive(results.length)} onClick={() => visit(`/produtos${query ? `?busca=${encodeURIComponent(query)}` : ""}`)}>Ver catálogo completo <ArrowRight aria-hidden="true" /></button>
        </div>
      </motion.section>
    </motion.div>}</AnimatePresence>
  </>;
}

export function MiniCart() {
  const cart = useCart();
  const { notify } = useFeedback();
  function remove(item: (typeof cart.items)[number]) {
    cart.update(item.variantId, 0);
    notify("Produto removido", { label: "Desfazer", onClick: () => cart.add({ variantId: item.variantId, productSlug: item.productSlug, name: item.name, variant: item.variant, priceCents: item.priceCents, imageUrl: item.imageUrl }, { quantity: item.quantity }) });
  }
  return <Sheet open={cart.isOpen} onClose={cart.close} title={cart.count ? `${cart.count} ${cart.count === 1 ? "item" : "itens"}` : "Carrinho vazio"} className="cart-drawer">
    <div className="mini-cart-lines">{cart.items.length ? cart.items.map((item) => <article key={item.variantId}>
      <div className="mini-thumb">{item.imageUrl ? <Image src={item.imageUrl} alt="" fill sizes="72px" /> : <span>R</span>}</div>
      <div className="mini-copy"><Link onClick={cart.close} href={`/produto/${item.productSlug}`}>{item.name}</Link><small>{item.variant}</small><b>{money(item.priceCents)}</b><div className="mini-quantity"><button onClick={() => cart.update(item.variantId, item.quantity - 1)} aria-label="Diminuir"><Minus /></button><output>{item.quantity}</output><button onClick={() => cart.update(item.variantId, item.quantity + 1)} aria-label="Aumentar"><Plus /></button></div></div>
      <button className="mini-remove" onClick={() => remove(item)} aria-label="Remover"><Trash2 /></button>
    </article>) : <div className="mini-empty"><ShoppingBag /><h3>Seu carrinho está leve.</h3><p>Encontre uma opção com o agente ou explore o catálogo.</p><Link onClick={cart.close} className="button primary" href="/produtos">Explorar produtos</Link></div>}</div>
    {cart.items.length > 0 && <footer><div><span>Subtotal</span><strong>{money(cart.subtotal)}</strong></div><small>Frete e disponibilidade são confirmados no checkout.</small><Link onClick={cart.close} className="button primary wide" href="/carrinho">Revisar carrinho <ArrowRight /></Link></footer>}
  </Sheet>;
}
