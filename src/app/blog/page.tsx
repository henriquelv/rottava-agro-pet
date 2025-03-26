'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { MagnifyingGlass, FunnelSimple } from 'phosphor-react'
import FeaturedPosts from '@/components/blog/FeaturedPosts'
import Categories from '@/components/blog/Categories'
import Authors from '@/components/blog/Authors'
import SearchBar from '@/components/blog/SearchBar'
import Pagination from '@/components/blog/Pagination'
import Header from '@/components/layout/Header'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  author: {
    id: string
    name: string
  }
  date: string
  tags: string[]
  coverImage?: string
  featured?: boolean
}

// Mock de posts para demonstração
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Cuidados essenciais com seu pet no verão',
    slug: 'cuidados-essenciais-com-seu-pet-no-verao',
    excerpt: 'Aprenda como proteger seu pet durante os dias mais quentes do ano.',
    author: {
      id: '1',
      name: 'Dr. João Silva'
    },
    date: '2024-03-15',
    tags: ['Cuidados', 'Verão', 'Saúde'],
    coverImage: '/images/blog/summer-pet-care.jpg'
  },
  {
    id: '2',
    title: 'Como escolher a ração ideal para seu pet',
    slug: 'como-escolher-a-racao-ideal-para-seu-pet',
    excerpt: 'Guia completo para escolher a melhor alimentação para seu animal de estimação.',
    author: {
      id: '2',
      name: 'Dra. Maria Santos'
    },
    date: '2024-03-10',
    tags: ['Alimentação', 'Saúde', 'Cuidados'],
    coverImage: '/images/blog/pet-food.jpg'
  },
  {
    id: '3',
    title: 'Exercícios importantes para cães no verão',
    slug: 'exercicios-importantes-para-caes-no-verao',
    excerpt: 'Descubra as melhores atividades físicas para seu cão durante os dias quentes.',
    author: {
      id: '1',
      name: 'Dr. João Silva'
    },
    date: '2024-03-12',
    tags: ['Exercícios', 'Verão', 'Cães'],
    coverImage: '/images/blog/dog-exercise.jpg'
  },
  {
    id: '4',
    title: 'Cuidados com gatos no calor',
    slug: 'cuidados-com-gatos-no-calor',
    excerpt: 'Aprenda como manter seu gato confortável e saudável durante o verão.',
    author: {
      id: '3',
      name: 'Dra. Ana Oliveira'
    },
    date: '2024-03-14',
    tags: ['Gatos', 'Verão', 'Cuidados'],
    coverImage: '/images/blog/cat-summer.jpg'
  },
  {
    id: '5',
    title: 'Dicas de adestramento para filhotes',
    slug: 'dicas-de-adestramento-para-filhotes',
    excerpt: 'Técnicas e dicas para começar o adestramento do seu filhote da maneira correta.',
    author: {
      id: '4',
      name: 'Dr. Pedro Lima'
    },
    date: '2024-03-08',
    tags: ['Adestramento', 'Filhotes', 'Comportamento'],
    coverImage: '/images/blog/puppy-training.jpg'
  }
]

export default function BlogPage() {
  const searchParams = useSearchParams()
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Extrair todos os tags únicos dos posts
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    mockPosts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [])

  // Filtrar posts baseado na busca e tags selecionadas
  const filteredPosts = useMemo(() => {
    const searchTerm = searchParams.get('q')?.toLowerCase() || ''
    const categoria = searchParams.get('categoria')

    return mockPosts.filter(post => {
      // Filtrar por termo de busca
      const matchesSearch = !searchTerm || 
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm))

      // Filtrar por categoria
      const matchesCategory = !categoria || post.tags.includes(categoria)

      // Filtrar por tags selecionadas
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => post.tags.includes(tag))

      return matchesSearch && matchesCategory && matchesTags
    })
  }, [searchParams, selectedTags])

  // Paginar os posts filtrados
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredPosts.slice(startIndex, endIndex)
  }, [filteredPosts, currentPage, itemsPerPage])

  // Resetar a página quando os filtros mudam
  useEffect(() => {
    setCurrentPage(1)
  }, [searchParams, selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog Rottava Agro Pet</h1>
          <p className="text-lg text-text/60 max-w-2xl mx-auto">
            Dicas, novidades e informações importantes sobre o cuidado com seus pets.
            Fique por dentro das últimas atualizações e aprenda mais sobre o bem-estar animal.
          </p>
        </div>

        {/* Posts em Destaque */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Destaques</h2>
          <FeaturedPosts />
        </section>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0 space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <SearchBar />
            </div>
            <Categories />
            <Authors />
          </aside>

          {/* Conteúdo Principal */}
          <main className="flex-1">
            {/* Filtros de Tags */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <FunnelSimple size={20} className="text-text/40" />
                <h2 className="font-semibold">Filtrar por tags</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`
                      px-3 py-1.5 rounded-full text-sm transition-colors
                      ${selectedTags.includes(tag)
                        ? 'bg-primary text-white'
                        : 'bg-primary/10 text-primary hover:bg-primary/20'
                      }
                    `}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Lista de Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {paginatedPosts.map(post => (
                <a
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <article className="h-full flex flex-col">
                    <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/10" />
                      )}
                    </div>
                    
                    <div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.tags.map(tag => (
                          <span
                            key={tag}
                            className="inline-block px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-sm text-text/60 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between text-sm text-text/60">
                        <span>{post.author.name}</span>
                        <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </article>
                </a>
              ))}
            </div>

            {/* Mensagem quando não há resultados */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-text/60">
                  Nenhum artigo encontrado para sua busca.
                </p>
              </div>
            )}

            {/* Paginação */}
            {filteredPosts.length > 0 && (
              <div className="mt-12">
                <Pagination
                  totalItems={filteredPosts.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  )
} 