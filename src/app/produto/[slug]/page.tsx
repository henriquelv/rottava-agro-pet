'use client'

import React, { useState, useContext } from 'react'
import Image from 'next/image'
import { Star, Truck, ShieldCheck, ArrowsClockwise } from 'phosphor-react'
import { CartContext } from '@/hooks/CartContext'
import { Product } from '@/types/product'
import Header from '@/components/layout/Header'

// Temporário: Será substituído por uma chamada à API
const product: Product = {
  id: '1',
  name: 'Ração Premium para Cães Adultos',
  slug: 'racao-premium-caes-adultos',
  description: 'Ração premium desenvolvida especialmente para cães adultos, com nutrientes essenciais para uma vida saudável.',
  images: [
    {
      id: '1',
      url: '/products/racao.jpg',
      alt: 'Ração Premium para Cães',
      isMain: true
    }
  ],
  category: 'Ração',
  variants: [
    {
      id: '1',
      name: '15kg',
      price: 159.90,
      compareAtPrice: 179.90,
      sku: 'RAC-PREM-15KG',
      stockQuantity: 10
    }
  ],
  brand: 'PremiumPet',
  rating: 4.5,
  reviewCount: 128,
  tags: ['ração', 'cachorro', 'premium'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  const { addToCart } = context

  const variant = product.variants[selectedVariant]
  const hasDiscount = variant.compareAtPrice && variant.compareAtPrice > variant.price

  const handleAddToCart = () => {
    addToCart({
      id: variant.id,
      nome: product.name,
      preco: variant.price,
      imagem: product.images[0].url,
      variante: variant.name,
      quantidade: quantity,
      tipo: 'produto'
    })
  }

  return (
    <>
      <Header />
      <main className="container pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galeria de Imagens */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-white">
              <Image
                src={product.images[selectedImage].url}
                alt={product.images[selectedImage].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  className={`relative aspect-square rounded-lg overflow-hidden bg-white ${
                    index === selectedImage ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Informações do Produto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-text">{product.name}</h1>
              <p className="text-text/60 mt-1">{product.brand}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    weight={index < Math.floor(product.rating) ? 'fill' : 'regular'}
                    className="w-5 h-5 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-text/60">({product.reviewCount} avaliações)</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                {hasDiscount && (
                  <span className="text-sm text-text/60 line-through">
                    R$ {variant.compareAtPrice?.toFixed(2)}
                  </span>
                )}
                <span className="text-3xl font-bold text-primary">
                  R$ {variant.price.toFixed(2)}
                </span>
              </div>
              {hasDiscount && (
                <span className="inline-block bg-red-100 text-red-700 text-sm px-2 py-1 rounded">
                  {Math.round(
                    ((variant.compareAtPrice! - variant.price) / variant.compareAtPrice!) * 100
                  )}% de desconto
                </span>
              )}
            </div>

            <div className="space-y-4 py-4 border-y">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-text">Frete grátis para Caçador</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="text-text">Garantia de satisfação</span>
              </div>
              <div className="flex items-center gap-3">
                <ArrowsClockwise className="w-5 h-5 text-primary" />
                <span className="text-text">Troca fácil em até 7 dias</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-text mb-1">
                  Quantidade
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={variant.stockQuantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-24 px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
                />
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-primary w-full py-3 text-lg"
                disabled={variant.stockQuantity === 0}
              >
                {variant.stockQuantity === 0 ? 'Indisponível' : 'Adicionar ao Carrinho'}
              </button>
            </div>

            <div className="prose prose-green max-w-none">
              <h2 className="text-xl font-semibold text-text">Descrição</h2>
              <p className="text-text/80">{product.description}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
} 