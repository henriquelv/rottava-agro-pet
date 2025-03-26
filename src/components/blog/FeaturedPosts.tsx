import React from 'react'
import Link from 'next/link'
import { Clock, Tag, Newspaper } from 'phosphor-react'

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

// Mock de posts em destaque para demonstração
const mockFeaturedPosts: Post[] = [
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
    coverImage: '/images/blog/summer-pet-care.jpg',
    featured: true
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
    coverImage: '/images/blog/pet-food.jpg',
    featured: true
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
    coverImage: '/images/blog/dog-exercise.jpg',
    featured: true
  }
]

export default function FeaturedPosts() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {mockFeaturedPosts.map((post, index) => (
        <Link
          key={post.id}
          href={`/blog/${post.slug}`}
          className={`group ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
        >
          <article className="h-full flex flex-col">
            <div
              className={`relative rounded-xl overflow-hidden mb-4 ${
                index === 0 ? 'aspect-[16/9]' : 'aspect-video'
              }`}
            >
              {post.coverImage ? (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                  <Newspaper className="text-primary" size={40} />
                </div>
              )}
              
              {/* Gradiente sobreposto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Tags */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex-1 flex flex-col">
              <h3
                className={`font-semibold group-hover:text-primary transition-colors mb-2 ${
                  index === 0 ? 'text-2xl' : 'text-lg'
                }`}
              >
                {post.title}
              </h3>
              
              <p className="text-sm text-text/60 mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              
              <div className="mt-auto flex items-center justify-between text-sm text-text/60">
                <span>{post.author.name}</span>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </section>
  )
} 