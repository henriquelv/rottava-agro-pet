import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Item {
  id: string
  nome: string
  preco: number
  preco_promocional?: number
  quantidade: number
  imagem: string
}

interface CartState {
  items: Item[]
  addItem: (item: Omit<Item, 'quantidade'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantidade: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items
        const existingItem = items.find((i) => i.id === item.id)

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === item.id
                ? { ...i, quantidade: i.quantidade + 1 }
                : i
            )
          })
        } else {
          set({ items: [...items, { ...item, quantidade: 1 }] })
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },
      updateQuantity: (id, quantidade) => {
        if (quantidade < 1) {
          get().removeItem(id)
          return
        }

        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantidade } : item
          )
        })
      },
      clearCart: () => {
        set({ items: [] })
      },
      getTotal: () => {
        return get().items.reduce((total, item) => {
          const preco = item.preco_promocional || item.preco
          return total + preco * item.quantidade
        }, 0)
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantidade, 0)
      }
    }),
    {
      name: 'cart-storage'
    }
  )
) 