import React, { useState } from 'react'
import { Truck, X, ArrowRight } from 'phosphor-react'
import { Product } from '@/types/product'

interface TransferModalProps {
  products: Product[]
  onClose: () => void
  onTransfer: (data: {
    products: { id: string; quantity: number }[]
    fromLocation: string
    toLocation: string
    reason: string
  }) => Promise<void>
}

export function TransferModal({
  products,
  onClose,
  onTransfer
}: TransferModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fromLocation, setFromLocation] = useState('')
  const [toLocation, setToLocation] = useState('')
  const [reason, setReason] = useState('')
  const [quantities, setQuantities] = useState<Record<string, number>>(
    products.reduce((acc, product) => ({
      ...acc,
      [product.id]: 1
    }), {})
  )

  // Lista de locais (mock)
  const locations = [
    { id: 'warehouse', name: 'Depósito Principal' },
    { id: 'store', name: 'Loja Física' },
    { id: 'supplier', name: 'Fornecedor' }
  ]

  const handleQuantityChange = (productId: string, value: string) => {
    const quantity = parseInt(value) || 0
    setQuantities({ ...quantities, [productId]: quantity })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!fromLocation || !toLocation) {
      setError('Selecione os locais de origem e destino')
      return
    }

    if (fromLocation === toLocation) {
      setError('Os locais de origem e destino devem ser diferentes')
      return
    }

    const transferProducts = products
      .filter(p => quantities[p.id] > 0)
      .map(p => ({
        id: p.id,
        quantity: quantities[p.id]
      }))

    if (transferProducts.length === 0) {
      setError('Adicione pelo menos um produto para transferir')
      return
    }

    try {
      setLoading(true)
      await onTransfer({
        products: transferProducts,
        fromLocation,
        toLocation,
        reason
      })
      onClose()
    } catch (err) {
      setError('Erro ao realizar transferência')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Truck className="text-primary" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Transferir Produtos
              </h2>
              <p className="text-sm text-gray-600">
                {products.length} produto(s) selecionado(s)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Locais */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Origem
              </label>
              <select
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                required
              >
                <option value="">Selecione...</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-center">
              <ArrowRight size={24} className="text-gray-400" />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destino
              </label>
              <select
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                required
              >
                <option value="">Selecione...</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Produtos */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Produtos a Transferir
            </h3>
            <div className="space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      Estoque: {product.stock}
                    </p>
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantities[product.id]}
                      onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Motivo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Motivo da Transferência
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ex: Reposição de estoque, Devolução..."
              className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          {/* Erro */}
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Ações */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Truck size={20} />
              <span>{loading ? 'Transferindo...' : 'Transferir'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 