import postgres from "postgres";
import { demoMode } from "./config";
import { demoProducts } from "./demo-catalog";
import type { Product } from "./catalog-types";

export type { Product } from "./catalog-types";
export { demoProducts } from "./demo-catalog";

let client: ReturnType<typeof postgres> | undefined;

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

export function db() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_NOT_CONFIGURED");
  client ??= postgres(process.env.DATABASE_URL, { prepare: false, max: 4, idle_timeout: 20 });
  return client;
}

export async function listProducts(search = "", filters: { category?: string; brand?: string; sort?: string } = {}): Promise<Product[]> {
  if (!hasDatabase()) {
    if (!demoMode) return [];
    const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    let result = demoProducts.filter((p) => !search || normalize(`${p.name} ${p.brand}`).includes(normalize(search)));
    if (filters.category) result = result.filter((p) => p.category_name?.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-") === filters.category);
    if (filters.brand) result = result.filter((p) => p.brand === filters.brand);
    if (filters.sort === "price-asc") result = [...result].sort((a,b) => (a.min_price_cents || 0) - (b.min_price_cents || 0));
    if (filters.sort === "price-desc") result = [...result].sort((a,b) => (b.min_price_cents || 0) - (a.min_price_cents || 0));
    return result;
  }
  const sql = db();
  const rows = await sql`
    SELECT p.id, p.name, p.slug, p.description, p.brand, p.image_url, c.name category_name,
      min(v.price_cents)::int min_price_cents
    FROM products p
    LEFT JOIN categories c ON c.id = p.category_id
    LEFT JOIN variants v ON v.product_id = p.id AND v.sellable = true
    WHERE p.active = true AND (${search} = '' OR p.name ILIKE ${`%${search}%`} OR p.brand ILIKE ${`%${search}%`})
    GROUP BY p.id, c.name ORDER BY p.updated_at DESC LIMIT 60`;
  return await Promise.all(rows.map(async (row) => ({
    ...row, images: row.image_url ? [row.image_url] : [],
    variants: await sql`SELECT id, sku, label, unit, price_cents, stock_quantity FROM variants WHERE product_id=${row.id} AND sellable=true ORDER BY price_cents`,
  }))) as unknown as Product[];
}

export async function getProduct(slug: string): Promise<Product | null> {
  if (!hasDatabase() && demoMode) return demoProducts.find((p) => p.slug === slug) ?? null;
  const products = await listProducts();
  return products.find((p) => p.slug === slug) ?? null;
}
