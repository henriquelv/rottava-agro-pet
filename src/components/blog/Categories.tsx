import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CaretRight } from 'phosphor-react'

interface Category {
  id: string
  name: string
  slug: string
  description: string
  postCount: number
}

// Mock de categorias para demonstração
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Cuidados Gerais',
    slug: 'cuidados-gerais',
    description: 'Dicas e informações sobre cuidados básicos com pets',
    postCount: 12
  },
  {
    id: '2',
    name: 'Saúde',
    slug: 'saude',
    description: 'Artigos sobre saúde e bem-estar animal',
    postCount: 8
  },
  {
    id: '3',
    name: 'Alimentação',
    slug: 'alimentacao',
    description: 'Guias e dicas sobre alimentação adequada',
    postCount: 6
  },
  {
    id: '4',
    name: 'Comportamento',
    slug: 'comportamento',
    description: 'Entenda melhor o comportamento do seu pet',
    postCount: 5
  },
  {
    id: '5',
    name: 'Raças',
    slug: 'racas',
    description: 'Informações específicas sobre diferentes raças',
    postCount: 7
  }
]

export default function Categories() {
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('categoria')

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Categorias</h2>
      <div className="space-y-2">
        {mockCategories.map(category => (
          <Link
            key={category.id}
            href={`/blog?categoria=${category.slug}`}
            className={`
              flex items-center justify-between p-2 rounded-lg transition-colors
              ${currentCategory === category.slug
                ? 'bg-primary text-white'
                : 'hover:bg-gray-50'
              }
            `}
          >
            <div>
              <span className="font-medium">{category.name}</span>
              <p className={`text-sm ${
                currentCategory === category.slug
                  ? 'text-white/60'
                  : 'text-text/60'
              }`}>
                {category.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${
                currentCategory === category.slug
                  ? 'text-white/60'
                  : 'text-text/60'
              }`}>
                {category.postCount}
              </span>
              <CaretRight
                className={currentCategory === category.slug
                  ? 'text-white/60'
                  : 'text-text/60'
                }
                size={16}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 