"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBasket, PackageSearch, Truck, CalendarDays, MessagesSquare, UsersRound, WalletCards, PlugZap, FileText, ShieldCheck, Settings, LogOut, PawPrint, Route } from "lucide-react";

const nav = [
  ["/admin", "Visão geral", LayoutDashboard], ["/admin/pedidos", "Pedidos", ShoppingBasket], ["/admin/catalogo", "Catálogo", PackageSearch], ["/admin/frete", "Frete", Truck], ["/admin/entregas", "Entregas", Route], ["/admin/agenda", "Agenda", CalendarDays], ["/admin/servicos", "Serviços", PawPrint], ["/admin/atendimento", "Atendimento", MessagesSquare], ["/admin/clientes", "Clientes", UsersRound], ["/admin/financeiro", "Financeiro", WalletCards], ["/admin/integracoes", "Integrações", PlugZap], ["/admin/conteudo", "Conteúdo", FileText], ["/admin/equipe", "Equipe", ShieldCheck], ["/admin/configuracoes", "Configurações", Settings],
] as const;

export function AdminShell({ children, role }: { children: React.ReactNode; role: string }) {
  const path = usePathname();
  return <div className="admin-layout"><aside className="admin-sidebar"><div className="admin-brand"><span>R</span><div><b>ROTTAVA</b><small>operação</small></div></div><nav>{nav.map(([href, label, Icon]) => <Link key={href} className={path === href ? "active" : ""} href={href}><Icon />{label}</Link>)}</nav><div className="admin-user"><span>{role.slice(0, 2).toUpperCase()}</span><div><b>{role}</b><small>Sessão protegida</small></div><form action="/api/auth/logout" method="post"><button aria-label="Sair"><LogOut /></button></form></div></aside><section className="admin-main">{children}</section></div>;
}
