import Image from 'next/image'
import { products } from '@/data/products'
import { formatCurrency } from '@/lib/utils'
import { notFound } from 'next/navigation'
import { ProductImagePlaceholder } from '@/components/ui/product-image-placeholder'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Imagem do produto */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="overflow-hidden rounded-lg">
            {product.image.startsWith('/images/') ? (
              <ProductImagePlaceholder
                name={product.name}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <Image
                src={product.image}
                alt={product.name}
                width={800}
                height={800}
                className="h-full w-full object-cover object-center"
              />
            )}
          </div>
        </div>

        {/* Informações do produto */}
        <div className="mt-10 lg:col-start-2 lg:mt-0 lg:self-center">
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product.name}</h1>
          </div>

          <section className="mt-4">
            <div className="flex items-center">
              <p className="font-medium text-gray-900">{formatCurrency(product.price)}</p>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{product.description}</p>
            </div>

            <div className="mt-8 flex">
              <button
                type="button"
                className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
              >
                Adicionar ao carrinho
              </button>
            </div>

            {/* Informações adicionais */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-sm font-medium text-gray-900">Informações do produto</h2>
              <div className="prose prose-sm mt-4 text-gray-500">
                <ul role="list">
                  <li>Marca: {product.brand}</li>
                  {product.weight && <li>Peso: {product.weight}</li>}
                  <li>Categoria: {product.category}</li>
                  <li>Estoque: {product.stock} unidades</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 