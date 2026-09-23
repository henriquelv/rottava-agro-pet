import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = { sub: string; email: string; name: string; role: string };
const COOKIE = "rottava_session";

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value) throw new Error("AUTH_SECRET_NOT_CONFIGURED");
  return new TextEncoder().encode(value);
}

export async function createSession(session: Session) {
  const token = await new SignJWT(session).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(secret());
  (await cookies()).set(COOKIE, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token || !process.env.AUTH_SECRET) return null;
  try { return (await jwtVerify(token, secret())).payload as unknown as Session; } catch { return null; }
}

export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/entrar");
  return session;
}

export async function requireRole(allowed: string[]) {
  const session = await requireSession();
  if (!allowed.includes(session.role)) redirect("/sem-permissao");
  return session;
}
