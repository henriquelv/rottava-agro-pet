import React, { useState } from 'react'
import { QrCode, X, Printer, Download, Copy } from 'phosphor-react'
import { Product } from '@/types/product'

interface BarcodeModalProps {
  product: Product
  onClose: () => void
}

export function BarcodeModal({ product, onClose }: BarcodeModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [showCopied, setShowCopied] = useState(false)

  const handleCopy = () => {
    if (product.barcode) {
      navigator.clipboard.writeText(product.barcode)
      setShowCopied(true)
      setTimeout(() => setShowCopied(false), 2000)
    }
  }

  const handlePrint = () => {
    // Implementar lógica de impressão
    window.print()
  }

  const handleDownload = () => {
    // Implementar lógica de download
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <QrCode className="text-primary" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Código de Barras
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

        {/* Código de Barras */}
        <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-xl mb-6">
          {/* Aqui vai o componente de código de barras */}
          <div className="w-64 h-32 bg-white flex items-center justify-center border">
            {product.barcode || 'Código não disponível'}
          </div>

          {product.barcode && (
            <div className="relative">
              <p className="text-lg font-mono text-gray-900">{product.barcode}</p>
              <button
                onClick={handleCopy}
                className="absolute -right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Copy size={16} />
              </button>
              {showCopied && (
                <div className="absolute -right-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                  Copiado!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Opções de Impressão */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantidade de Etiquetas
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              <Printer size={20} />
              <span>Imprimir</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-50"
            >
              <Download size={20} />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Informações do Produto
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">SKU</p>
              <p className="font-medium text-gray-900">{product.sku || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500">Preço</p>
              <p className="font-medium text-gray-900">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(product.price)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 