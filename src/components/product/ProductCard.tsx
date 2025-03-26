'use client'

import Image from 'next/image'
import Link from 'next/link'
import { formatCurrency } from '@/utils/format'
import { ShoppingCart, Heart } from 'phosphor-react'
import { useCart } from '@/hooks/CartContext'

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
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const mainImage = product.images.find((img: ProductImage) => img.isMain) || product.images[0]
  const lowestPrice = Math.min(...product.variants.map((v: ProductVariant) => v.price))

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    const cartItem = {
      id: product.id,
      nome: product.name,
      preco: lowestPrice,
      imagem: mainImage.url,
      variante: product.variants[0].name,
      quantidade: 1,
      tipo: 'produto' as const
    }
    addToCart(cartItem)
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    // Implementar lógica da lista de desejos
  }

  return (
    <Link
      href={`/produtos/${product.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
    >
      <div className="relative aspect-square">
        <Image
          src={mainImage.url}
          alt={mainImage.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Botões de ação */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleAddToWishlist}
            className="p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
          >
            <Heart size={20} weight="bold" />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
          >
            <ShoppingCart size={20} weight="bold" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          {product.rating && (
            <div className="flex items-center gap-1 mb-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < (product.rating ? Math.floor(product.rating) : 0) ? 'text-yellow-400' : 'text-gray-300'}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-text/60">
                ({product.reviewCount})
              </span>
            </div>
          )}
          <h3 className="font-semibold text-text group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </div>
        
        <p className="text-sm text-text/60 line-clamp-2 mb-3 min-h-[2.5rem]">
          {product.description}
        </p>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-text/40">A partir de</p>
            <p className="text-lg font-bold text-primary">
              {formatCurrency(lowestPrice)}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="inline-flex items-center justify-center px-4 py-2 bg-primary/10 text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-all group-hover:shadow-lg"
          >
            <ShoppingCart size={18} className="mr-2" weight="bold" />
            Comprar
          </button>
        </div>
      </div>
    </Link>
  )
} 