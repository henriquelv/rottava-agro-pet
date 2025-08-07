'use client'
import { ReactNode } from 'react'
export function CartProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}
export { useCart } from './useCart'
