"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, LoaderCircle, ArrowRight } from "lucide-react";
import { demoAccounts } from "@/lib/config";

export function AuthForm({ mode }: { mode: "login" | "register" | "reset" }) {
  const search = useSearchParams(); const router = useRouter(); const [show, setShow] = useState(false); const [loading, setLoading] = useState(false); const [message, setMessage] = useState("");
  async function submit(form: FormData) {
    setLoading(true); setMessage("");
    const body = Object.fromEntries(form.entries());
    if (mode === "reset") { setMessage("Se existir uma conta com esse e-mail, as instruções serão enviadas quando o serviço de e-mail estiver configurado."); setLoading(false); return; }
    const response = await fetch(`/api/auth/${mode}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    const result = await response.json();
    if (!response.ok) { setMessage(result.message || "Não foi possível continuar."); setLoading(false); return; }
    const retorno = search.get("retorno"); router.push(retorno?.startsWith("/") && !retorno.startsWith("//") ? retorno : result.destination || "/minha-conta");
  }
  const copy = mode === "login" ? { eyebrow: "BEM-VINDO DE VOLTA", title: "Entre na sua conta", text: "Acompanhe pedidos, endereços e cuidados em um só lugar.", button: "Entrar" } : mode === "register" ? { eyebrow: "SUA ROTINA COM A ROTTAVA", title: "Crie sua conta", text: "Uma conta segura para comprar, acompanhar e cuidar.", button: "Criar conta" } : { eyebrow: "RECUPERAR ACESSO", title: "Vamos ajudar", text: "Informe seu e-mail. A resposta será sempre neutra para proteger sua conta.", button: "Solicitar instruções" };
  async function demoLogin(email: string, destination: string) {
    setLoading(true); setMessage("");
    const response = await fetch("/api/auth/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, password: "Rottava@123" }) });
    if (!response.ok) { setMessage("Não foi possível entrar com a conta de teste."); setLoading(false); return; }
    router.push(destination);
  }
  const demo = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
  return <div className="auth-layout"><aside><span className="eyebrow">{copy.eyebrow}</span><h1>{copy.title}</h1><p>{copy.text}</p><div className="auth-art"><span>cuidado</span><span>perto</span><span>sempre.</span></div></aside><form action={submit} className="auth-form">
    {mode === "login" && demo && <div className="demo-logins"><div><b>Entrar como usuário de teste</b><small>Senha comum: Rottava@123</small></div><div className="demo-login-grid">{demoAccounts.map((account) => <button type="button" key={account.email} onClick={() => demoLogin(account.email, account.destination)}><span>{account.role}</span><small>{account.email}</small></button>)}</div></div>}
    {mode === "register" && <label>Nome completo<input required name="name" minLength={2} autoComplete="name" /></label>}
    <label>E-mail<input required type="email" name="email" autoComplete="email" /></label>
    {mode === "register" && <label>Celular <small>(opcional)</small><input name="phone" autoComplete="tel" /></label>}
    {mode !== "reset" && <label>Senha<div className="password"><input required minLength={mode === "register" ? 8 : 1} type={show ? "text" : "password"} name="password" autoComplete={mode === "register" ? "new-password" : "current-password"} /><button type="button" onClick={() => setShow(!show)} aria-label={show ? "Ocultar senha" : "Mostrar senha"}>{show ? <EyeOff /> : <Eye />}</button></div></label>}
    {message && <p className={mode === "reset" ? "form-success" : "form-error"} role="status">{message}</p>}
    <button className="button primary wide" disabled={loading}>{loading ? <LoaderCircle className="spin" /> : <>{copy.button}<ArrowRight /></>}</button>
    {mode === "login" && <><Link className="text-link" href="/recuperar-senha">Esqueci minha senha</Link><p>Ainda não tem conta? <Link href="/cadastro">Cadastre-se</Link></p></>}
    {mode !== "login" && <p>Já tem conta? <Link href="/entrar">Entrar</Link></p>}
    {mode === "register" && <small>Ao criar sua conta, você aceita somente as políticas publicadas pela loja. Comunicação de marketing não vem ativada.</small>}
  </form></div>;
}
