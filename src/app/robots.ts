import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://rottava-pet-casa-jardim.vercel.app";
  return { rules: { userAgent: "*", allow: "/", disallow: ["/admin/", "/entregador/", "/checkout", "/minha-conta/"] }, sitemap: `${base}/sitemap.xml` };
}
