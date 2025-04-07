'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingCart, Heart, Share } from 'phosphor-react'
import { toast } from 'sonner'
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

export default function ProductPage({ params }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantidade, setQuantidade] = useState(1)

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

  const handleAddToCart = () => {
    toast.success('Produto adicionado ao carrinho!')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.nome,
        text: product.descricao,
        url: window.location.href
      })
    } else {
      toast.info('Compartilhamento não suportado neste dispositivo')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Galeria de Imagens */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={product.imagens[selectedImage]?.url || '/images/placeholder.jpg'}
              alt={product.nome}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {product.imagens.map((imagem, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-primary' : ''
                }`}
              >
                <Image
                  src={imagem.url}
                  alt={`${product.nome} - Imagem ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Informações do Produto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.nome}</h1>
            <p className="text-gray-500 mt-2">{product.categoria}</p>
          </div>

          <div className="flex items-baseline gap-4">
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

          {product.peso && (
            <div className="text-gray-600">
              <span className="font-medium">Peso:</span> {product.peso}
            </div>
          )}

          <div className="space-y-2">
            <h2 className="text-lg font-medium text-gray-900">Descrição</h2>
            <p className="text-gray-600">{product.descricao}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantidade(prev => Math.max(1, prev - 1))}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-2">{quantidade}</span>
              <button
                onClick={() => setQuantidade(prev => prev + 1)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
            >
              <ShoppingCart size={20} />
              Adicionar ao Carrinho
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => toast.info('Funcionalidade em desenvolvimento')}
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            >
              <Heart size={20} />
              Favoritar
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            >
              <Share size={20} />
              Compartilhar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 