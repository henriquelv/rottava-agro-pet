'use client'

import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/utils/format'
import { ShoppingCart, Heart } from 'phosphor-react'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'

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
  rating?: number
  reviewCount?: number
}

interface ProductCardProps {
  product: {
    id: string
    nome: string
    slug: string
    preco: number
    precoPromocional?: number
    images?: {
      id: string
      url: string
    }[]
    category?: {
      slug: string
    }
    /** quantidade total em estoque */
    estoque?: number
    variants?: ProductVariant[]
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { isAuthenticated } = useAuth()
  const mainImage = product?.images?.[0]?.url || '/images/placeholder.jpg'
  const stock =
    (product as any).estoque ??
    product?.variants?.reduce(
      (sum: number, v: ProductVariant) => sum + v.stockQuantity,
      0
    ) ?? 0

  if (stock <= 0) {
    return null
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    const cartItem = {
      id: product.id,
      nome: product.nome,
      preco: product.preco,
      preco_promocional: product.precoPromocional,
      imagem: mainImage,
      stock
    }
    addItem(cartItem)
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isAuthenticated) {
      window.location.href = '/login'
      return
    }
    // Implementar lógica da lista de desejos
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/produtos/produto/${product.slug}`}>
        <div className="relative aspect-square">
          <Image
            src={mainImage}
            alt={product.nome}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/produtos/produto/${product.slug}`}>
          <h3 className="font-medium text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.nome}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2">Estoque: {stock}</p>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(product.preco)}
          </span>
          {product.precoPromocional && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.precoPromocional)}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={stock <= 0}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${stock <= 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark'}`}
          >
            <ShoppingCart size={20} />
            {stock <= 0 ? 'Esgotado' : 'Adicionar'}
          </button>
          <button
            onClick={handleAddToWishlist}
            className="p-2 text-gray-500 hover:text-primary transition-colors"
            title="Adicionar aos favoritos"
          >
            <Heart size={24} weight="regular" />
          </button>
        </div>
      </div>
    </div>
  )
}