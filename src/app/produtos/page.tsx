import React from 'react'
import { Product, Image as ImageModel, Category } from '@/database/models'
import ProductGrid from '@/components/ProductGrid'
import CategoriesGrid from '@/components/CategoriesGrid'
import { metadata } from './metadata'

export { metadata }

export default async function ProductsPage() {
  const rawProducts = await Product.findAll({
    include: [
      {
        model: ImageModel,
        as: 'images'
      },
      {
        model: Category,
        as: 'category'
      }
    ],
    order: [['createdAt', 'DESC']]
  })

  const rawCategories = await Category.findAll({
    order: [['nome', 'ASC']]
  })

  // Convertendo para objetos simples
  const products = JSON.parse(JSON.stringify(rawProducts))
  const categories = JSON.parse(JSON.stringify(rawCategories))

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Categorias em Destaque</h2>
        <CategoriesGrid categories={categories} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Nossos Produtos</h2>
        <ProductGrid products={products} />
      </section>
    </div>
  )
} 