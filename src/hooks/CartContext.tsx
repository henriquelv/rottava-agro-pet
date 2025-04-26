'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

const CartContext = createContext(null)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState([])
  return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext) 