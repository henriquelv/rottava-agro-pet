"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, Search, ShoppingBag, PawPrint, UserRound, MapPin, ArrowUpRight, Heart, ChevronDown, ShieldCheck, Headphones, Truck } from "@/components/icons";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import type { Session } from "@/lib/auth";
import { Logo } from "./logo";
import { useCart } from "./cart";
import { useFavorites } from "./favorites";
import { MiniCart, SearchPalette } from "./commerce-overlays";

export function Header({ session }: { session: Session | null }) {
  const cart = useCart(); const favorites = useFavorites(); const [scrolled, setScrolled] = useState(false); const [menu, setMenu] = useState(false); const reduced = useReducedMotion(); const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 48));
  return <><motion.header className={`site-header ${scrolled ? "scrolled" : ""}`} layout transition={{ duration: reduced ? 0 : .28, ease: [.2, .75, .25, 1] }}>
    <div className="utility-bar"><span><ShieldCheck aria-hidden="true" /> Compra segura</span><span><Truck aria-hidden="true" /> Retire na loja após confirmação</span><Link href="/atendimento"><Headphones aria-hidden="true" /> Precisa de ajuda?</Link></div>
    <div className="header-main">
      <Logo />
      <SearchPalette />
      <div className="header-actions">
        <Link className="header-action" href="/favoritos" aria-label={`Favoritos: ${favorites.count}`}><Heart aria-hidden="true" />{favorites.count > 0 && <b>{favorites.count}</b>}<span>Favoritos</span></Link>
        <button className="header-action" onClick={cart.open} aria-label={`Carrinho com ${cart.count} itens`}><ShoppingBag aria-hidden="true" />{cart.count > 0 && <b>{cart.count}</b>}<span>{cart.count ? `Carrinho · ${cart.count}` : "Carrinho"}</span></button>
        <Link className="account-link" href={session ? (session.role === "customer" ? "/minha-conta" : session.role === "driver" ? "/entregador" : "/admin") : "/entrar"}><UserRound aria-hidden="true" /> <span><small>{session ? "Olá," : "Boas-vindas"}</small>{session ? session.name.split(" ")[0] : "Entrar"}</span></Link>
      </div>
    </div>
    <div className="category-bar"><nav aria-label="Categorias"><button className="all-categories" onClick={() => setMenu((open) => !open)} aria-expanded={menu}><span>Todos os produtos</span><motion.span animate={{ rotate: menu ? 180 : 0 }}><ChevronDown aria-hidden="true" /></motion.span></button><Link href="/produtos?categoria=pet">Cães</Link><Link href="/produtos?categoria=pet">Gatos</Link><Link href="/produtos?categoria=cuidados">Higiene & cuidados</Link><Link href="/produtos?categoria=casa-jardim">Casa & jardim</Link><Link href="/banho-e-tosa">Banho & tosa</Link><Link href="/atendimento">Atendimento</Link><Link href="/loja">A Rottava</Link></nav></div>
    <AnimatePresence>{menu && <motion.div className="mega-menu" initial={reduced ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -8 }} transition={{ duration: .2 }}><div><span>COMPRE POR ROTINA</span><Link href="/produtos?categoria=pet" onClick={() => setMenu(false)}>Alimentação & bem-estar <ArrowUpRight aria-hidden="true" /></Link><Link href="/produtos?categoria=cuidados" onClick={() => setMenu(false)}>Higiene & cuidados <ArrowUpRight aria-hidden="true" /></Link><Link href="/produtos?categoria=casa-jardim" onClick={() => setMenu(false)}>Casa & jardim <ArrowUpRight aria-hidden="true" /></Link></div><div><span>SERVIÇOS</span><Link href="/banho-e-tosa" onClick={() => setMenu(false)}>Banho & tosa</Link><Link href="/atendimento" onClick={() => setMenu(false)}>Atendimento digital</Link></div><Link className="mega-feature" href="/produtos" onClick={() => setMenu(false)}><small>CATÁLOGO COMPLETO</small><b>Encontre o que acompanha a sua rotina.</b><ArrowUpRight aria-hidden="true" /></Link></motion.div>}</AnimatePresence>
  </motion.header><MiniCart /></>;
}

const dock = [{ href: "/", label: "Início", icon: Home }, { href: "/produtos", label: "Produtos", icon: Search }, { href: "/carrinho", label: "Carrinho", icon: ShoppingBag }, { href: "/banho-e-tosa", label: "Serviços", icon: PawPrint }, { href: "/minha-conta", label: "Conta", icon: UserRound }];
export function MobileDock({ session }: { session: Session | null }) {
  const path = usePathname(); const { count } = useCart();
  return <nav className="mobile-dock" aria-label="Navegação móvel">{dock.map((item) => {
    const Icon = item.icon; const href = item.label === "Conta" && !session ? "/entrar" : item.href;
    const active = path === item.href || (item.href !== "/" && path.startsWith(item.href));
    return <Link key={item.href} href={href} aria-current={active ? "page" : undefined}>{active && <motion.i layoutId="dock-active" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}<span><Icon size={20} aria-hidden="true" />{item.label === "Carrinho" && count > 0 && <b>{count}</b>}</span><small>{item.label}</small></Link>;
  })}</nav>;
}

export function Footer() {
  return <footer className="site-footer"><div className="footer-top"><div><span>UMA CONVERSA QUE FAZ SENTIDO.</span><h2>Cuidado, não ruído.</h2></div><Link className="footer-cta" href="/atendimento">Falar com a Rottava <ArrowUpRight /></Link></div><div className="footer-grid">
    <div className="footer-brand"><Logo /><p>Cuidado próximo para os animais, a casa e o jardim de Caçador.</p><Link href="/loja"><MapPin /> Caçador · Santa Catarina</Link></div>
    <div><h3>Compre</h3><Link href="/produtos">Todos os produtos</Link><Link href="/produtos?categoria=pet">Para pets</Link><Link href="/produtos?categoria=casa-jardim">Casa & jardim</Link><Link href="/favoritos">Favoritos</Link></div>
    <div><h3>Cuide</h3><Link href="/banho-e-tosa">Banho & tosa</Link><Link href="/atendimento">Atendimento</Link><Link href="/minha-conta">Minha conta</Link></div>
    <div><h3>Informações</h3><Link href="/loja">Loja e horários</Link><Link href="/informacoes/privacidade">Privacidade</Link><Link href="/informacoes/entregas">Entregas e retirada</Link><Link href="/informacoes/pagamentos">Pagamentos</Link></div>
  </div><div className="copyright"><p>© {new Date().getFullYear()} Rottava Pet Casa e Jardim. Informações comerciais sujeitas à configuração da loja.</p><span>FEITO PARA CAÇADOR · SC</span></div></footer>;
}
