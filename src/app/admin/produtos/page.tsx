'use client'

import React, { useState, useEffect } from 'react'
import {
  Plus,
  Pencil,
  Trash,
  Package,
  MagnifyingGlass,
  Funnel,
  ArrowUp,
  ArrowDown,
  Export,
  UploadSimple,
  Barcode,
  Tag,
  Archive,
  Truck,
  QrCode
} from 'phosphor-react'
import { ProductForm } from '@/components/admin/ProductForm'
import { formatCurrency } from '@/utils/format'
import { products as initialProducts } from '@/data/products'
import { Product, StockMovement } from '@/types/product'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compareAtPrice?: number
  images: {
    url: string
    alt: string
  }[]
  category: string
  brand: string
  rating: number
  reviewCount: number
  tags: string[]
  stock: number
  minStock: number
  status: string
}

interface StockMovement {
  id: string
  productId: string
  type: 'in' | 'out'
  quantity: number
  reason?: string
  createdAt: string
}

type SortField = 'name' | 'price' | 'category' | 'stock'
type SortDirection = 'asc' | 'desc'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showStockModal, setShowStockModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([])
  const [showImportModal, setShowImportModal] = useState(false)
  const [showBarcodeModal, setShowBarcodeModal] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [view, setView] = useState<'grid' | 'table'>('table')
  const [sortField, setSortField] = useState<keyof Product>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [filters, setFilters] = useState({
    status: 'all',
    stock: 'all',
    supplier: 'all',
    location: 'all'
  })

  // Buscar produtos
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao buscar produtos')
      }
      
      setProducts(data)
    } catch (error) {
      setError('Erro ao carregar produtos')
    } finally {
      setLoading(false)
    }
  }

  // Filtrar produtos
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Categorias únicas
  const categories = ['all', ...new Set(products.map(p => p.category))]

  // Gerenciar estoque
  const handleAddStock = async (productId: string, quantity: number, reason: string) => {
    try {
      const response = await fetch('/api/admin/stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId,
          type: 'in',
          quantity,
          reason
        })
      })

      if (!response.ok) {
        throw new Error('Erro ao adicionar estoque')
      }

      fetchProducts()
      fetchStockMovements(productId)
    } catch (error) {
      setError('Erro ao adicionar estoque')
    }
  }

  const handleRemoveStock = async (productId: string, quantity: number, reason: string) => {
    try {
      const response = await fetch('/api/admin/stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId,
          type: 'out',
          quantity,
          reason
        })
      })

      if (!response.ok) {
        throw new Error('Erro ao remover estoque')
      }

      fetchProducts()
      fetchStockMovements(productId)
    } catch (error) {
      setError('Erro ao remover estoque')
    }
  }

  const fetchStockMovements = async (productId: string) => {
    try {
      const response = await fetch(`/api/admin/stock?productId=${productId}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao buscar movimentos de estoque')
      }
      
      setStockMovements(data)
    } catch (error) {
      setError('Erro ao carregar movimentos de estoque')
    }
  }

  // Gerenciar produtos
  const handleAddProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      })

      if (!response.ok) {
        throw new Error('Erro ao adicionar produto')
      }

      fetchProducts()
      setShowAddModal(false)
    } catch (error) {
      setError('Erro ao adicionar produto')
    }
  }

  const handleEditProduct = async (product: Product) => {
    try {
      const response = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      })

      if (!response.ok) {
        throw new Error('Erro ao editar produto')
      }

      fetchProducts()
      setEditingProduct(null)
    } catch (error) {
      setError('Erro ao editar produto')
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/admin/products?id=${productId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Erro ao deletar produto')
      }

      fetchProducts()
    } catch (error) {
      setError('Erro ao deletar produto')
    }
  }

  // Função para ordenar produtos
  const sortProducts = (a: any, b: any) => {
    const direction = sortDirection === 'asc' ? 1 : -1
    
    switch (sortField) {
      case 'name':
        return direction * a.name.localeCompare(b.name)
      case 'price':
        return direction * (a.price - b.price)
      case 'category':
        return direction * a.category.localeCompare(b.category)
      case 'stock':
        return direction * ((a.stock || 0) - (b.stock || 0))
      default:
        return 0
    }
  }

  // Filtra e ordena os produtos
  const sortedProducts = filteredProducts.sort(sortProducts)

  // Função para alternar a direção da ordenação
  const toggleSort = (field: keyof Product) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Função para selecionar/deselecionar todos os produtos
  const toggleSelectAll = () => {
    if (selectedProducts.length === sortedProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(sortedProducts.map(p => p.id))
    }
  }

  // Função para selecionar/deselecionar um produto
  const toggleSelectProduct = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId))
    } else {
      setSelectedProducts([...selectedProducts, productId])
    }
  }

  // Funções auxiliares
  const getStockStatus = (product: Product) => {
    if (product.stock <= 0) return 'out_of_stock'
    if (product.stock <= product.minStock) return 'low_stock'
    if (product.maxStock && product.stock >= product.maxStock) return 'overstock'
    return 'ok'
  }

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'out_of_stock':
        return 'bg-red-100 text-red-800'
      case 'low_stock':
        return 'bg-yellow-100 text-yellow-800'
      case 'overstock':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-green-100 text-green-800'
    }
  }

  // Ações em lote
  const bulkActions = [
    {
      label: 'Exportar',
      icon: Export,
      action: () => handleExport()
    },
    {
      label: 'Ajustar Estoque',
      icon: Archive,
      action: () => handleBulkStockAdjustment()
    },
    {
      label: 'Transferir',
      icon: Truck,
      action: () => setShowTransferModal(true)
    },
    {
      label: 'Gerar Etiquetas',
      icon: Tag,
      action: () => handleGenerateLabels()
    },
    {
      label: 'Excluir',
      icon: Trash,
      action: () => handleBulkDelete(),
      className: 'text-red-600 hover:bg-red-50'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
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
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
          >
            <UploadSimple size={20} />
            <span>Importar</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            <Plus size={20} />
            <span>Novo Produto</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Filtros */}
      <div className="flex gap-4">
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
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === sortedProducts.length}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </th>
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
            <tbody className="divide-y divide-gray-100">
              {sortedProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleSelectProduct(product.id)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </td>
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
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedProduct(product)
                          setShowStockModal(true)
                          fetchStockMovements(product.id)
                        }}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span className={`font-medium ${
                          getStockStatus(product) === 'out_of_stock'
                            ? 'text-red-600'
                            : getStockStatus(product) === 'low_stock'
                            ? 'text-yellow-600'
                            : 'text-green-600'
                        }`}>
                          {product.stock}
                        </span>
                        <span className="text-text/60">
                          (Min: {product.minStock})
                        </span>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : product.status === 'inactive'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {product.status === 'active' ? 'Ativo' :
                       product.status === 'inactive' ? 'Inativo' :
                       'Rascunho'}
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

      {/* Modal de Adicionar/Editar Produto */}
      {(showAddModal || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setShowAddModal(false)
            setEditingProduct(null)
          }}
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
        />
      )}

      {/* Modal de Estoque */}
      {showStockModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              Gerenciar Estoque - {selectedProduct.name}
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-text/60">Estoque Atual:</span>
                <span className="font-medium">{selectedProduct.stock}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text/60">Estoque Mínimo:</span>
                <span className="font-medium">{selectedProduct.minStock}</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="font-medium">Movimentações Recentes</h3>
              <div className="space-y-2">
                {stockMovements.map((movement) => (
                  <div
                    key={movement.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      {movement.type === 'in' ? (
                        <ArrowUp className="text-green-600" size={16} />
                      ) : (
                        <ArrowDown className="text-red-600" size={16} />
                      )}
                      <span className="text-sm">
                        {movement.type === 'in' ? 'Entrada' : 'Saída'} de{' '}
                        {movement.quantity} unidades
                      </span>
                    </div>
                    <span className="text-sm text-text/60">
                      {new Date(movement.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowStockModal(false)
                  setSelectedProduct(null)
                }}
                className="px-4 py-2 text-text/60 hover:text-text transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {showImportModal && (
        <ImportModal
          onClose={() => setShowImportModal(false)}
          onImport={handleImport}
        />
      )}

      {showBarcodeModal && selectedProduct && (
        <BarcodeModal
          product={selectedProduct}
          onClose={() => {
            setShowBarcodeModal(false)
            setSelectedProduct(null)
          }}
        />
      )}

      {showTransferModal && (
        <TransferModal
          products={products.filter(p => selectedProducts.includes(p.id))}
          onClose={() => setShowTransferModal(false)}
          onTransfer={handleTransfer}
        />
      )}
    </div>
  )
} 