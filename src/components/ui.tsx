import Link from "next/link";
import { ArrowRight, CircleAlert, CheckCircle2, Settings2 } from "@/components/icons";

export function PageHero({ eyebrow, title, text, actions }: { eyebrow: string; title: string; text: string; actions?: React.ReactNode }) {
  return <section className="page-hero"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p>{actions && <div className="hero-actions">{actions}</div>}</section>;
}
export function EmptyState({ title, text, action, admin = false }: { title: string; text: string; action?: { href: string; label: string }; admin?: boolean }) {
  return <div className="empty-state">{admin ? <Settings2 /> : <CircleAlert />}<h2>{title}</h2><p>{text}</p>{action && <Link className="button secondary" href={action.href}>{action.label}<ArrowRight size={16} /></Link>}</div>;
}
export function Status({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "ok" | "warn" | "danger" }) {
  return <span className={`status ${tone}`}>{tone === "ok" && <CheckCircle2 size={14} />}{children}</span>;
}
export function ConfigNotice({ children }: { children: React.ReactNode }) { return <div className="config-notice"><CircleAlert size={18} /><div><b>Configuração necessária</b><p>{children}</p></div></div>; }
