'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { products } from '@/data/products'
import { ProductGrid } from '@/components/ProductGrid'
import Header from '@/components/layout/Header'
import { WavyBackground } from '@/components/layout/WavyBackground'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')?.toLowerCase() || ''

  const searchResults = products.filter(product => {
    const searchableText = `${product.name} ${product.description} ${product.category}`.toLowerCase()
    return searchableText.includes(query)
  })

  return (
    <WavyBackground>
      <Header />
      <main className="min-h-screen py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold text-white mb-4">
              Resultados da busca
            </h1>
            <p className="text-white/80 text-lg">
              {searchResults.length} {searchResults.length === 1 ? 'produto encontrado' : 'produtos encontrados'} para "{query}"
            </p>
          </div>

          {searchResults.length > 0 ? (
            <ProductGrid products={searchResults} />
          ) : (
            <div className="text-center text-white">
              <p className="text-xl">Nenhum produto encontrado.</p>
              <p className="mt-2">Tente buscar com outras palavras ou navegue por nossas categorias.</p>
              <a 
                href="/produtos"
                className="inline-block mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Ver todos os produtos
              </a>
            </div>
          )}
        </div>
      </main>
    </WavyBackground>
  )
} 