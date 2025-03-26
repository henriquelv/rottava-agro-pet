'use client'

import React, { useState } from 'react'
import {
  Plus,
  Pencil,
  Trash,
  Package,
  MagnifyingGlass,
  Funnel
} from 'phosphor-react'
import { ProductForm } from '@/components/admin/ProductForm'

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'active' | 'inactive'
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Ração Premium',
    category: 'Alimentação',
    price: 89.90,
    stock: 50,
    status: 'active'
  },
  {
    id: '2',
    name: 'Coleira Ajustável',
    category: 'Acessórios',
    price: 45.00,
    stock: 30,
    status: 'active'
  },
  {
    id: '3',
    name: 'Brinquedo Interativo',
    category: 'Brinquedos',
    price: 29.90,
    stock: 0,
    status: 'inactive'
  }
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>(mockProducts)

  const categories = ['all', ...new Set(products.map(p => p.category))]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddStock = (productId: string, amount: number) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? { ...product, stock: Math.max(0, product.stock + amount) }
          : product
      )
    )
  }

  const handleRemoveStock = (productId: string, amount: number) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? { ...product, stock: Math.max(0, product.stock - amount) }
          : product
      )
    )
  }

  const handleAddProduct = async (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Math.random().toString(36).substr(2, 9)
    }
    setProducts(prev => [...prev, newProduct])
  }

  const handleEditProduct = async (product: Omit<Product, 'id'>) => {
    if (!editingProduct) return

    setProducts(prev =>
      prev.map(p =>
        p.id === editingProduct.id
          ? { ...product, id: editingProduct.id }
          : p
      )
    )
  }

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId))
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Produtos</h1>
          <p className="text-text/60">
            Gerencie o estoque e cadastro de produtos
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus size={20} />
          <span>Novo Produto</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <MagnifyingGlass
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text/40"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20 transition-shadow"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Funnel className="text-text/40" size={20} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20 transition-shadow"
          >
            <option value="all">Todas as categorias</option>
            {categories
              .filter((cat) => cat !== 'all')
              .map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background">
                <th className="px-6 py-3 text-left text-sm font-medium text-text/60">
                  Produto
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-text/60">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-text/60">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-text/60">
                  Estoque
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-text/60">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-text/60">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Package className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-text/60">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{product.category}</td>
                  <td className="px-6 py-4 text-sm">
                    R$ {product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRemoveStock(product.id, 1)}
                        className="p-1 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        -
                      </button>
                      <span className="w-12 text-center">{product.stock}</span>
                      <button
                        onClick={() => handleAddStock(product.id, 1)}
                        className="p-1 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        <Pencil className="text-primary" size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash className="text-red-600" size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Adicionar Produto */}
      {showAddModal && (
        <ProductForm
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddProduct}
        />
      )}

      {/* Modal de Edição */}
      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSubmit={handleEditProduct}
        />
      )}
    </div>
  )
} 