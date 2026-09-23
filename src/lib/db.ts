import postgres from "postgres";
import { demoMode } from "./config";

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

export const demoProducts: Product[] = [
  mock("11111111-1111-4111-8111-111111111111", "Ração Equilíbrio Cães Adultos", "racao-equilibrio-caes", "Pet", "Rottava Essencial", 12990, ["3 kg", "10 kg"]),
  mock("22222222-2222-4222-8222-222222222222", "Sachê Seleção para Gatos", "sache-selecao-gatos", "Pet", "Casa Animal", 690, ["85 g", "Kit 12"]),
  mock("33333333-3333-4333-8333-333333333333", "Brinquedo Corda & Bola", "brinquedo-corda-bola", "Pet", "Pata Livre", 3290, ["Pequeno", "Grande"]),
  mock("44444444-4444-4444-8444-444444444444", "Arranhador Horizonte", "arranhador-horizonte", "Pet", "Casa Animal", 8990, ["Único"]),
  mock("55555555-5555-4555-8555-555555555555", "Cama Ninho Aconchego", "cama-ninho-aconchego", "Pet", "Rottava Essencial", 15990, ["M", "G"]),
  mock("66666666-6666-4666-8666-666666666666", "Peitoral Passeio Leve", "peitoral-passeio-leve", "Pet", "Pata Livre", 7490, ["P", "M", "G"]),
  mock("77777777-7777-4777-8777-777777777777", "Regador Jardim Vivo", "regador-jardim-vivo", "Casa & Jardim", "Verde Perto", 5990, ["5 L"]),
  mock("88888888-8888-4888-8888-888888888888", "Vaso Cerâmica Orvalho", "vaso-ceramica-orvalho", "Casa & Jardim", "Verde Perto", 4590, ["18 cm", "26 cm"]),
  mock("99999999-9999-4999-8999-999999999999", "Kit Horta de Temperos", "kit-horta-temperos", "Casa & Jardim", "Quintal Bom", 3890, ["3 espécies"]),
  mock("aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", "Manta Proteção Sofá", "manta-protecao-sofa", "Casa & Jardim", "Rottava Essencial", 9490, ["1,20 m", "1,80 m"]),
  mock("bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb", "Escova Pelagem Macia", "escova-pelagem-macia", "Cuidados", "Pata Livre", 4290, ["P/M", "G"]),
  mock("cccccccc-cccc-4ccc-8ccc-cccccccccccc", "Shampoo Neutro Carinho", "shampoo-neutro-carinho", "Cuidados", "Casa Animal", 3490, ["500 ml"]),
];

function mock(id: string, name: string, slug: string, category: string, brand: string, price: number, variants: string[]): Product {
  return { id, name, slug, category_name: category, brand, min_price_cents: price, image_url: null,
    description: `Produto demonstrativo para validar navegação, variantes, carrinho e checkout. As informações comerciais serão substituídas pelo catálogo real da loja.`,
    variants: variants.map((label, index) => ({ id: `${id.slice(0, 24)}${String(index + 1).padStart(12, "0")}`, sku: `DEMO-${slug.slice(0, 12)}-${index + 1}`, label, unit: "un", price_cents: price + index * Math.round(price * .65), stock_quantity: 8 - index })) };
}

export async function listProducts(search = "", filters: { category?: string; brand?: string; sort?: string } = {}): Promise<Product[]> {
  if (!hasDatabase()) {
    if (!demoMode) return [];
    let result = demoProducts.filter((p) => !search || `${p.name} ${p.brand}`.toLowerCase().includes(search.toLowerCase()));
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
    ...row,
    variants: await sql`SELECT id, sku, label, unit, price_cents, stock_quantity FROM variants WHERE product_id=${row.id} AND sellable=true ORDER BY price_cents`,
  }))) as unknown as Product[];
}

export async function getProduct(slug: string): Promise<Product | null> {
  if (!hasDatabase() && demoMode) return demoProducts.find((p) => p.slug === slug) ?? null;
  const products = await listProducts();
  return products.find((p) => p.slug === slug) ?? null;
}
