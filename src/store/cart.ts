'use client'

import create from 'zustand/vanilla'
import { persist } from 'zustand/middleware'
import { CartItem, CartStore } from '@/types/cart'

const store = (set: any, get: any): CartStore => ({
  items: [],
  
  addItem: (item: Omit<CartItem, 'quantity'>) => set((state: CartStore) => {
    const existingItem = state.items.find((i: CartItem) => i.variantId === item.variantId)
    
    if (existingItem) {
      return {
        items: state.items.map((i: CartItem) =>
          i.variantId === item.variantId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      }
    }
    
    return {
      items: [...state.items, { ...item, quantity: 1 }],
    }
  }),
  
  removeItem: (variantId: string) =>
    set((state: CartStore) => ({
      items: state.items.filter((i: CartItem) => i.variantId !== variantId),
    })),
  
  updateQuantity: (variantId: string, quantity: number) =>
    set((state: CartStore) => ({
      items: state.items.map((i: CartItem) =>
        i.variantId === variantId ? { ...i, quantity } : i
      ),
    })),
  
  clearCart: () => set({ items: [] }),
  
  getTotal: () => {
    const { items } = get()
    return items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
  },
})

export const useCartStore = create(
  persist(store, {
    name: 'cart-storage',
  })
) 