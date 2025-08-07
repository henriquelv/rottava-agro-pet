import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Item {
  id: string
  nome: string
  preco: number
  preco_promocional?: number
  quantidade: number
  imagem: string
  /** quantidade máxima disponível em estoque */
  stock?: number
}

interface Purchase {
  items: Item[]
  date: string
}

interface CartState {
  items: Item[]
  history: Purchase[]
  addItem: (item: Omit<Item, 'quantidade'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantidade: number) => void
  clearCart: () => void
  savePurchase: () => void
  getTotal: () => number
  getItemCount: () => number
  getHistory: () => Purchase[]
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      history: [],
      addItem: (item) => {
        const items = get().items
        const existingItem = items.find((i) => i.id === item.id)

        if (existingItem) {
          const newQty = existingItem.quantidade + 1
          if (item.stock && newQty > item.stock) return
          set({
            items: items.map((i) =>
              i.id === item.id ? { ...i, quantidade: newQty } : i
            )
          })
        } else {
          if (item.stock && item.stock < 1) return
          set({ items: [...items, { ...item, quantidade: 1 }] })
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },
      updateQuantity: (id, quantidade) => {
        if (quantidade <= 0) {
          get().removeItem(id)
          return
        }

        set({
          items: get().items.map((item) => {
            if (item.id !== id) return item
            if (item.stock && quantidade > item.stock) {
              return { ...item, quantidade: item.stock }
            }
            return { ...item, quantidade }
          })
        })
      },
      savePurchase: () => {
        const current = get().items
        if (current.length === 0) return
        const newPurchase: Purchase = {
          items: current,
          date: new Date().toISOString()
        }
        set({ history: [...get().history, newPurchase] })
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
      },
      getHistory: () => get().history
    }),
    {
      name: 'cart-storage'
    }
  )
)