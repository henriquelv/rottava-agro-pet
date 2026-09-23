import type { MetadataRoute } from "next";
import { listProducts } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://rottava-pet-casa-jardim.vercel.app";
  const pages = ["", "/produtos", "/banho-e-tosa", "/atendimento", "/loja"];
  const products = await listProducts();
  return [...pages.map((path) => ({ url: `${base}${path}`, changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : .7 })), ...products.map((product) => ({ url: `${base}/produto/${product.slug}`, changeFrequency: "weekly" as const, priority: .8 }))];
}
