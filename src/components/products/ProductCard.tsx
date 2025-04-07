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
  const imageUrl = getProductImageUrl(product.images[0])

  return (
    <div className="group relative bg-white rounded-lg shadow-sm overflow-hidden">
      <Link href={`/produtos/${product.slug}`} className="block aspect-square relative">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
        />
      </Link>
      
      <button 
        className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-primary transition-colors"
        aria-label="Adicionar aos favoritos"
      >
        <Heart size={20} />
      </button>

      <div className="p-4">
        <Link href={`/produtos/${product.slug}`} className="block">
          <h3 className="text-sm font-medium text-text line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-text/60">{product.category}</p>
          <p className="mt-2 text-lg font-bold text-text">{formatCurrency(product.price)}</p>
        </Link>

        <button className="mt-3 w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  )
} 