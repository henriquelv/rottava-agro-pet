'use client'

import Link from 'next/link'
import { Dog, Cat, Bird, Fish, Horse, Package, FirstAidKit } from 'phosphor-react'

const categories = [
  {
    id: 'cao',
    name: 'Cães',
    icon: Dog,
    href: '/produtos/categoria/cao'
  },
  {
    id: 'gato',
    name: 'Gatos',
    icon: Cat,
    href: '/produtos/categoria/gato'
  },
  {
    id: 'ave',
    name: 'Aves',
    icon: Bird,
    href: '/produtos/categoria/ave'
  },
  {
    id: 'peixe',
    name: 'Peixes',
    icon: Fish,
    href: '/produtos/categoria/peixe'
  },
  {
    id: 'cavalo',
    name: 'Cavalos',
    icon: Horse,
    href: '/produtos/categoria/cavalo'
  },
  {
    id: 'racao',
    name: 'Rações',
    icon: Package,
    href: '/produtos/categoria/racao'
  },
  {
    id: 'acessorios',
    name: 'Acessórios',
    icon: Package,
    href: '/produtos/categoria/acessorios'
  },
  {
    id: 'higiene',
    name: 'Higiene & Medicamentos',
    icon: FirstAidKit,
    href: '/produtos/categoria/higiene'
  }
]

export function CategoryGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Categorias</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            
            return (
              <Link
                key={category.id}
                href={category.href}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="text-primary" weight="fill" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
} 