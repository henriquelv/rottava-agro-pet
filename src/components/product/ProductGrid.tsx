'use client'

import React from 'react'
import ProductCard from './ProductCard'
import { Product } from '@/types/product'
import { Package } from 'phosphor-react'

interface ProductGridProps {
  products: Product[]
  title?: string
}

export function ProductGrid({ products, title }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-text/60">
        <Package size={64} className="mb-4" />
        <p className="text-lg font-medium">Nenhum produto encontrado</p>
        <p className="text-sm">Tente ajustar os filtros ou buscar por outro termo</p>
      </div>
    )
  }

  return (
    <section className="py-12">
      {title && (
        <h2 className="text-2xl font-bold text-text mb-8 text-center">{title}</h2>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
} 