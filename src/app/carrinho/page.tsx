'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/hooks/CartContext'
import { formatCurrency } from '@/utils/format'
import { Plus, Minus, ShoppingBag } from 'phosphor-react'
import Header from '@/components/layout/Header'
import type { CartItem } from '@/hooks/CartContext'

export default function Carrinho() {
  const { items, updateQuantity, removeFromCart, total } = useCart()

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
                    {item.tipo === 'produto' && (
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={item.imagem}
                          alt={item.nome}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    )}

                    {/* Detalhes do Item */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-text">{item.nome}</h3>
                          {item.tipo === 'produto' && (
                            <p className="text-sm text-text/60">{item.variante}</p>
                          )}
                          {item.tipo === 'agendamento' && (
                            <div className="text-sm text-text/60">
                              <p>Data: {new Date(item.data).toLocaleDateString('pt-BR')}</p>
                              <p>Horário: {item.horario}</p>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(item.preco)}</p>
                          {item.tipo === 'produto' && (
                            <p className="text-sm text-text/60">
                              Subtotal: {formatCurrency(item.preco * item.quantidade)}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Controles de Quantidade (apenas para produtos) */}
                      {item.tipo === 'produto' && (
                        <div className="flex items-center gap-3 mt-4">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center">{item.quantidade}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      )}

                      {/* Botão Remover */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-red-600 hover:text-red-700 mt-4"
                      >
                        Remover
                      </button>
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