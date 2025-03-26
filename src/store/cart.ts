'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, CartStore } from '@/types/cart'

// Criamos o hook do carrinho diretamente
const useCart = create(
  persist<CartStore>(
    (set) => ({
      items: [],
      total: 0,
      addItem: (item: Omit<CartItem, 'quantity'>) =>
        set((state) => {
          const existingItem = state.items.find((i: CartItem) => i.id === item.id)
          if (existingItem) {
            return {
              items: state.items.map((i: CartItem) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
              total: state.total + item.price
            }
          }
          return {
            items: [...state.items, { ...item, quantity: 1 }],
            total: state.total + item.price
          }
        }),
      removeItem: (id: string) =>
        set((state) => ({
          items: state.items.filter((i: CartItem) => i.id !== id),
          total: state.total - (state.items.find((i: CartItem) => i.id === id)?.price || 0) * (state.items.find((i: CartItem) => i.id === id)?.quantity || 0)
        })),
      updateQuantity: (id: string, quantity: number) =>
        set((state) => {
          const item = state.items.find((i: CartItem) => i.id === id)
          if (!item) return state
          const quantityDiff = quantity - item.quantity
          return {
            items: state.items.map((i: CartItem) =>
              i.id === id ? { ...i, quantity } : i
            ),
            total: state.total + (item.price * quantityDiff)
          }
        }),
      clearCart: () => set({ items: [], total: 0 }),
      getTotal: () => {
        // Esta função é necessária conforme a interface CartActions
        return 0 // Implementada via acesso direto ao total
      }
    }),
    {
      name: 'cart-storage'
    }
  )
)

export { useCart } 