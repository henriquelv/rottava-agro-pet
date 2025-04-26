'use client'

import { useState, useEffect } from 'react'
import { MagnifyingGlass, Funnel, X } from 'phosphor-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Product } from '@/types/product'

interface ProductSearchProps {
  products: Product[]
}

export function ProductSearch({ products }: ProductSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    priceRange: searchParams.get('priceRange') || '',
    rating: searchParams.get('rating') || '',
    brand: searchParams.get('brand') || ''
  })

  const categories = [...new Set(products.map(p => p.category))]
  const brands = [...new Set(products.map(p => p.brand))]
  const priceRanges = [
    { label: 'Até R$ 50', value: '0-50' },
    { label: 'R$ 50 - R$ 100', value: '50-100' },
    { label: 'R$ 100 - R$ 200', value: '100-200' },
    { label: 'Acima de R$ 200', value: '200+' }
  ]

  useEffect(() => {
    const params = new URLSearchParams()
    if (searchTerm) params.set('q', searchTerm)
    if (filters.category) params.set('category', filters.category)
    if (filters.priceRange) params.set('priceRange', filters.priceRange)
    if (filters.rating) params.set('rating', filters.rating)
    if (filters.brand) params.set('brand', filters.brand)

    router.push(`/produtos?${params.toString()}`)
  }, [searchTerm, filters, router])

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      rating: '',
      brand: ''
    })
    setSearchTerm('')
    router.push('/produtos')
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar produtos..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Buscar produtos"
          />
          <MagnifyingGlass
            size={20}
            className="absolute right-3 top-2.5 text-gray-400"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          aria-label={showFilters ? 'Fechar filtros' : 'Abrir filtros'}
        >
          <Funnel size={20} />
          <span>Filtros</span>
        </button>
      </div>

      {showFilters && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Filtros</h3>
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
              Limpar filtros
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Todas</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Faixa de Preço
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Todas</option>
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Avaliação
              </label>
              <select
                value={filters.rating}
                onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Todas</option>
                <option value="4">4 estrelas ou mais</option>
                <option value="3">3 estrelas ou mais</option>
                <option value="2">2 estrelas ou mais</option>
                <option value="1">1 estrela ou mais</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marca
              </label>
              <select
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Todas</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 