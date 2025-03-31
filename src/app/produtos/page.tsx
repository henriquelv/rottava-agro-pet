'use client'

import React from 'react'
import Header from '@/components/layout/Header'
import { WavyBackground } from '@/components/layout/WavyBackground'
import { 
  Dog, 
  Cat, 
  Bird, 
  Fish, 
  Horse, 
  ShoppingBag 
} from 'phosphor-react'
import { products } from '@/data/products'
import { ProductGrid } from '@/components/ProductGrid'

const categorias = [
  {
    id: 'cao',
    nome: 'Cães',
    icone: Dog,
    descricao: 'Produtos especiais para seu melhor amigo'
  },
  {
    id: 'gato',
    nome: 'Gatos',
    icone: Cat,
    descricao: 'Tudo para seu gatinho'
  },
  {
    id: 'ave',
    nome: 'Aves',
    icone: Bird,
    descricao: 'Produtos para suas aves'
  },
  {
    id: 'peixe',
    nome: 'Peixes',
    icone: Fish,
    descricao: 'Acessórios para aquário'
  },
  {
    id: 'cavalo',
    nome: 'Cavalos',
    icone: Horse,
    descricao: 'Produtos para equinos'
  },
  {
    id: 'acessorios',
    nome: 'Acessórios',
    icone: ShoppingBag,
    descricao: 'Acessórios gerais para pets'
  }
]

export default function ProductsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Nossos Produtos</h2>
        <div className="mt-6">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  )
} 