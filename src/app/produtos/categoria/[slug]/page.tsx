import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ProductCard from '@/components/product/ProductCard'
import { Category, Product, Image } from '@/database/models'

interface CategoriaPageProps {
  params: {
    slug: string
  }
}

interface CategoryType {
  id: string
  nome: string
  slug: string
  products: ProductType[]
}

interface ProductType {
  id: string
  nome: string
  slug: string
  preco: number
  precoPromocional: number | null
  images: ImageType[]
}

interface ImageType {
  id: string
  url: string
}

export async function generateMetadata({ params }: CategoriaPageProps): Promise<Metadata> {
  const rawCategoria = await Category.findOne({
    where: { slug: params.slug }
  })

  const categoria = rawCategoria ? JSON.parse(JSON.stringify(rawCategoria)) : null

  if (!categoria) {
    return {
      title: 'Categoria não encontrada | Rottava Agro Pet',
      description: 'Categoria não encontrada'
    }
  }

  return {
    title: `${categoria.nome} | Rottava Agro Pet`,
    description: `Produtos da categoria ${categoria.nome}`
  }
}

export default async function CategoriaPage({ params }: CategoriaPageProps) {
  const rawCategoria = await Category.findOne({
    where: { slug: params.slug },
    include: [{
      model: Product,
      as: 'products',
      include: [{
        model: Image,
        as: 'images'
      }]
    }]
  })

  const categoria = rawCategoria ? JSON.parse(JSON.stringify(rawCategoria)) : null

  if (!categoria) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{categoria.nome}</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoria.products?.map((produto: ProductType) => (
          <ProductCard key={produto.id} product={{
            id: produto.id,
            nome: produto.nome,
            slug: produto.slug,
            preco: Number(produto.preco),
            precoPromocional: produto.precoPromocional ? Number(produto.precoPromocional) : undefined,
            images: produto.images?.map((img: ImageType) => ({
              id: img.id,
              url: img.url
            })),
            category: {
              slug: categoria.slug
            }
          }} />
        ))}
      </div>

      {(!categoria.products || categoria.products.length === 0) && (
        <p className="text-center text-gray-500">Nenhum produto encontrado nesta categoria.</p>
      )}
    </div>
  )
} 