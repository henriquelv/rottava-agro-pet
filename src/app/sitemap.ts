import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://rottavaagropet.com.br'

  // Páginas estáticas
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/produtos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categorias`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Páginas de produtos
  const products = await prisma.produto.findMany({
    select: {
      slug: true,
      updatedAt: true,
      categoria: {
        select: {
          slug: true,
        },
      },
    },
  })

  const productPages = products.map((product) => ({
    url: `${baseUrl}/produtos/${product.categoria.slug}/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Páginas de categorias
  const categories = await prisma.categoria.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  })

  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/categorias/${category.slug}`,
    lastModified: category.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticPages, ...productPages, ...categoryPages]
} 