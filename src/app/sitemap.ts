import { MetadataRoute } from 'next'
import { products } from '@/data/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rottavaagropet.com.br'

  // Páginas estáticas
  const staticPages = [
    '',
    '/produtos',
    '/banho-e-tosa',
    '/sobre',
    '/contato',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }))

  // Páginas de produtos
  const productPages = products.map((product) => ({
    url: `${baseUrl}/produtos/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...productPages]
} 