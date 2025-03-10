'use client'

import { useEffect, useState, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CartContext } from '@/hooks/CartContext'
import { formatCurrency } from '@/utils/format'
import { Plus, Minus, ShoppingBag } from 'phosphor-react'
import Header from '@/components/layout/Header'
import { toast } from 'sonner'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  variant: string
  quantity: number
  tipo: string
  preco: number
  quantidade: number
}

export default function Carrinho() {
  const router = useRouter()
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  const { items, updateQuantity, removeFromCart } = context
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const calculateTotal = () => {
      return items.reduce((acc: number, item: CartItem) => {
        if (item.tipo === 'produto') {
          return acc + item.preco * item.quantidade;
        }
        return acc;
      }, 0);
    }

    setTotal(calculateTotal())
  }, [items])

  const handleQuantityChange = (itemId: string, variant: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId)
      return
    }
    updateQuantity(itemId, newQuantity)
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="pt-24 container">
          <div className="max-w-2xl mx-auto text-center py-12">
            <ShoppingBag size={64} className="mx-auto text-text/20 mb-4" />
            <h2 className="text-2xl font-bold text-text mb-2">Seu carrinho está vazio</h2>
            <p className="text-text/60 mb-6">
              Adicione produtos ao seu carrinho para continuar comprando
            </p>
            <Link
              href="/produtos"
              className="inline-block bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Ver Produtos
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="pt-24 container">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-text">Carrinho</h1>
            <Link
              href="/produtos"
              className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="divide-y">
              {items.map((item: CartItem) => (
                <div key={item.id} className="p-6">
                  <div className="flex gap-6">
                    {/* Imagem do Produto */}
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>

                    {/* Detalhes do Produto */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-text">{item.name}</h3>
                          {item.tipo === 'produto' && <p className="text-sm text-text/60">{item.variant}</p>}
                        </div>
                        <div>
                          <p className="font-medium">
                            {formatCurrency(item.price)}
                          </p>
                          {item.tipo === 'produto' && <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>}
                        </div>
                      </div>

                      {/* Controles de Quantidade */}
                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.variant, item.quantity - 1)
                          }
                          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.variant, item.quantity + 1)
                          }
                          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Rodapé do Carrinho */}
            <div className="p-6 bg-gray-50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium">Total</span>
                <span className="text-2xl font-bold text-primary">
                  {formatCurrency(total)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-primary text-white text-center py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Finalizar Compra
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 