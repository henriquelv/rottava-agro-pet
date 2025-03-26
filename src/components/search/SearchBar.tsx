'use client'

import React, { useState, useEffect, useRef } from 'react'
import { MagnifyingGlass, X, Package } from 'phosphor-react'
import { useRouter } from 'next/navigation'
import { Product } from '@/types/product'
import Image from 'next/image'
import Link from 'next/link'
import { formatCurrency } from '@/utils/format'

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
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const searchProducts = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setResults(data.products)
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
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
    const delayDebounceFn = setTimeout(() => {
      searchProducts(query)
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    onSearch?.(query)
    router.push(`/produtos?q=${encodeURIComponent(query)}`)
    setIsOpen(false)
  }

  const handleProductClick = (product: Product) => {
    router.push(`/produtos/${product.slug}`)
    setIsOpen(false)
    setQuery('')
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Buscar produtos..."
          className="w-full pl-10 pr-4 py-2 rounded-full bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-shadow"
        />
        <MagnifyingGlass
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text/60"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setResults([])
              inputRef.current?.focus()
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text/60 hover:text-text transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </form>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-border overflow-hidden z-50">
          {isLoading ? (
            <div className="flex items-center justify-center p-8 text-text/60">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
            </div>
          ) : results.length > 0 ? (
            <div className="divide-y divide-border">
              {results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="flex items-center gap-4 p-4 w-full hover:bg-background/50 transition-colors text-left"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-background flex-shrink-0">
                    {product.images[0] ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.images[0].alt}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text/20">
                        <Package size={24} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-text truncate">{product.name}</h4>
                    <p className="text-sm text-text/60 truncate">{product.description}</p>
                    <p className="text-sm font-medium text-primary mt-1">
                      {product.variants && product.variants.length > 0 
                        ? formatCurrency(product.variants[0].price)
                        : formatCurrency(product.price || 0)}
                    </p>
                  </div>
                </button>
              ))}
              <Link
                href={`/produtos?q=${encodeURIComponent(query)}`}
                className="block p-4 text-center text-primary hover:text-primary-dark transition-colors"
              >
                Ver todos os resultados
              </Link>
            </div>
          ) : query.trim() ? (
            <div className="flex flex-col items-center justify-center p-8 text-text/60">
              <Package size={32} className="mb-2" />
              <p>Nenhum produto encontrado</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
} 