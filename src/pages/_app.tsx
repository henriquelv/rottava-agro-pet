'use client'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '../i18n/config'
import { Monitoring } from '@/lib/monitoring'
import React from 'react'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Monitoring>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Monitoring>
    </QueryClientProvider>
  )
} 