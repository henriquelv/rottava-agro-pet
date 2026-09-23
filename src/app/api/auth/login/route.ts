import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { ZodError } from "zod";
import { db, hasDatabase } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { loginSchema } from "@/lib/schemas";
import { demoAccounts, demoMode } from "@/lib/config";

export async function POST(request: Request) {
  try {
    const input = loginSchema.parse(await request.json());
    if (demoMode) {
      const demo = demoAccounts.find((account) => account.email === input.email);
      if (demo && input.password === "Rottava@123") {
        const roles: Record<string,string> = { Cliente: "customer", Operador: "operator", Atendente: "attendant", "Serviços": "services", Entregador: "driver", Financeiro: "finance", Gestor: "manager" };
        await createSession({ sub: `demo-${roles[demo.role]}`, email: demo.email, name: `${demo.role} Demonstração`, role: roles[demo.role] });
        return NextResponse.json({ destination: demo.destination });
      }
    }
    if (!hasDatabase()) return NextResponse.json({ message: "Use uma das contas de demonstração exibidas nesta página." }, { status: 503 });
    const sql = db();
    const [account] = await sql`SELECT id,email,name,role,status,password_hash FROM accounts WHERE email=${input.email}`;
    const valid = account && account.status === "active" && await compare(input.password, account.password_hash);
    if (!valid) return NextResponse.json({ message: "E-mail ou senha inválidos." }, { status: 401 });
    await createSession({ sub: account.id, email: account.email, name: account.name, role: account.role });
    const destination = account.role === "driver" ? "/entregador" : account.role === "customer" ? "/minha-conta" : "/admin";
    return NextResponse.json({ destination });
  } catch (error) {
    if (error instanceof ZodError) return NextResponse.json({ message: "Informe e-mail e senha válidos." }, { status: 400 });
    console.error("login_failed", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ message: "Não foi possível entrar agora." }, { status: 500 });
  }
}
