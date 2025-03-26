'use client'

import React from 'react'
import {
  Clock,
  User,
  Tag,
  Newspaper
} from 'phosphor-react'
import Link from 'next/link'
import { useToast } from '@/hooks/ToastContext'
import CommentSection from '@/components/blog/CommentSection'
import RelatedPosts from '@/components/blog/RelatedPosts'
import PostNavigation from '@/components/blog/PostNavigation'
import ReadingTime from '@/components/blog/ReadingTime'
import ShareButtons from '@/components/blog/ShareButtons'
import AuthorCard from '@/components/blog/AuthorCard'
import PublishedDate from '@/components/blog/PublishedDate'

interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  author: {
    id: string
    name: string
  }
  date: string
  tags: string[]
  views: number
  status: 'draft' | 'published'
  coverImage?: string
}

const mockPost: Post = {
  id: '1',
  title: 'Cuidados essenciais com seu pet no verão',
  slug: 'cuidados-essenciais-com-seu-pet-no-verao',
  content: `
    <p>O verão é uma época especial para todos nós, incluindo nossos pets. No entanto, as altas temperaturas podem representar alguns riscos para a saúde dos nossos amigos peludos. Neste artigo, vamos explorar os cuidados essenciais para garantir que seu pet aproveite o verão com segurança e conforto.</p>

    <h2>Hidratação é fundamental</h2>
    <p>Assim como nós, os pets precisam se manter bem hidratados durante os dias quentes. Certifique-se de que seu pet sempre tenha acesso a água fresca e limpa. Considere ter mais de um bebedouro em diferentes locais da casa.</p>

    <h2>Horários adequados para passeios</h2>
    <p>Evite passear com seu pet nos horários mais quentes do dia, geralmente entre 10h e 16h. Prefira os horários da manhã cedo ou fim da tarde, quando as temperaturas estão mais amenas.</p>

    <h2>Proteção contra o sol</h2>
    <p>Para pets com pele clara ou pouco pelo, considere usar protetor solar específico para pets. Certifique-se de que seu pet tenha acesso a áreas sombreadas durante o dia.</p>

    <h2>Alimentação adequada</h2>
    <p>Durante o verão, alguns pets podem ter menos apetite. Ofereça alimentos frescos e mantenha a ração em local seco e arejado. Considere dividir as refeições em porções menores ao longo do dia.</p>

    <h2>Observação de sinais de alerta</h2>
    <p>Fique atento a sinais de desidratação ou insolação, como:</p>
    <ul>
      <li>Respiração ofegante excessiva</li>
      <li>Língua muito vermelha</li>
      <li>Fadiga ou prostração</li>
      <li>Vômitos ou diarreia</li>
    </ul>

    <h2>Conclusão</h2>
    <p>Com esses cuidados, seu pet poderá aproveitar o verão com saúde e bem-estar. Lembre-se de que cada pet é único e pode ter necessidades específicas. Em caso de dúvidas, sempre consulte seu veterinário.</p>
  `,
  excerpt: 'Aprenda como proteger seu pet durante os dias mais quentes do ano.',
  author: {
    id: '1',
    name: 'Dr. João Silva'
  },
  date: '2024-03-15',
  tags: ['Cuidados', 'Verão', 'Saúde'],
  views: 245,
  status: 'published',
  coverImage: '/images/blog/summer-pet-care.jpg'
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = mockPost // Em um caso real, buscar o post pelo slug
  const { showToast } = useToast()

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Cabeçalho */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${tag.toLowerCase()}`}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs hover:bg-primary/20 transition-colors"
              >
                <Tag size={12} />
                {tag}
              </Link>
            ))}
          </div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center justify-between text-sm text-text/60">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{post.author.name}</span>
              </div>
              <PublishedDate date={post.date} />
              <ReadingTime content={post.content} />
            </div>
            <div className="flex items-center gap-2">
              <span>{post.views} visualizações</span>
            </div>
          </div>
        </header>

        {/* Imagem de Capa */}
        <div className="aspect-video relative rounded-xl overflow-hidden mb-8">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
              <Newspaper className="text-primary" size={40} />
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Autor */}
        <div className="mb-8">
          <AuthorCard authorId={post.author.id} />
        </div>

        {/* Compartilhamento */}
        <div className="border-t pt-8 mb-12">
          <ShareButtons
            title={post.title}
            url={typeof window !== 'undefined' ? window.location.href : ''}
          />
        </div>

        {/* Seção de Comentários */}
        <CommentSection articleId={post.id} />

        {/* Navegação entre Posts */}
        <PostNavigation currentPostId={post.id} />

        {/* Posts Relacionados */}
        <RelatedPosts currentPostId={post.id} currentPostTags={post.tags} />
      </div>
    </article>
  )
} 