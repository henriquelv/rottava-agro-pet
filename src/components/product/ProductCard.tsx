'use client'

import Image from 'next/image'
import Link from 'next/link'
import { formatCurrency } from '@/utils/format'

interface ProductImage {
  url: string
  alt: string
  isMain: boolean
}

interface ProductVariant {
  name: string
  price: number
  stockQuantity: number
}

interface Product {
  id: string
  slug: string
  name: string
  description: string
  images: ProductImage[]
  variants: ProductVariant[]
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images.find((img: ProductImage) => img.isMain) || product.images[0]
  const lowestPrice = Math.min(...product.variants.map((v: ProductVariant) => v.price))

  return (
    <Link
      href={`/produtos/${product.slug}`}
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-square">
        <Image
          src={mainImage.url}
          alt={mainImage.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-text/60 line-clamp-2">
          {product.description}
        </p>
        <p className="mt-2 text-lg font-bold text-primary">
          A partir de {formatCurrency(lowestPrice)}
        </p>
      </div>
    </Link>
  )
} 