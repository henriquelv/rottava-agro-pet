'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

interface ProdutosFiltrosProps {
  categorias: string[]
}

export function ProdutosFiltros({ categorias }: ProdutosFiltrosProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [busca, setBusca] = useState(searchParams.get('busca') || '')
  const [categoria, setCategoria] = useState(searchParams.get('categoria') || '')

  const handleBusca = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (busca) params.set('busca', busca)
    if (categoria) params.set('categoria', categoria)
    router.push(`/produtos?${params.toString()}`)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <form onSubmit={handleBusca} className="space-y-4">
        <div>
          <label htmlFor="busca" className="block text-sm font-medium text-gray-700 mb-1">
            Buscar
          </label>
          <input
            type="text"
            id="busca"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Buscar produtos..."
          />
        </div>

        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
            Categoria
          </label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Todas as categorias</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Filtrar
        </button>
      </form>
    </div>
  )
} 