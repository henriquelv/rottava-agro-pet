import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/providers/AuthProvider'
import { Toaster } from 'sonner'
import { CartProvider } from '../hooks/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rottava Agro Pet',
  description: 'Pet Shop e Agropecuária em Caçador - SC',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      <html lang="pt-BR">
        <body className={inter.className}>
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster richColors position="top-right" />
        </body>
      </html>
    </CartProvider>
  )
} 