'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/components/product/ProductCard'
import ProductFilters from '@/components/product/ProductFilters'
import { Sliders, MagnifyingGlass, House } from 'phosphor-react'
import Link from 'next/link'
import Header from '@/components/layout/Header'

interface Product {
  id: string
  slug: string
  name: string
  description: string
  category: string
  rating: number
  images: {
    url: string
    alt: string
    isMain: boolean
  }[]
  variants: {
    name: string
    price: number
    stockQuantity: number
  }[]
  tags: string[]
}

export default function Produtos() {
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    category: [] as string[],
    subCategory: [] as string[],
    priceRange: {
      min: 0,
      max: 0,
    },
    brand: [] as string[],
    animalType: [] as string[],
    animalAge: [] as string[],
    animalSize: [] as string[],
    specialNeeds: [] as string[],
    flavor: [] as string[],
    packageSize: [] as string[],
    productType: [] as string[],
    material: [] as string[],
    size: [] as string[],
    color: [] as string[],
    availability: {
      inStock: false,
      onSale: false,
      bestSellers: false,
      newArrivals: false,
    },
    rating: 0,
  })

  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [filters, allProducts, searchTerm])

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setAllProducts(data)
      setFilteredProducts(data)
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = [...allProducts]

    // Filtro por termo de busca
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTermLower) ||
          product.description.toLowerCase().includes(searchTermLower) ||
          product.category.toLowerCase().includes(searchTermLower) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchTermLower))
      )
    }

    // Filtro por categoria
    if (filters.category.length > 0) {
      filtered = filtered.filter((product) =>
        filters.category.includes(product.category)
      )
    }

    // Filtro por preço
    if (filters.priceRange.min > 0 || filters.priceRange.max > 0) {
      filtered = filtered.filter((product) => {
        const lowestPrice = Math.min(...product.variants.map((v) => v.price))
        if (filters.priceRange.min > 0 && lowestPrice < filters.priceRange.min) {
          return false
        }
        if (filters.priceRange.max > 0 && lowestPrice > filters.priceRange.max) {
          return false
        }
        return true
      })
    }

    // Filtro por tipo de animal
    if (filters.animalType.length > 0) {
      filtered = filtered.filter((product) =>
        filters.animalType.some((type) => product.tags.includes(type))
      )
    }

    // Filtro por disponibilidade
    if (filters.availability.inStock) {
      filtered = filtered.filter((product) =>
        product.variants.some((v) => v.stockQuantity > 0)
      )
    }

    // Filtro por avaliação
    if (filters.rating > 0) {
      filtered = filtered.filter((product) => product.rating >= filters.rating)
    }

    setFilteredProducts(filtered)
  }

  return (
    <>
      <Header />
      <div className="pt-24 container">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-text">Produtos</h1>
            <div className="flex gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-text hover:text-primary transition-colors"
              >
                <House size={24} />
                Página Inicial
              </Link>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 text-text hover:text-primary transition-colors"
              >
                <Sliders size={24} />
                Filtros
              </button>
            </div>
          </div>

          {/* Barra de Pesquisa */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            />
            <MagnifyingGlass
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filtros */}
          <aside
            className={`${
              showFilters ? 'block' : 'hidden'
            } md:block bg-white p-6 rounded-lg shadow-sm h-fit sticky top-24 max-h-[calc(100vh-6rem)] overflow-hidden`}
          >
            <ProductFilters filters={filters} onFilterChange={setFilters} />
          </aside>

          {/* Lista de Produtos */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-text/60">Carregando produtos...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-text/60">Nenhum produto encontrado</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
} 