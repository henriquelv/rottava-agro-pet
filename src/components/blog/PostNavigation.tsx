import React from 'react'
import Link from 'next/link'
import { CaretLeft, CaretRight } from 'phosphor-react'

interface Post {
  id: string
  title: string
  slug: string
  coverImage?: string
}

interface PostNavigationProps {
  currentPostId: string
}

// Mock de posts para demonstração
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Cuidados essenciais com seu pet no verão',
    slug: 'cuidados-essenciais-com-seu-pet-no-verao',
    coverImage: '/images/blog/summer-pet-care.jpg'
  },
  {
    id: '2',
    title: 'Como escolher a ração ideal para seu pet',
    slug: 'como-escolher-a-racao-ideal-para-seu-pet',
    coverImage: '/images/blog/pet-food.jpg'
  },
  {
    id: '3',
    title: 'Exercícios importantes para cães no verão',
    slug: 'exercicios-importantes-para-caes-no-verao',
    coverImage: '/images/blog/dog-exercise.jpg'
  },
  {
    id: '4',
    title: 'Cuidados com gatos no calor',
    slug: 'cuidados-com-gatos-no-calor',
    coverImage: '/images/blog/cat-summer.jpg'
  }
]

export default function PostNavigation({ currentPostId }: PostNavigationProps) {
  // Encontrar índice do post atual
  const currentIndex = mockPosts.findIndex(post => post.id === currentPostId)
  
  // Definir posts anterior e próximo
  const previousPost = currentIndex > 0 ? mockPosts[currentIndex - 1] : null
  const nextPost = currentIndex < mockPosts.length - 1 ? mockPosts[currentIndex + 1] : null

  if (!previousPost && !nextPost) return null

  return (
    <nav className="border-t pt-8 mt-12">
      <div className="flex justify-between items-stretch">
        {previousPost ? (
          <Link
            href={`/blog/${previousPost.slug}`}
            className="group flex flex-col flex-1 max-w-[45%]"
          >
            <span className="flex items-center gap-1 text-sm text-text/60 mb-2 group-hover:text-primary transition-colors">
              <CaretLeft size={16} />
              Post Anterior
            </span>
            <div className="flex items-center gap-4">
              {previousPost.coverImage && (
                <div className="relative w-16 h-16 flex-shrink-0">
                  <img
                    src={previousPost.coverImage}
                    alt={previousPost.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
              <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                {previousPost.title}
              </h3>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="group flex flex-col items-end flex-1 max-w-[45%]"
          >
            <span className="flex items-center gap-1 text-sm text-text/60 mb-2 group-hover:text-primary transition-colors">
              Próximo Post
              <CaretRight size={16} />
            </span>
            <div className="flex items-center gap-4">
              <h3 className="font-medium text-right line-clamp-2 group-hover:text-primary transition-colors">
                {nextPost.title}
              </h3>
              {nextPost.coverImage && (
                <div className="relative w-16 h-16 flex-shrink-0">
                  <img
                    src={nextPost.coverImage}
                    alt={nextPost.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </nav>
  )
} 