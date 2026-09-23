import type { DemoMerchandising, Product } from "./catalog-types";

type FixtureOptions = {
  images?: string[];
  merchandising?: DemoMerchandising;
};

export const demoProducts: Product[] = [
  fixture("11111111-1111-4111-8111-111111111111", "Ração Equilíbrio Cães Adultos", "racao-equilibrio-caes", "Pet", "Rottava Essencial", 12990, ["3 kg", "10 kg"], { images: ["/images/demo/racao-editorial.webp", "/images/demo/racao-detalhe.webp"], merchandising: { compareAtCents: 14990, badge: "Mais pedido", rating: 4.8, reviewsCount: 82 } }),
  fixture("22222222-2222-4222-8222-222222222222", "Sachê Seleção para Gatos", "sache-selecao-gatos", "Pet", "Casa Animal", 690, ["85 g", "Kit 12"], { images: ["/images/demo/sache-editorial.webp"], merchandising: { badge: "Escolha da casa", rating: 4.7, reviewsCount: 61 } }),
  fixture("33333333-3333-4333-8333-333333333333", "Brinquedo Corda & Bola", "brinquedo-corda-bola", "Pet", "Pata Livre", 3290, ["Pequeno", "Grande"], { merchandising: { rating: 4.6, reviewsCount: 39 } }),
  fixture("44444444-4444-4444-8444-444444444444", "Arranhador Horizonte", "arranhador-horizonte", "Pet", "Casa Animal", 8990, ["Único"], { merchandising: { compareAtCents: 10490, rating: 4.5, reviewsCount: 27 } }),
  fixture("55555555-5555-4555-8555-555555555555", "Cama Ninho Aconchego", "cama-ninho-aconchego", "Pet", "Rottava Essencial", 15990, ["M", "G"], { images: ["/images/demo/cama-editorial.webp"], merchandising: { compareAtCents: 18990, badge: "Novidade", rating: 4.9, reviewsCount: 48 } }),
  fixture("66666666-6666-4666-8666-666666666666", "Peitoral Passeio Leve", "peitoral-passeio-leve", "Pet", "Pata Livre", 7490, ["P", "M", "G"], { merchandising: { rating: 4.7, reviewsCount: 54 } }),
  fixture("77777777-7777-4777-8777-777777777777", "Regador Jardim Vivo", "regador-jardim-vivo", "Casa & Jardim", "Verde Perto", 5990, ["5 L"], { images: ["/images/demo/jardim-editorial.webp"], merchandising: { badge: "Escolha da casa", rating: 4.8, reviewsCount: 33 } }),
  fixture("88888888-8888-4888-8888-888888888888", "Vaso Cerâmica Orvalho", "vaso-ceramica-orvalho", "Casa & Jardim", "Verde Perto", 4590, ["18 cm", "26 cm"], { images: ["/images/demo/jardim-editorial.webp"], merchandising: { compareAtCents: 5290, badge: "Novidade", rating: 4.9, reviewsCount: 41 } }),
  fixture("99999999-9999-4999-8999-999999999999", "Kit Horta de Temperos", "kit-horta-temperos", "Casa & Jardim", "Quintal Bom", 3890, ["3 espécies"], { images: ["/images/demo/jardim-editorial.webp"], merchandising: { badge: "Mais pedido", rating: 4.8, reviewsCount: 72 } }),
  fixture("aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", "Manta Proteção Sofá", "manta-protecao-sofa", "Casa & Jardim", "Rottava Essencial", 9490, ["1,20 m", "1,80 m"], { merchandising: { compareAtCents: 10990, rating: 4.6, reviewsCount: 26 } }),
  fixture("bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb", "Escova Pelagem Macia", "escova-pelagem-macia", "Cuidados", "Pata Livre", 4290, ["P/M", "G"], { merchandising: { rating: 4.8, reviewsCount: 67 } }),
  fixture("cccccccc-cccc-4ccc-8ccc-cccccccccccc", "Shampoo Neutro Carinho", "shampoo-neutro-carinho", "Cuidados", "Casa Animal", 3490, ["500 ml"], { merchandising: { badge: "Mais pedido", rating: 4.9, reviewsCount: 91 } }),
];

function fixture(id: string, name: string, slug: string, category: string, brand: string, price: number, variants: string[], options: FixtureOptions = {}): Product {
  return {
    id, name, slug, category_name: category, brand, min_price_cents: price,
    image_url: options.images?.[0] ?? null, images: options.images ?? [], demo: options.merchandising,
    description: "Item demonstrativo criado exclusivamente para validar navegação, variantes, carrinho e checkout. O catálogo real substituirá estas informações comerciais.",
    variants: variants.map((label, index) => ({ id: `${id.slice(0, 24)}${String(index + 1).padStart(12, "0")}`, sku: `DEMO-${slug.slice(0, 12)}-${index + 1}`, label, unit: "un", price_cents: price + index * Math.round(price * .65), stock_quantity: 8 - index })),
  };
}
