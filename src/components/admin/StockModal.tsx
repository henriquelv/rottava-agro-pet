import React, { useState } from 'react'
import {
  ArrowUp,
  ArrowDown,
  X,
  Package,
  Archive,
  Truck,
  Warning
} from 'phosphor-react'
import { Product, StockMovement } from '@/types/product'
import { formatCurrency } from '@/utils/format'

interface StockModalProps {
  product: Product
  movements: StockMovement[]
  onClose: () => void
  onAddStock: (productId: string, quantity: number, reason: string) => void
  onRemoveStock: (productId: string, quantity: number, reason: string) => void
}

export function StockModal({
  product,
  movements,
  onClose,
  onAddStock,
  onRemoveStock
}: StockModalProps) {
  const [quantity, setQuantity] = useState('')
  const [reason, setReason] = useState('')
  const [type, setType] = useState<'in' | 'out'>('in')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const qty = parseInt(quantity)
    if (isNaN(qty) || qty <= 0) return

    if (type === 'in') {
      onAddStock(product.id, qty, reason)
    } else {
      onRemoveStock(product.id, qty, reason)
    }

    setQuantity('')
    setReason('')
  }

  const getStockStatus = () => {
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Package className="text-primary" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Gerenciar Estoque
              </h2>
              <p className="text-sm text-gray-600">{product.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Informações do Estoque */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Estoque Atual</p>
            <p className="text-2xl font-semibold text-gray-900">
              {product.stock}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Estoque Mínimo</p>
            <p className="text-2xl font-semibold text-gray-900">
              {product.minStock}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Status</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              getStockStatusColor(getStockStatus())
            }`}>
              {getStockStatus() === 'out_of_stock' ? 'Sem Estoque' :
               getStockStatus() === 'low_stock' ? 'Estoque Baixo' :
               getStockStatus() === 'overstock' ? 'Estoque Alto' :
               'OK'}
            </span>
          </div>
        </div>

        {/* Formulário de Movimentação */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setType('in')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border ${
                  type === 'in'
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <ArrowUp size={20} />
                <span>Entrada</span>
              </button>
              <button
                type="button"
                onClick={() => setType('out')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border ${
                  type === 'out'
                    ? 'bg-red-50 border-red-200 text-red-700'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <ArrowDown size={20} />
                <span>Saída</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantidade
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Motivo
                </label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Ex: Compra, Venda, Ajuste..."
                  className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              <Archive size={20} />
              <span>Registrar Movimentação</span>
            </button>
          </div>
        </form>

        {/* Histórico de Movimentações */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">
            Histórico de Movimentações
          </h3>
          <div className="space-y-3">
            {movements.map((movement) => (
              <div
                key={movement.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    movement.type === 'in'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {movement.type === 'in' ? (
                      <ArrowUp size={16} />
                    ) : (
                      <ArrowDown size={16} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {movement.type === 'in' ? 'Entrada' : 'Saída'} de{' '}
                      {movement.quantity} unidades
                    </p>
                    <p className="text-xs text-gray-500">
                      {movement.reason} • {new Date(movement.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {movement.cost && (
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(movement.cost)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 