'use client'

import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { CartContext } from '@/hooks/CartContext'
import { formatCurrency } from '@/utils/format'

export default function Checkout() {
  const router = useRouter()
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  const { items, clearCart } = context
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (items.length === 0) {
      router.push('/produtos')
    }

    const calculateTotal = () => {
      return items.reduce((acc, item) => {
        if (item.tipo === 'produto') {
          return acc + item.preco * item.quantidade;
        }
        return acc;
      }, 0);
    }

    setTotal(calculateTotal())
  }, [items, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a integração com o gateway de pagamento
    alert('Compra finalizada com sucesso!')
    clearCart()
    router.push('/produtos')
  }

  return (
    <div className="pt-24 container">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-text mb-8">Finalizar Compra</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulário de Pagamento */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Dados Pessoais</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-text mb-1">
                    Endereço Completo
                  </label>
                  <textarea
                    id="address"
                    required
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Finalizar Compra
                </button>
              </form>
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-medium">{item.nome}</p>
                      {item.tipo === 'produto' && <p className="text-sm text-gray-500">{item.variante}</p>}
                    </div>
                    <div>
                      <p className="text-lg font-medium">{formatCurrency(item.preco)}</p>
                      {item.tipo === 'produto' && <p className="text-sm text-gray-500">Quantidade: {item.quantidade}</p>}
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 