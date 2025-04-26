'use client'

import Head from 'next/head'
import { storeConfig } from '@/config/store'

interface SEOProps {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  product?: {
    name: string
    description: string
    image: string
    price: number
    priceCurrency: string
    availability: 'InStock' | 'OutOfStock'
    brand?: string
    sku?: string
  }
}

export function SEO({
  title,
  description,
  image = '/og-image.jpg',
  url = 'https://rottavaagropet.com.br',
  type = 'website',
  product,
}: SEOProps) {
  const fullTitle = `${title} | Rottava Agro Pet`
  const fullUrl = `${url}${typeof window !== 'undefined' ? window.location.pathname : ''}`

  return (
    <Head>
      {/* Meta tags básicas */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Schema.org para produtos */}
      {product && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: product.name,
              description: product.description,
              image: product.image,
              brand: product.brand
                ? {
                    '@type': 'Brand',
                    name: product.brand,
                  }
                : undefined,
              sku: product.sku,
              offers: {
                '@type': 'Offer',
                price: product.price,
                priceCurrency: product.priceCurrency,
                availability: `https://schema.org/${product.availability}`,
              },
            }),
          }}
        />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  )
} 