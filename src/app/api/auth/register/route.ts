import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { ZodError } from "zod";
import { db, hasDatabase } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { registerSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  if (!hasDatabase()) return NextResponse.json({ message: "O banco de dados ainda não foi configurado." }, { status: 503 });
  try {
    const input = registerSchema.parse(await request.json()); const sql = db();
    const exists = await sql`SELECT 1 FROM accounts WHERE email=${input.email}`;
    if (exists.length) return NextResponse.json({ message: "Não foi possível criar a conta. Tente entrar ou recuperar o acesso." }, { status: 409 });
    const passwordHash = await hash(input.password, 12);
    const [account] = await sql`INSERT INTO accounts(email,phone,name,password_hash) VALUES (${input.email},${input.phone || null},${input.name},${passwordHash}) RETURNING id,email,name,role`;
    await createSession({ sub: account.id, email: account.email, name: account.name, role: account.role });
    return NextResponse.json({ destination: "/minha-conta" }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) return NextResponse.json({ message: "Revise os campos. A senha deve ter pelo menos 8 caracteres." }, { status: 400 });
    console.error("register_failed", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ message: "Não foi possível criar a conta agora." }, { status: 500 });
  }
}
