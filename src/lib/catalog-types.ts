export type ProductVariant = {
  id: string;
  sku: string;
  label: string;
  unit: string;
  price_cents: number;
  stock_quantity: number | null;
};

export type DemoMerchandising = {
  compareAtCents?: number;
  badge?: "Mais pedido" | "Novidade" | "Escolha da casa";
  rating?: number;
  reviewsCount?: number;
};

export type ProductMetadata = {
  source?: "spreadsheet" | "database";
  sourceCode?: string;
  pet?: "cao" | "gato" | "geral";
  lifeStage?: "filhote" | "adulto" | "senior";
  size?: "pequeno" | "medio" | "grande";
  needs?: string[];
  flavors?: string[];
  weight?: string;
  productType?: string;
  tags?: string[];
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  brand: string | null;
  image_url: string | null;
  images: string[];
  category_name: string | null;
  min_price_cents: number | null;
  variants: ProductVariant[];
  metadata?: ProductMetadata;
  demo?: DemoMerchandising;
};
