import { describe, expect, it } from "vitest";
import type { Product } from "./catalog-types";
import { factualBenefits, rankCatalog } from "./catalog-guidance";

const products: Product[] = [
  { id: "dog", name: "Ração Cão Adulto", slug: "dog", description: null, brand: "Marca A", image_url: null, images: [], category_name: "Cães", min_price_cents: 5000, variants: [{ id: "dog-1", sku: "1", label: "3 kg", unit: "un", price_cents: 5000, stock_quantity: null }], metadata: { pet: "cao", lifeStage: "adulto", size: "medio", productType: "racao" } },
  { id: "cat", name: "Sachê Gato Adulto", slug: "cat", description: null, brand: "Marca B", image_url: null, images: [], category_name: "Gatos", min_price_cents: 700, variants: [{ id: "cat-1", sku: "2", label: "85 g", unit: "un", price_cents: 700, stock_quantity: null }], metadata: { pet: "gato", lifeStage: "adulto", productType: "sache" } },
];

describe("catalog guidance", () => {
  it("keeps recommendations inside the selected pet profile", () => {
    expect(rankCatalog(products, { pet: "gato", lifeStage: "adulto", need: "sache" }).map((product) => product.id)).toEqual(["cat"]);
  });

  it("builds benefit copy only from catalog fields", () => {
    expect(factualBenefits(products[0])).toEqual(["Produto da marca Marca A", "Cadastro indicado para adultos", "Opção cadastrada para porte médio"]);
  });
});
