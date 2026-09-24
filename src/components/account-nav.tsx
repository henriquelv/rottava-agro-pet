import Link from "next/link";
import { ShoppingBag, MapPin, PawPrint, CalendarDays, UserRound, LogOut } from "@/components/icons";

const links = [["/minha-conta/pedidos", "Pedidos", ShoppingBag], ["/minha-conta/agendamentos", "Agendamentos", CalendarDays], ["/minha-conta/pets", "Meus pets", PawPrint], ["/minha-conta/enderecos", "Endereços", MapPin], ["/minha-conta/dados", "Dados e segurança", UserRound]] as const;
export function AccountNav() { return <aside className="account-nav"><h2>Minha conta</h2><nav>{links.map(([href, label, Icon]) => <Link key={href} href={href}><Icon />{label}</Link>)}</nav><form action="/api/auth/logout" method="post"><button><LogOut /> Sair</button></form></aside>; }
