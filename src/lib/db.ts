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

export type ProductFilters = { category?: string; brand?: string; sort?: string; minPrice?: number; maxPrice?: number; available?: boolean; productType?: string; lifeStage?: string; size?: string; need?: string };

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const facetValue = (value: string) => normalize(value).replaceAll(" & ", "-").replaceAll(" ", "-");

function applyProductFilters(products: Product[], filters: ProductFilters) {
  let result = products;
  if (filters.category) result = result.filter((product) => product.category_name && facetValue(product.category_name) === filters.category);
  if (filters.brand) result = result.filter((product) => product.brand === filters.brand);
  if (filters.productType) result = result.filter((product) => product.metadata?.productType === filters.productType);
  if (filters.lifeStage) result = result.filter((product) => product.metadata?.lifeStage === filters.lifeStage);
  if (filters.size) result = result.filter((product) => product.metadata?.size === filters.size);
  if (filters.need) result = result.filter((product) => product.metadata?.needs?.includes(filters.need!));
  if (filters.minPrice != null) result = result.filter((product) => (product.min_price_cents ?? 0) >= filters.minPrice! * 100);
  if (filters.maxPrice != null) result = result.filter((product) => (product.min_price_cents ?? Infinity) <= filters.maxPrice! * 100);
  if (filters.available) result = result.filter((product) => product.variants.some((variant) => variant.stock_quantity == null || variant.stock_quantity > 0));
  if (filters.sort === "price-asc") result = [...result].sort((a, b) => (a.min_price_cents || 0) - (b.min_price_cents || 0));
  if (filters.sort === "price-desc") result = [...result].sort((a, b) => (b.min_price_cents || 0) - (a.min_price_cents || 0));
  return result;
}

export async function listProducts(search = "", filters: ProductFilters = {}): Promise<Product[]> {
  if (!hasDatabase() || process.env.CATALOG_SOURCE === "spreadsheet" || (demoMode && process.env.CATALOG_SOURCE !== "database")) {
    const result = demoProducts.filter((p) => !search || normalize(`${p.name} ${p.brand} ${p.category_name} ${p.description} ${p.metadata?.tags?.join(" ")}`).includes(normalize(search)));
    return applyProductFilters(result, filters);
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
  const products = await Promise.all(rows.map(async (row) => ({
    ...row, images: row.image_url ? [row.image_url] : [],
    variants: await sql`SELECT id, sku, label, unit, price_cents, stock_quantity FROM variants WHERE product_id=${row.id} AND sellable=true ORDER BY price_cents`,
  }))) as unknown as Product[];
  return applyProductFilters(products, filters);
}

export async function getProduct(slug: string): Promise<Product | null> {
  if (!hasDatabase() || process.env.CATALOG_SOURCE === "spreadsheet" || (demoMode && process.env.CATALOG_SOURCE !== "database")) return demoProducts.find((p) => p.slug === slug) ?? null;
  const products = await listProducts();
  return products.find((p) => p.slug === slug) ?? null;
}
