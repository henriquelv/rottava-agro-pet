import Head from 'next/head'
import { storeConfig } from '@/config/store'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  shouldExcludeTitleSuffix?: boolean
  shouldIndexPage?: boolean
}

export function SEO({
  title,
  description,
  image,
  shouldExcludeTitleSuffix = false,
  shouldIndexPage = true
}: SEOProps) {
  const pageTitle = `${title ? title : storeConfig.name}${
    !shouldExcludeTitleSuffix ? ` | ${storeConfig.name}` : ''
  }`

  const pageImage = image
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/${image}`
    : `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`

  const pageDescription = description || storeConfig.description

  return (
    <Head>
      <title>{pageTitle}</title>

      {/* Search Engine */}
      <meta name="description" content={pageDescription} />
      <meta name="image" content={pageImage} />
      {!shouldIndexPage && <meta name="robots" content="noindex,nofollow" />}

      {/* Schema.org for Google */}
      <meta itemProp="name" content={pageTitle} />
      <meta itemProp="description" content={pageDescription} />
      <meta itemProp="image" content={pageImage} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:site_name" content={storeConfig.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />

      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'PetStore',
            name: storeConfig.name,
            image: pageImage,
            '@id': process.env.NEXT_PUBLIC_SITE_URL,
            url: process.env.NEXT_PUBLIC_SITE_URL,
            telephone: storeConfig.contact.phone,
            address: {
              '@type': 'PostalAddress',
              streetAddress: `${storeConfig.address.street}, ${storeConfig.address.number}`,
              addressLocality: storeConfig.address.city,
              addressRegion: storeConfig.address.state,
              postalCode: storeConfig.address.zipCode,
              addressCountry: 'BR'
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: -26.7756,
              longitude: -51.0153
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '19:00'
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Saturday',
                opens: '08:00',
                closes: '13:00'
              }
            ],
            sameAs: [
              storeConfig.social.facebook,
              storeConfig.social.instagram
            ]
          })
        }}
      />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  )
} 