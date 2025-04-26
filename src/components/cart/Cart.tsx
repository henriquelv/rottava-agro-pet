'use client'

import { useCart } from '@/hooks/CartContext'
import { formatPrice } from '@/utils/format'
import { Minus, Plus, Trash } from 'phosphor-react'

export function Cart() {
  const { items, removeFromCart, updateQuantity, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h2>
        <p className="text-gray-600">
          Adicione produtos ao seu carrinho para começar a comprar
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl font-bold">Seu Carrinho</h2>
      
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow"
          >
            <img
              src={item.imagem}
              alt={item.nome}
              className="w-20 h-20 object-cover rounded"
            />
            
            <div className="flex-1">
              <h3 className="font-semibold">{item.nome}</h3>
              <p className="text-gray-600">
                {formatPrice(item.precoPromocional || item.preco)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Minus size={20} />
              </button>
              
              <span className="w-8 text-center">{item.quantidade}</span>
              
              <button
                onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Plus size={20} />
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full"
            >
              <Trash size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow mt-4">
        <span className="text-lg font-semibold">Total:</span>
        <span className="text-xl font-bold">{formatPrice(total)}</span>
      </div>

      <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
        Finalizar Compra
      </button>
    </div>
  )
} 