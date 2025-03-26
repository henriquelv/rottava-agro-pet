'use client'

import { ReactNode } from 'react'
import { AuthProvider } from '@/hooks/AuthContext'
import { CartProvider } from '@/hooks/CartContext'
import { ThemeProvider } from '@/hooks/ThemeContext'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'

interface ProvidersProps {
  children: ReactNode
}

const queryClient = new QueryClient()

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ThemeProvider>
          <CartProvider>
            <AuthProvider>{children}</AuthProvider>
          </CartProvider>
        </ThemeProvider>
        <Toaster position="top-right" />
      </SessionProvider>
    </QueryClientProvider>
  )
} 