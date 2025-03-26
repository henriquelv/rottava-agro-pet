import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { WavyBackground } from '@/components/layout/WavyBackground'
import { Providers } from './providers'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { Newsletter } from '@/components/marketing/Newsletter'
import { Footer } from '@/components/layout/Footer'
import Script from 'next/script'
import { ToastProvider } from '@/hooks/ToastContext'
import Toast from '@/components/ui/Toast'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rottava Agro Pet',
  description: 'Loja de produtos para animais de estimação e agropecuária',
  metadataBase: new URL('https://rottavaagropet.com.br'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://rottavaagropet.com.br',
    title: 'Rottava Agropet',
    description: 'Sua loja completa em produtos para pets e agropecuária',
    siteName: 'Rottava Agropet',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ToastProvider>
          <Providers>
            <WavyBackground>
              {children}
              <div className="mt-12">
                <Newsletter />
              </div>
            </WavyBackground>
            <WhatsAppButton />
            <Footer />
          </Providers>
          <Toast />
        </ToastProvider>
      </body>
    </html>
  )
} 