'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Dog, 
  Cat, 
  Bird, 
  Fish, 
  Horse, 
  ShoppingBag,
  IconProps
} from 'phosphor-react'

const iconMap: Record<string, React.ComponentType<IconProps>> = {
  'cao': Dog,
  'gato': Cat,
  'ave': Bird,
  'peixe': Fish,
  'cavalo': Horse,
  'acessorios': ShoppingBag
}

interface Category {
  id: string
  slug: string
  nome: string
  descricao?: string
}

interface CategoriesGridProps {
  categories: Category[]
}

export default function CategoriesGrid({ categories }: CategoriesGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => {
        const Icon = iconMap[category.slug] || ShoppingBag

        return (
          <Link
            key={category.id}
            href={`/produtos/categoria/${category.slug}`}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Icon size={32} className="text-primary mb-2" />
            <h3 className="text-center font-medium">{category.nome}</h3>
            {category.descricao && (
              <p className="text-sm text-gray-500 text-center mt-1">
                {category.descricao}
              </p>
            )}
          </Link>
        )
      })}
    </div>
  )
} 