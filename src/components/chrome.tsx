"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingBag, Sparkles, UserRound, MessageCircle, MapPin, ArrowUpRight } from "lucide-react";
import type { Session } from "@/lib/auth";
import { Logo } from "./logo";
import { useCart } from "./cart";

export function Header({ session }: { session: Session | null }) {
  const { count } = useCart();
  return <header className="site-header">
    <div className="header-inner">
      <Logo />
      <form action="/produtos" className="header-search" role="search">
        <Search size={17} aria-hidden="true" /><input name="busca" aria-label="Buscar produtos" placeholder="O que seu companheiro precisa?" />
      </form>
      <nav className="desktop-nav" aria-label="Navegação principal">
        <Link href="/produtos">Produtos</Link><Link href="/banho-e-tosa">Banho & tosa</Link><Link href="/loja">A loja</Link>
      </nav>
      <div className="header-actions">
        <Link className="icon-button" href="/atendimento" aria-label="Atendimento"><MessageCircle size={19} /></Link>
        <Link className="icon-button cart-icon" href="/carrinho" aria-label={`Carrinho com ${count} itens`}><ShoppingBag size={19} />{count > 0 && <b>{count}</b>}</Link>
        <Link className="account-link" href={session ? (session.role === "customer" ? "/minha-conta" : session.role === "driver" ? "/entregador" : "/admin") : "/entrar"}><UserRound size={18} />{session ? session.name.split(" ")[0] : "Entrar"}</Link>
      </div>
    </div>
  </header>;
}

const dock = [{ href: "/", label: "Início", icon: Home }, { href: "/produtos", label: "Produtos", icon: Search }, { href: "/carrinho", label: "Carrinho", icon: ShoppingBag }, { href: "/banho-e-tosa", label: "Serviços", icon: Sparkles }, { href: "/minha-conta", label: "Conta", icon: UserRound }];
export function MobileDock({ session }: { session: Session | null }) {
  const path = usePathname(); const { count } = useCart();
  return <nav className="mobile-dock" aria-label="Navegação móvel">{dock.map((item) => {
    const Icon = item.icon; const href = item.label === "Conta" && !session ? "/entrar" : item.href;
    return <Link key={item.href} href={href} aria-current={path === item.href ? "page" : undefined}><span><Icon size={20} />{item.label === "Carrinho" && count > 0 && <b>{count}</b>}</span><small>{item.label}</small></Link>;
  })}</nav>;
}

export function Footer() {
  return <footer className="site-footer"><div className="footer-grid">
    <div><Logo /><p>Cuidado próximo para os animais, a casa e o jardim de Caçador.</p></div>
    <div><h3>Descubra</h3><Link href="/produtos">Produtos</Link><Link href="/banho-e-tosa">Banho & tosa</Link><Link href="/atendimento">Atendimento</Link></div>
    <div><h3>Informações</h3><Link href="/loja"><MapPin size={14} /> Loja e horários</Link><Link href="/informacoes/privacidade">Privacidade</Link><Link href="/informacoes/entregas">Entregas e retirada</Link></div>
    <div className="footer-note"><span>FEITO PARA CAÇADOR · SC</span><ArrowUpRight size={22} /></div>
  </div><p className="copyright">© {new Date().getFullYear()} Rottava Pet Casa e Jardim. Informações comerciais sujeitas à configuração da loja.</p></footer>;
}
