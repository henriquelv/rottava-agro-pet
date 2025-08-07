import { create } from 'zustand'

interface Item {
  id: string
  nome: string
  preco: number
  precoPromocional?: number
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
  total: number
  addItem: (item: Omit<Item, 'quantidade'> & { quantidade?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantidade: number) => void
  clearCart: () => void
  savePurchase: () => void
  getTotal: () => number
  getItemCount: () => number
  getHistory: () => Purchase[]
}

export const useCart = create<CartState>((set, get) => {
  const initialItems = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || '[]') : []
  return {
    items: initialItems,
    history: [],
    total: initialItems.reduce(calcTotal, 0),
      addItem: (item) => {
        const items = get().items
        const existingItem = items.find((i) => i.id === item.id)
        const qty = item.quantidade || 1

        if (existingItem) {
          const newQty = existingItem.quantidade + qty
          if (item.stock && newQty > item.stock) return
          set({
            items: items.map((i) =>
              i.id === item.id ? { ...i, quantidade: newQty } : i
            ),
          })
        } else {
          if (item.stock && item.stock < qty) return
          set({ items: [...items, { ...item, quantidade: qty }] })
        }
        const newTotal = get().items.reduce(calcTotal, 0)
        set({ total: newTotal })
        localStorage.setItem('cart', JSON.stringify(get().items))
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
        const newTotal = get().items.reduce(calcTotal, 0)
        set({ total: newTotal })
        localStorage.setItem('cart', JSON.stringify(get().items))
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
          }),
        })
        const newTotal = get().items.reduce(calcTotal, 0)
        set({ total: newTotal })
        localStorage.setItem('cart', JSON.stringify(get().items))
      },
      savePurchase: () => {
        const current = get().items
        if (current.length === 0) return
        const newPurchase: Purchase = {
          items: current,
          date: new Date().toISOString(),
        }
        set({ history: [...get().history, newPurchase] })
      },
      clearCart: () => {
        set({ items: [], total: 0 })
        localStorage.setItem('cart', JSON.stringify([]))
      },
      getTotal: () => get().total,
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantidade, 0)
      },
      getHistory: () => get().history,
  }
})

function calcTotal(total: number, item: Item) {
  const preco = item.precoPromocional || item.preco
  return total + preco * item.quantidade
}