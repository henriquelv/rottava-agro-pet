import { NextResponse } from "next/server";
import { listProducts } from "@/lib/db";
import { normalizeSearch } from "@/lib/catalog-guidance";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim() || "";
  const allProducts = await listProducts();
  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
  const score = (value: string) => terms.reduce((total, term) => total + (normalizeSearch(value).includes(term) ? 1 : 0), 0);
  const products = allProducts
    .map((product) => ({ product, score: query ? score(`${product.name} ${product.brand ?? ""} ${product.category_name ?? ""} ${product.metadata?.tags?.join(" ") ?? ""}`) : 1 }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || (a.product.min_price_cents ?? Infinity) - (b.product.min_price_cents ?? Infinity))
    .slice(0, 6)
    .map(({ product: { id, name, slug, brand, category_name, min_price_cents, image_url, images } }) => ({ id, name, slug, brand, category_name, min_price_cents, image_url: images[0] || image_url }));
  const values = <T extends string | null>(items: T[]) => [...new Set(items.filter((item): item is Exclude<T, null> => Boolean(item)))];
  const brands = values(allProducts.map((product) => product.brand)).filter((brand) => !query || score(brand) > 0).slice(0, 4).map((name) => ({ name, count: allProducts.filter((product) => product.brand === name).length }));
  const categories = values(allProducts.map((product) => product.category_name)).filter((category) => !query || score(category) > 0).slice(0, 4).map((name) => ({ name, count: allProducts.filter((product) => product.category_name === name).length }));
  return NextResponse.json({ products, brands, categories });
}
