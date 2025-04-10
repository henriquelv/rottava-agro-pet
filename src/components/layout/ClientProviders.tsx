'use client'

import { ReactNode } from 'react'
import { ToastProvider } from '@/hooks/ToastContext'
import { SessionProvider } from 'next-auth/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/hooks/ThemeContext'
import { CartProvider } from '@/hooks/CartContext'
import { AuthProvider } from '@/hooks/AuthContext'

// Incluí todos os providers que estavam em src/app/providers.tsx
// e os que estavam diretamente em layout.tsx que precisam ser client-side

const queryClient = new QueryClient()

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ThemeProvider>
           <CartProvider>
             <AuthProvider>
               <I18nextProvider i18n={i18n}>
                  <ToastProvider>
                    {children}
                  </ToastProvider>
                </I18nextProvider>
              </AuthProvider>
            </CartProvider>
         </ThemeProvider>
       </SessionProvider>
    </QueryClientProvider>
  )
} 