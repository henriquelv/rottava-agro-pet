'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/hooks/useCart'
import { toast } from 'react-hot-toast'
import { ShoppingCart, Heart } from 'lucide-react'
import { ProductCard } from './ProductCard'
import { ProductGridSkeleton } from './ui/Skeleton'

interface Product {
  id: string
  nome: string
  preco: number
  precoPromocional?: number
  imagem: string
  slug: string
  categoria: string
}

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
}

export function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  if (isLoading) {
    return <ProductGridSkeleton count={8} />
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Nenhum produto encontrado</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          nome={product.nome}
          preco={product.preco}
          precoPromocional={product.precoPromocional}
          imagem={product.imagem}
          slug={product.slug}
          categoria={product.categoria}
        />
      ))}
    </div>
  )
}

interface Produto {
  codigo: string
  nome: string
  slug: string
  categoria: string
  descricao: string
  preco: number
  preco_promocional?: number
  imagem: string
}

interface ProductGridProps {
  produtos: Produto[]
}

const ProductGrid: React.FC<ProductGridProps> = ({ produtos }) => {
  const { addItem } = useCart()

  const handleAddToCart = (produto: Produto, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    
    addItem({
      id: produto.codigo,
      nome: produto.nome,
      preco: produto.preco,
      preco_promocional: produto.preco_promocional,
      quantidade: 1,
      imagem: produto.imagem
    })
    
    toast.success(`${produto.nome} adicionado ao carrinho`)
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {produtos.map((produto) => (
        <Link
          href={`/produtos/${produto.slug}`}
          key={produto.codigo}
          className="group relative bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow border border-gray-200"
        >
          <div className="relative h-52 bg-gray-100">
            <Image
              src={produto.imagem || '/images/placeholder.jpg'}
              alt={produto.nome}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              priority={false}
            />
          </div>
          
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[2.5rem]">
              {produto.nome}
            </h3>
            
            <div className="mt-2">
              {produto.preco_promocional ? (
                <div className="flex items-baseline space-x-2">
                  <span className="text-lg font-bold text-red-600">
                    {formatPrice(produto.preco_promocional)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(produto.preco)}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(produto.preco)}
                </span>
              )}
            </div>
            
            <div className="mt-3 flex justify-between">
              <button 
                onClick={(e) => handleAddToCart(produto, e)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm rounded-md bg-green-50 text-green-700 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <ShoppingCart size={16} className="mr-1" />
                Comprar
              </button>
              
              <button 
                className="inline-flex items-center px-2 py-1.5 border border-transparent text-sm rounded-md text-gray-400 hover:text-red-500 focus:outline-none"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  toast('Funcionalidade em desenvolvimento', {
                    icon: '🛠️'
                  })
                }}
              >
                <Heart size={18} />
              </button>
            </div>
          </div>
          
          {produto.preco_promocional && (
            <div className="absolute top-0 right-0 bg-red-600 text-white px-2 py-1 text-xs font-bold">
              {Math.round((1 - produto.preco_promocional / produto.preco) * 100)}% OFF
            </div>
          )}
        </Link>
      ))}
    </div>
  )
}

export default ProductGrid 