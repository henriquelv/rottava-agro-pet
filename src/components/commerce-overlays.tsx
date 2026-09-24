"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Drawer } from "vaul";
import { ArrowRight, Minus, Plus, Search, ShoppingBag, Trash2, X } from "@/components/icons";
import { money } from "@/lib/format";
import { useCart } from "./cart";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";

type SearchResult = { id: string; name: string; slug: string; brand: string | null; category_name: string | null; min_price_cents: number | null };

export function SearchPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpen(true); }
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
        if (response.ok) setResults(await response.json());
      } finally { setLoading(false); }
    }, 140);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [query, open]);
  function visit(href: string) { setOpen(false); router.push(href); }
  return <>
    <button className="search-trigger" onClick={() => setOpen(true)} aria-label="Abrir busca"><Search aria-hidden="true" /><span>Busque rações, cuidados, jardim…</span><kbd>Ctrl&nbsp;K</kbd></button>
    <AnimatePresence>{open && <motion.div className="search-overlay" role="presentation" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduced ? undefined : { opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
      <motion.div initial={reduced ? false : { opacity: 0, y: -16, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduced ? undefined : { opacity: 0, y: -10, scale: .99 }} transition={{ type: "spring", stiffness: 360, damping: 34 }}>
      <Command className="search-command" shouldFilter={false} label="Busca de produtos">
        <div className="search-input-row"><Search aria-hidden="true" /><Command.Input ref={input} value={query} onValueChange={setQuery} placeholder="Busque por produto ou marca…" /><button onClick={() => setOpen(false)} aria-label="Fechar busca"><X aria-hidden="true" /></button></div>
        <Command.List>
          {loading && <Command.Loading>Consultando o catálogo…</Command.Loading>}
          {!loading && <Command.Empty>Nenhum item encontrado. Tente outro termo.</Command.Empty>}
          <Command.Group heading={query ? "Resultados no catálogo" : "Sugestões para começar"}>
            {results.map((product) => <Command.Item key={product.id} value={product.id} onSelect={() => visit(`/produto/${product.slug}`)}>
              <span className="search-result-mark">R</span><div><b>{product.name}</b><small>{[product.category_name, product.brand].filter(Boolean).join(" · ")}</small></div><strong>{money(product.min_price_cents)}</strong><ArrowRight aria-hidden="true" />
            </Command.Item>)}
          </Command.Group>
          <Command.Item value={`all-${query}`} onSelect={() => visit(`/produtos${query ? `?busca=${encodeURIComponent(query)}` : ""}`)} className="search-all">Ver catálogo completo <ArrowRight aria-hidden="true" /></Command.Item>
        </Command.List>
      </Command>
      </motion.div>
    </motion.div>}</AnimatePresence>
  </>;
}

export function MiniCart() {
  const cart = useCart();
  function remove(item: (typeof cart.items)[number]) { cart.update(item.variantId, 0); toast("Produto removido", { action: { label: "Desfazer", onClick: () => cart.add({ variantId: item.variantId, productSlug: item.productSlug, name: item.name, variant: item.variant, priceCents: item.priceCents, imageUrl: item.imageUrl }, { quantity: item.quantity }) } }); }
  return <Drawer.Root direction="right" open={cart.isOpen} onOpenChange={(open) => open ? cart.open() : cart.close()}>
    <Drawer.Portal><Drawer.Overlay className="drawer-overlay" /><Drawer.Content className="cart-drawer" aria-describedby={undefined}>
      <header><div><span className="eyebrow">SUA SELEÇÃO</span><Drawer.Title>{cart.count ? `${cart.count} ${cart.count === 1 ? "item" : "itens"}` : "Carrinho vazio"}</Drawer.Title></div><Drawer.Close aria-label="Fechar carrinho"><X /></Drawer.Close></header>
      <div className="mini-cart-lines">{cart.items.length ? cart.items.map((item) => <article key={item.variantId}>
        <div className="mini-thumb">{item.imageUrl ? <Image src={item.imageUrl} alt="" fill sizes="72px" /> : <span>R</span>}</div>
        <div className="mini-copy"><Link onClick={cart.close} href={`/produto/${item.productSlug}`}>{item.name}</Link><small>{item.variant}</small><b>{money(item.priceCents)}</b><div className="mini-quantity"><button onClick={() => cart.update(item.variantId, item.quantity - 1)} aria-label="Diminuir"><Minus /></button><output>{item.quantity}</output><button onClick={() => cart.update(item.variantId, item.quantity + 1)} aria-label="Aumentar"><Plus /></button></div></div>
        <button className="mini-remove" onClick={() => remove(item)} aria-label="Remover"><Trash2 /></button>
      </article>) : <div className="mini-empty"><ShoppingBag /><h3>Seu carrinho está leve.</h3><p>Há boas escolhas esperando no catálogo.</p><Drawer.Close asChild><Link className="button primary" href="/produtos">Explorar produtos</Link></Drawer.Close></div>}</div>
      {cart.items.length > 0 && <footer><div><span>Subtotal</span><strong>{money(cart.subtotal)}</strong></div><small>Frete e disponibilidade são confirmados no checkout.</small><Drawer.Close asChild><Link className="button primary wide" href="/carrinho">Revisar carrinho <ArrowRight /></Link></Drawer.Close></footer>}
    </Drawer.Content></Drawer.Portal>
  </Drawer.Root>;
}
