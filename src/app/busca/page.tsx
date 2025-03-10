'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/layout/Header'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Product } from '@/types/product'
import { SearchBar } from '@/components/search/SearchBar'
import { Funnel } from 'phosphor-react'

// Dados de exemplo - será substituído pela API
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Ração Premium para Cães Adultos',
    slug: 'racao-premium-caes-adultos',
    description: 'Ração premium desenvolvida especialmente para cães adultos.',
    images: [
      {
        id: '1',
        url: '/products/racao.jpg',
        alt: 'Ração Premium para Cães',
        isMain: true
      }
    ],
    category: 'Ração',
    variants: [
      {
        id: '1',
        name: '15kg',
        price: 159.90,
        compareAtPrice: 179.90,
        sku: 'RAC-PREM-15KG',
        stockQuantity: 10
      }
    ],
    brand: 'PremiumPet',
    rating: 4.5,
    reviewCount: 128,
    tags: ['ração', 'cachorro', 'premium'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    brand: '',
  })

  useEffect(() => {
    const searchProducts = async () => {
      setIsLoading(true)
      // Simula uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000))
      setProducts(mockProducts)
      setIsLoading(false)
    }

    searchProducts()
  }, [query, filters])

  return (
    <>
      <Header />
      <main className="container pt-24">
        <div className="flex items-center gap-4 mb-8">
          <SearchBar className="flex-1" />
          <button className="btn-primary flex items-center gap-2">
            <Funnel className="w-5 h-5" />
            Filtros
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
            <p className="mt-4 text-text/60">Buscando produtos...</p>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-text/60">
                {products.length} resultado{products.length !== 1 ? 's' : ''} para "{query}"
              </p>
              <select className="border rounded-lg px-3 py-2">
                <option value="relevance">Mais relevantes</option>
                <option value="price_asc">Menor preço</option>
                <option value="price_desc">Maior preço</option>
                <option value="rating">Melhor avaliados</option>
              </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filtros */}
              <aside className="lg:col-span-1 space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Categorias</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded text-primary" />
                      <span>Ração (10)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded text-primary" />
                      <span>Brinquedos (5)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded text-primary" />
                      <span>Higiene (3)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Preço</h3>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Marcas</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded text-primary" />
                      <span>PremiumPet (5)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded text-primary" />
                      <span>RoyalCanin (3)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded text-primary" />
                      <span>Pedigree (2)</span>
                    </label>
                  </div>
                </div>
              </aside>

              {/* Lista de Produtos */}
              <div className="lg:col-span-3">
                <ProductGrid products={products} />
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-2xl font-semibold text-text mb-2">
              Nenhum resultado encontrado
            </p>
            <p className="text-text/60">
              Não encontramos produtos correspondentes à sua busca por "{query}"
            </p>
          </div>
        )}
      </main>
    </>
  )
} 