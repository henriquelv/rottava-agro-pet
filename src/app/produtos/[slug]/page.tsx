import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Product, Image as ProductImage } from '@/database/models'
import { Metadata } from 'next'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await Product.findOne({
    where: { slug: params.slug },
    include: [{
      model: ProductImage,
      as: 'imagens'
    }]
  })

  if (!product) {
    return {
      title: 'Produto não encontrado | Rottava Agro Pet',
      description: 'Produto não encontrado'
    }
  }

  return {
    title: `${product.nome} | Rottava Agro Pet`,
    description: product.descricao || `Produto ${product.nome}`
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await Product.findOne({
    where: { slug: params.slug },
    include: [{
      model: ProductImage,
      as: 'imagens'
    }]
  })

  if (!product) {
    notFound()
  }

  const mainImage = product.imagens[0]?.url || '/images/placeholder.jpg'

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={mainImage}
            alt={product.nome}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.nome}</h1>
          
          {product.descricao && (
            <p className="text-gray-600 mb-6">{product.descricao}</p>
          )}

          <div className="flex items-baseline gap-4 mb-6">
            {product.precoPromocional ? (
              <>
                <span className="text-3xl font-bold text-primary">
                  R$ {Number(product.precoPromocional).toFixed(2)}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  R$ {Number(product.preco).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-primary">
                R$ {Number(product.preco).toFixed(2)}
              </span>
            )}
          </div>

          <button className="w-full md:w-auto bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  )
} 