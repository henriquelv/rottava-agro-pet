import React from 'react'
import Link from 'next/link'
import { Clock, Tag, Newspaper } from 'phosphor-react'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  author: string
  date: string
  tags: string[]
  coverImage?: string
}

interface RelatedPostsProps {
  currentPostId: string
  currentPostTags: string[]
}

// Mock de posts para demonstração
const mockPosts: Post[] = [
  {
    id: '2',
    title: 'Como escolher a ração ideal para seu pet',
    slug: 'como-escolher-a-racao-ideal-para-seu-pet',
    excerpt: 'Guia completo para escolher a melhor alimentação para seu animal de estimação.',
    author: 'Dra. Maria Santos',
    date: '2024-03-10',
    tags: ['Alimentação', 'Saúde', 'Cuidados'],
    coverImage: '/images/blog/pet-food.jpg'
  },
  {
    id: '3',
    title: 'Exercícios importantes para cães no verão',
    slug: 'exercicios-importantes-para-caes-no-verao',
    excerpt: 'Descubra as melhores atividades físicas para seu cão durante os dias quentes.',
    author: 'Dr. Pedro Lima',
    date: '2024-03-12',
    tags: ['Exercícios', 'Verão', 'Cães'],
    coverImage: '/images/blog/dog-exercise.jpg'
  },
  {
    id: '4',
    title: 'Cuidados com gatos no calor',
    slug: 'cuidados-com-gatos-no-calor',
    excerpt: 'Aprenda como manter seu gato confortável e saudável durante o verão.',
    author: 'Dra. Ana Oliveira',
    date: '2024-03-14',
    tags: ['Gatos', 'Verão', 'Cuidados'],
    coverImage: '/images/blog/cat-summer.jpg'
  }
]

export default function RelatedPosts({ currentPostId, currentPostTags }: RelatedPostsProps) {
  // Filtra posts relacionados baseado nas tags em comum
  const relatedPosts = mockPosts
    .filter(post => {
      // Exclui o post atual
      if (post.id === currentPostId) return false
      
      // Verifica se há tags em comum
      const commonTags = post.tags.filter(tag => currentPostTags.includes(tag))
      return commonTags.length > 0
    })
    .sort((a, b) => {
      // Ordena por quantidade de tags em comum (mais relevantes primeiro)
      const aCommonTags = a.tags.filter(tag => currentPostTags.includes(tag)).length
      const bCommonTags = b.tags.filter(tag => currentPostTags.includes(tag)).length
      return bCommonTags - aCommonTags
    })
    .slice(0, 3) // Limita a 3 posts relacionados

  if (relatedPosts.length === 0) return null

  return (
    <section className="border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">Artigos Relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map(post => (
          <Link
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
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                    <Newspaper className="text-primary" size={32} />
                  </div>
                )}
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                    >
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="text-xs text-text/60">+{post.tags.length - 2}</span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-sm text-text/60 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto flex items-center gap-4 text-sm text-text/60">
                  <span>{post.author}</span>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
} 