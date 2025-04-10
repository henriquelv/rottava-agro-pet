'use client'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '../i18n/config'
import { Monitoring } from '@/lib/monitoring'
import React from 'react'
import Head from 'next/head'
import { CartProvider } from '../context/CartContext'
import { Toaster } from 'react-hot-toast'
import FloatingCartIcon from '../components/FloatingCartIcon'
import { SessionProvider } from 'next-auth/react'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Rottava Agro Pet - Sua Loja de Produtos Agropecuários</title>
        <meta name="description" content="Encontre tudo para seu pet e sua fazenda na Rottava Agro Pet. Produtos de qualidade e atendimento especializado." />
      </Head>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <Monitoring>
              <Component {...pageProps} />
              <FloatingCartIcon />
              <ReactQueryDevtools initialIsOpen={false} />
            </Monitoring>
            <Toaster position="top-right" />
          </CartProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  )
} 