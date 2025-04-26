'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { formatPrice } from '@/utils/format'
import { ShoppingCart, Heart } from 'phosphor-react'
import { useState } from 'react'
import { OptimizedImage } from './ui/OptimizedImage'

interface ProductCardProps {
  id: string
  nome: string
  preco: number
  precoPromocional?: number
  imagem: string
  slug: string
  categoria: string
}

export function ProductCard({
  id,
  nome,
  preco,
  precoPromocional,
  imagem,
  slug,
  categoria,
}: ProductCardProps) {
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const [isHovered, setIsHovered] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      await addToCart({
        id,
        nome,
        preco,
        precoPromocional,
        imagem,
        quantidade: 1,
      })
      showToast(`${nome} adicionado ao carrinho!`, 'success')
    } catch (error) {
      showToast('Erro ao adicionar ao carrinho', 'error')
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite)
    showToast(
      `${nome} ${isFavorite ? 'removido dos' : 'adicionado aos'} favoritos`,
      isFavorite ? 'info' : 'success'
    )
  }

  return (
    <article
      className="group relative flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-label={`Produto: ${nome}`}
    >
      <Link
        href={`/produtos/${categoria}/${slug}`}
        className="block relative aspect-square overflow-hidden"
        aria-label={`Ver detalhes do produto ${nome}`}
      >
        <OptimizedImage
          src={imagem}
          alt={nome}
          fill
          className={`transition-transform duration-300 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={false}
          quality={75}
        />
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link
          href={`/produtos/${categoria}/${slug}`}
          className="block mb-2"
          aria-label={`Ver detalhes do produto ${nome}`}
        >
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 hover:text-primary transition-colors">
            {nome}
          </h3>
        </Link>

        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-4">
            {precoPromocional ? (
              <>
                <span className="text-lg font-bold text-primary">
                  {formatPrice(precoPromocional)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(preco)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-primary">
                {formatPrice(preco)}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg ${
                isAddingToCart
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary/90'
              } text-white transition-colors`}
              aria-label={`Adicionar ${nome} ao carrinho`}
              aria-busy={isAddingToCart}
            >
              <ShoppingCart
                size={20}
                weight={isAddingToCart ? 'fill' : 'regular'}
                className={isAddingToCart ? 'animate-spin' : ''}
              />
              <span className="font-medium">
                {isAddingToCart ? 'Adicionando...' : 'Comprar'}
              </span>
            </button>

            <button
              onClick={handleFavoriteToggle}
              className={`p-2 rounded-lg ${
                isFavorite
                  ? 'bg-red-50 text-red-500'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              } transition-colors`}
              aria-label={`${isFavorite ? 'Remover dos' : 'Adicionar aos'} favoritos`}
            >
              <Heart
                size={20}
                weight={isFavorite ? 'fill' : 'regular'}
                className={isFavorite ? 'animate-pulse' : ''}
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
} 