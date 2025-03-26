'use client'

import React, { useState, useEffect } from 'react'
import { X } from 'phosphor-react'

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'active' | 'inactive'
}

interface ProductFormProps {
  product?: Product
  onClose: () => void
  onSubmit: (product: Omit<Product, 'id'>) => Promise<void>
}

const categories = [
  'Alimentação',
  'Acessórios',
  'Brinquedos',
  'Higiene',
  'Medicamentos',
  'Outros'
]

export function ProductForm({ product, onClose, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'active' as const
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        stock: product.stock.toString(),
        status: product.status
      })
    }
  }, [product])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await onSubmit({
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        status: formData.status
      })
      onClose()
    } catch (err) {
      setError('Erro ao salvar produto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            {product ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-background rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Nome do Produto
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20 transition-shadow"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Categoria
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20 transition-shadow"
              required
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Preço
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, price: e.target.value }))
                }
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20 transition-shadow"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Estoque
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, stock: e.target.value }))
                }
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20 transition-shadow"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  status: e.target.value as 'active' | 'inactive'
                }))
              }
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20 transition-shadow"
            >
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-text/60 hover:text-text transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 