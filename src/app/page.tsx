'use client'

import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import { HeroCarousel } from '@/components/home/HeroCarousel'
import CategoryList from '@/components/CategoryList'
import { ProductShowcase } from '@/components/home/ProductShowcase'
import prisma from '@/lib/prisma'

export async function getServerSideProps() {
  const categories = await prisma.category.findMany()
  const products = await prisma.product.findMany({ take: 6 })
  return {
    props: { categories, products },
  }
}

export default function Home({ categories, products }) {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const filteredProducts = selectedCategory
    ? products.filter(product => product.categoryId === selectedCategory.id)
    : products

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Categorias</h1>
      <div className="flex space-x-4 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg ${selectedCategory?.id === category.id ? 'bg-primary text-white' : 'bg-gray-200'}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Produtos</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={product.imageUrl || 'https://via.placeholder.com/300'} alt={product.name} className="w-full h-48 object-cover mb-4" />
            <h3 className="text-lg font-bold mb-2">{product.name}</h3>
            <p className="text-gray-700">{product.price}</p>
            <a href={`/produto/${product.slug}`} className="text-primary hover:underline">Ver Produto</a>
          </div>
        ))}
      </div>
    </div>
  )
} 