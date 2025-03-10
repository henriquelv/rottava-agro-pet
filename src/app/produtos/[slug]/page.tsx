'use client'

import { useEffect, useState, useContext } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Star, ShoppingCart, ArrowLeft } from 'phosphor-react'
import { CartContext } from '@/hooks/CartContext'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import { toast } from 'sonner'

interface ProductDetails {
  id: string
  name: string
  description: string
  images: {
    url: string
    alt: string
    isMain: boolean
  }[]
  variants: {
    name: string
    price: number
    stockQuantity: number
  }[]
  rating: number
  reviewCount: number
  brand: string
  category: string
}

export default function ProductDetails() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<ProductDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  const { addToCart } = context

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.slug}`)
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.error('Erro ao carregar produto:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.slug])

  const handleAddToCart = () => {
    if (product) {
      const item = {
        id: product.id,
        nome: product.name,
        preco: product.variants[selectedVariant].price,
        tipo: 'produto' as const,
        imagem: product.images.find((img) => img.isMain)?.url || product.images[0].url,
        variante: product.variants[selectedVariant].name,
        quantidade: 1
      }
      addToCart(item)
      toast.success('Produto adicionado ao carrinho!')
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="pt-24 container">
          <div className="text-center py-12">
            <p className="text-text/60">Carregando produto...</p>
          </div>
        </div>
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="pt-24 container">
          <div className="text-center py-12">
            <p className="text-text/60">Produto não encontrado</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="pt-24 container">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-text hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            Voltar
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Imagem do Produto */}
            <div className="relative aspect-square">
              <Image
                src={product.images.find((img) => img.isMain)?.url || product.images[0].url}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Detalhes do Produto */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-text">{product.name}</h1>

              {/* Descrição Detalhada */}
              <div className="prose prose-green max-w-none">
                <p className="text-text/80 leading-relaxed">{product.description}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      weight={index < product.rating ? 'fill' : 'regular'}
                      className="w-5 h-5 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-text/60">
                  ({product.reviewCount} avaliações)
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-2xl font-bold text-primary">
                  R$ {product.variants[selectedVariant].price.toFixed(2)}
                </p>
                {product.variants.length > 1 && (
                  <div className="flex gap-2">
                    {product.variants.map((variant, index) => (
                      <button
                        key={variant.name}
                        onClick={() => setSelectedVariant(index)}
                        className={`px-4 py-2 rounded-lg border ${
                          selectedVariant === index
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-200'
                        }`}
                      >
                        {variant.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
                disabled={product.variants[selectedVariant].stockQuantity === 0}
              >
                <ShoppingCart size={24} />
                {product.variants[selectedVariant].stockQuantity === 0
                  ? 'Produto Indisponível'
                  : 'Adicionar ao Carrinho'}
              </button>

              {/* Informações Adicionais */}
              <div className="pt-6 border-t">
                <h2 className="text-lg font-semibold mb-2">Informações do Produto</h2>
                <ul className="space-y-2 text-text/80">
                  <li>• Marca: {product.brand}</li>
                  <li>• Categoria: {product.category}</li>
                  <li>• Disponibilidade: {product.variants[selectedVariant].stockQuantity} unidades</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 