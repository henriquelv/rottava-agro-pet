export interface CartItem {
  variantId: string
  productId: string
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
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

export interface CartStore extends CartState, CartActions {} 