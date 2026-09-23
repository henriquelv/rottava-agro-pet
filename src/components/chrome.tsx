"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingBag, Sparkles, UserRound, MapPin, ArrowUpRight, Heart, ChevronDown, ShieldCheck, Headphones, Truck } from "lucide-react";
import type { Session } from "@/lib/auth";
import { Logo } from "./logo";
import { useCart } from "./cart";
import { useFavorites } from "./favorites";
import { MiniCart, SearchPalette } from "./commerce-overlays";

export function Header({ session }: { session: Session | null }) {
  const cart = useCart(); const favorites = useFavorites();
  return <><header className="site-header">
    <div className="utility-bar"><span><ShieldCheck /> Compra segura</span><span><Truck /> Retire na loja após confirmação</span><Link href="/atendimento"><Headphones /> Precisa de ajuda?</Link></div>
    <div className="header-main">
      <Logo />
      <SearchPalette />
      <div className="header-actions">
        <Link className="header-action" href="/favoritos" aria-label={`Favoritos: ${favorites.count}`}><Heart />{favorites.count > 0 && <b>{favorites.count}</b>}<span>Favoritos</span></Link>
        <button className="header-action" onClick={cart.open} aria-label={`Carrinho com ${cart.count} itens`}><ShoppingBag />{cart.count > 0 && <b>{cart.count}</b>}<span>{cart.count ? `Carrinho · ${cart.count}` : "Carrinho"}</span></button>
        <Link className="account-link" href={session ? (session.role === "customer" ? "/minha-conta" : session.role === "driver" ? "/entregador" : "/admin") : "/entrar"}><UserRound /> <span><small>{session ? "Olá," : "Boas-vindas"}</small>{session ? session.name.split(" ")[0] : "Entrar"}</span></Link>
      </div>
    </div>
    <div className="category-bar"><nav aria-label="Categorias"><Link className="all-categories" href="/produtos"><span>Todos os produtos</span><ChevronDown /></Link><Link href="/produtos?categoria=pet">Cães</Link><Link href="/produtos?categoria=pet">Gatos</Link><Link href="/produtos?categoria=cuidados">Higiene & cuidados</Link><Link href="/produtos?categoria=casa-jardim">Casa & jardim</Link><Link href="/banho-e-tosa">Banho & tosa</Link><Link href="/atendimento">Atendimento</Link><Link href="/loja">A Rottava</Link></nav></div>
  </header><MiniCart /></>;
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
  return <footer className="site-footer"><div className="footer-top"><div><span>UMA CONVERSA QUE FAZ SENTIDO.</span><h2>Cuidado, não ruído.</h2></div><Link className="footer-cta" href="/atendimento">Falar com a Rottava <ArrowUpRight /></Link></div><div className="footer-grid">
    <div className="footer-brand"><Logo /><p>Cuidado próximo para os animais, a casa e o jardim de Caçador.</p><Link href="/loja"><MapPin /> Caçador · Santa Catarina</Link></div>
    <div><h3>Compre</h3><Link href="/produtos">Todos os produtos</Link><Link href="/produtos?categoria=pet">Para pets</Link><Link href="/produtos?categoria=casa-jardim">Casa & jardim</Link><Link href="/favoritos">Favoritos</Link></div>
    <div><h3>Cuide</h3><Link href="/banho-e-tosa">Banho & tosa</Link><Link href="/atendimento">Atendimento</Link><Link href="/minha-conta">Minha conta</Link></div>
    <div><h3>Informações</h3><Link href="/loja">Loja e horários</Link><Link href="/informacoes/privacidade">Privacidade</Link><Link href="/informacoes/entregas">Entregas e retirada</Link><Link href="/informacoes/pagamentos">Pagamentos</Link></div>
  </div><div className="copyright"><p>© {new Date().getFullYear()} Rottava Pet Casa e Jardim. Informações comerciais sujeitas à configuração da loja.</p><span>FEITO PARA CAÇADOR · SC</span></div></footer>;
}
