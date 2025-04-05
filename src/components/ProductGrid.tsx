'use client'

import Image from 'next/image'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

interface ProductImage {
  id: string
  url: string
}

interface Product {
  id: string
  nome: string
  slug: string
  preco: number
  precoPromocional?: number | null
  images: ProductImage[]
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Nenhum produto encontrado.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <Link 
          key={product.id} 
          href={`/produtos/${product.slug}`} 
          className="group"
        >
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
            <Image
              src={product.images[0]?.url || '/images/placeholder.jpg'}
              alt={product.nome}
              width={500}
              height={500}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">{product.nome}</h3>
          <div className="mt-1">
            {product.precoPromocional ? (
              <>
                <span className="text-lg font-medium text-gray-900">
                  {formatCurrency(product.precoPromocional)}
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  {formatCurrency(product.preco)}
                </span>
              </>
            ) : (
              <span className="text-lg font-medium text-gray-900">
                {formatCurrency(product.preco)}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
} 