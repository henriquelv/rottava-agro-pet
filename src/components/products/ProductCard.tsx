'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'phosphor-react'
import { formatCurrency } from '@/utils/format'
import { getProductImageUrl } from '@/config/images'

interface ProductCardProps {
  product: {
    id: string
    slug: string
    name: string
    price: number
    images: string[]
    category: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images[0] || '/images/placeholder.jpg'

  return (
    <Link href={`/produtos/${product.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative aspect-square">
          <Image
            src={getProductImageUrl(mainImage)}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = '/images/placeholder.jpg'
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xl font-bold text-primary">
              {formatCurrency(product.price)}
            </span>
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-primary transition-colors"
            >
              <Heart size={24} weight="regular" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
} 