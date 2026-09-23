import { NextResponse } from "next/server";
import { listProducts } from "@/lib/db";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim() || "";
  const products = await listProducts(query);
  return NextResponse.json(products.slice(0, 6).map(({ id, name, slug, brand, category_name, min_price_cents }) => ({ id, name, slug, brand, category_name, min_price_cents })));
}
