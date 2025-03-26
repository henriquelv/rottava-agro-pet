export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface CartState {
  items: CartItem[]
}

export interface CartActions {
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

export interface CartStore extends CartState, CartActions {
  total: number
} 