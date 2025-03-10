'use client'

import React from 'react'
import ProductCard from './ProductCard'
import { Product } from '@/types/product'

interface ProductGridProps {
  products: Product[]
  title?: string
}

export function ProductGrid({ products, title }: ProductGridProps) {
  return (
    <section className="py-12">
      {title && (
        <h2 className="text-2xl font-bold text-text mb-8 text-center">{title}</h2>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="opacity-0 animate-fade-in">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
} 