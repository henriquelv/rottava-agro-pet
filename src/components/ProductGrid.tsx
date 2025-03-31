import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/data/products'
import { formatCurrency } from '@/lib/utils'
import { ProductImagePlaceholder } from './ui/product-image-placeholder'

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <Link key={product.id} href={`/produtos/${product.id}`} className="group">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            {product.image && product.image.startsWith('/images/') ? (
              <ProductImagePlaceholder
                name={product.name}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            ) : (
              <Image
                src={product.image || '/images/placeholder.jpg'}
                alt={product.name}
                width={500}
                height={500}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            )}
          </div>
          <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">
            {formatCurrency(product.price)}
          </p>
        </Link>
      ))}
    </div>
  )
} 