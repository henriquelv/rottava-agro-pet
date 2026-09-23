import postgres from "postgres";

let client: ReturnType<typeof postgres> | undefined;

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

export function db() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_NOT_CONFIGURED");
  client ??= postgres(process.env.DATABASE_URL, { prepare: false, max: 4, idle_timeout: 20 });
  return client;
}

export type Product = {
  id: string; name: string; slug: string; description: string | null; brand: string | null;
  image_url: string | null; category_name: string | null; min_price_cents: number | null;
  variants: { id: string; sku: string; label: string; unit: string; price_cents: number; stock_quantity: number | null }[];
};

export async function listProducts(search = ""): Promise<Product[]> {
  if (!hasDatabase()) return [];
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
    ...row,
    variants: await sql`SELECT id, sku, label, unit, price_cents, stock_quantity FROM variants WHERE product_id=${row.id} AND sellable=true ORDER BY price_cents`,
  }))) as unknown as Product[];
}

export async function getProduct(slug: string): Promise<Product | null> {
  const products = await listProducts();
  return products.find((p) => p.slug === slug) ?? null;
}
