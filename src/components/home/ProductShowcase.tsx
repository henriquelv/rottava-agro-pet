'use client'

import Link from 'next/link'
import Image from 'next/image'
import { CaretRight } from 'phosphor-react'
import { formatPrice } from '@/utils/format'

interface Product {
  id: number
  nome: string
  preco_venda: number
  imagem: string
  slug: string
}

interface ProductShowcaseProps {
  title: string
  category: string
  subcategory?: string
}

export function ProductShowcase({ title, category, subcategory }: ProductShowcaseProps) {
  // Aqui você irá buscar os produtos da API baseado na categoria e subcategoria
  const products: Product[] = [
    {
      id: 1,
      nome: 'Ração Golden Special para Cães Adultos',
      preco_venda: 159.90,
      imagem: '/produtos/racao-golden.jpg',
      slug: 'racao-golden-special-caes-adultos'
    },
    {
      id: 2,
      nome: 'Ração Premier para Gatos Castrados',
      preco_venda: 189.90,
      imagem: '/produtos/racao-premier.jpg',
      slug: 'racao-premier-gatos-castrados'
    },
    {
      id: 3,
      nome: 'Coleira Antipulgas Seresto',
      preco_venda: 249.90,
      imagem: '/produtos/coleira-seresto.jpg',
      slug: 'coleira-antipulgas-seresto'
    },
    {
      id: 4,
      nome: 'Areia Higiênica Pipicat',
      preco_venda: 29.90,
      imagem: '/produtos/areia-pipicat.jpg',
      slug: 'areia-higienica-pipicat'
    }
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text">{title}</h2>
        <Link 
          href={`/produtos/categoria/${category}${subcategory ? `/${subcategory}` : ''}`}
          className="flex items-center text-primary hover:text-primary/80 transition-colors"
        >
          Ver todos
          <CaretRight className="ml-1" weight="bold" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/produtos/${product.slug}`}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                <Image
                  src={product.imagem}
                  alt={product.nome}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-text font-medium line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                  {product.nome}
                </h3>
                <p className="text-lg font-bold text-primary">
                  {formatPrice(product.preco_venda)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 