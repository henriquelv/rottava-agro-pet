import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { WavyBackground } from '@/components/layout/WavyBackground'
import { Providers } from './providers'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { ChatButton } from '@/components/ui/ChatButton'
import { Newsletter } from '@/components/marketing/Newsletter'
import { Footer } from '@/components/layout/Footer'
import Script from 'next/script'
import { ToastProvider } from '@/hooks/ToastContext'
import Toast from '@/components/ui/Toast'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'sonner'
import AccessibilityBar from '@/components/ui/AccessibilityBar'
import LanguageSelector from '@/components/ui/LanguageSelector'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n/config'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Rottava Agro Pet - Pet Shop e Agropecuária',
    template: '%s | Rottava Agro Pet'
  },
  description: 'Encontre tudo para seu pet e sua fazenda. Ração, medicamentos, acessórios e muito mais.',
  keywords: ['pet shop', 'agropecuária', 'ração', 'medicamentos', 'acessórios', 'pets', 'animais'],
  authors: [{ name: 'Rottava Agro Pet' }],
  creator: 'Rottava Agro Pet',
  publisher: 'Rottava Agro Pet',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rottavaagropet.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://rottavaagropet.com.br',
    title: 'Rottava Agro Pet - Pet Shop e Agropecuária',
    description: 'Encontre tudo para seu pet e sua fazenda. Ração, medicamentos, acessórios e muito mais.',
    siteName: 'Rottava Agro Pet',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rottava Agro Pet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rottava Agro Pet - Pet Shop e Agropecuária',
    description: 'Encontre tudo para seu pet e sua fazenda. Ração, medicamentos, acessórios e muito mais.',
    images: ['/twitter-image.jpg'],
    creator: '@rottavaagropet',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#15803d" />
      </head>
      <body className={inter.className}>
        <I18nextProvider i18n={i18n}>
          <AccessibilityBar />
          <div className="flex justify-end p-4">
            <LanguageSelector />
          </div>
          <ToastProvider>
            <Providers>
              <WavyBackground>
                {children}
                <div className="mt-12">
                  <Newsletter />
                </div>
              </WavyBackground>
              <WhatsAppButton />
              <ChatButton />
              <Footer />
            </Providers>
            <Toast />
          </ToastProvider>
          <Toaster position="top-right" />
          <Analytics />
          <SpeedInsights />
          <GoogleAnalytics />
        </I18nextProvider>
      </body>
    </html>
  )
} 