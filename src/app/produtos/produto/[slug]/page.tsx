import { Product, Image } from '@/database/models'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetails from '@/components/ProductDetails'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await Product.findOne({
    where: { slug: params.slug },
    include: [
      {
        model: Image,
        as: 'imagens'
      }
    ]
  })

  if (!product) {
    return {
      title: 'Produto não encontrado'
    }
  }

  return {
    title: product.nome,
    description: product.descricao,
    openGraph: {
      images: product.imagens?.map(img => img.url) || []
    }
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await Product.findOne({
    where: { slug: params.slug },
    include: [
      {
        model: Image,
        as: 'imagens'
      }
    ]
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetails product={product} />
    </div>
  )
} 