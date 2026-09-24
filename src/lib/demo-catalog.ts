import catalogProducts from "../data/catalog-products.json";
import type { Product } from "./catalog-types";

// Fallback catalog sourced from the store workbook. The same Product contract
// is used by database-backed environments and local/Vercel fallback mode.
export const demoProducts = catalogProducts as Product[];
