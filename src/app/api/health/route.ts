import { NextResponse } from "next/server";
import { db, hasDatabase } from "@/lib/db";
import { integrations } from "@/lib/config";

export async function GET() {
  let database = false;
  if (hasDatabase()) { try { await db()`SELECT 1`; database = true; } catch { database = false; } }
  return NextResponse.json({ status: database || !hasDatabase() ? "ok" : "degraded", database, integrations: { payment: integrations.payment, legacy: integrations.legacy, maps: integrations.maps, whatsapp: integrations.whatsapp } });
}
