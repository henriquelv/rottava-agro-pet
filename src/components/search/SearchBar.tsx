'use client'

import React, { useState, useEffect, useRef } from 'react'
import { MagnifyingGlass, X } from 'phosphor-react'
import { useRouter } from 'next/navigation'
import { Product } from '@/types/product'

interface SearchBarProps {
  onSearch?: (query: string) => void
  className?: string
}

export function SearchBar({ onSearch, className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Simula uma busca na API
  const searchProducts = async (searchQuery: string) => {
    setIsLoading(true)
    // Aqui você implementará a chamada real à API
    await new Promise(resolve => setTimeout(resolve, 500))
    setIsLoading(false)
    
    // Dados de exemplo
    setResults([
      {
        id: '1',
        name: 'Ração Premium',
        slug: 'racao-premium',
        description: 'Ração premium para cães',
        images: [{ id: '1', url: '/products/racao.jpg', alt: 'Ração', isMain: true }],
        category: 'Ração',
        variants: [{ id: '1', name: 'Padrão', price: 159.90, sku: 'RAC001', stockQuantity: 10 }],
        brand: 'PremiumPet',
        rating: 4.5,
        reviewCount: 128,
        tags: ['ração'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ])
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (query.length >= 3) {
      const debounce = setTimeout(() => {
        searchProducts(query)
      }, 300)

      return () => clearTimeout(debounce)
    } else {
      setResults([])
    }
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch?.(query)
      router.push(`/busca?q=${encodeURIComponent(query)}`)
      setIsOpen(false)
    }
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          placeholder="Buscar produtos..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
        <MagnifyingGlass
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text/60"
          weight="bold"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setResults([])
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="w-5 h-5 text-text/60" weight="bold" />
          </button>
        )}
      </form>

      {/* Resultados da Busca */}
      {isOpen && (query.length >= 3 || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border overflow-hidden z-50">
          {isLoading ? (
            <div className="p-4 text-center text-text/60">Buscando...</div>
          ) : results.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
              {results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => {
                    router.push(`/produto/${product.slug}`)
                    setIsOpen(false)
                  }}
                  className="w-full p-4 hover:bg-gray-50 flex items-center gap-4 text-left"
                >
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <img
                      src={product.images[0].url}
                      alt={product.images[0].alt}
                      className="object-cover rounded"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-text">{product.name}</h3>
                    <p className="text-sm text-text/60">{product.brand}</p>
                    <p className="text-sm font-medium text-primary">
                      R$ {product.variants[0].price.toFixed(2)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : query.length >= 3 ? (
            <div className="p-4 text-center text-text/60">
              Nenhum resultado encontrado para "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
} 