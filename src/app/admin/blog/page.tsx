'use client'

import React, { useState } from 'react'
import {
  Newspaper,
  Plus,
  Pencil,
  Trash,
  Eye,
  Clock,
  User,
  Tag
} from 'phosphor-react'

interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  date: string
  tags: string[]
  views: number
  status: 'draft' | 'published'
}

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Cuidados essenciais com seu pet no verão',
    slug: 'cuidados-essenciais-com-seu-pet-no-verao',
    content: 'Lorem ipsum dolor sit amet...',
    excerpt: 'Aprenda como proteger seu pet durante os dias mais quentes do ano.',
    author: 'Dr. João Silva',
    date: '2024-03-15',
    tags: ['Cuidados', 'Verão', 'Saúde'],
    views: 245,
    status: 'published'
  },
  {
    id: '2',
    title: 'Alimentação adequada para cães idosos',
    slug: 'alimentacao-adequada-para-caes-idosos',
    content: 'Lorem ipsum dolor sit amet...',
    excerpt: 'Dicas de alimentação para garantir a saúde do seu cão idoso.',
    author: 'Dra. Maria Santos',
    date: '2024-03-10',
    tags: ['Alimentação', 'Cães', 'Idosos'],
    views: 180,
    status: 'published'
  },
  {
    id: '3',
    title: 'Como escolher a ração ideal para seu gato',
    slug: 'como-escolher-a-racao-ideal-para-seu-gato',
    content: 'Lorem ipsum dolor sit amet...',
    excerpt: 'Guia completo para escolher a melhor ração para seu felino.',
    author: 'Dra. Ana Oliveira',
    date: '2024-03-05',
    tags: ['Gatos', 'Alimentação', 'Nutrição'],
    views: 0,
    status: 'draft'
  }
]

export default function BlogPage() {
  const [posts] = useState<Post[]>(mockPosts)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  const handleDeletePost = (postId: string) => {
    // Implementar lógica de exclusão
    console.log(`Excluindo post ${postId}`)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog</h1>
          <p className="text-text/60">
            Gerencie os artigos e conteúdo do blog
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus size={20} />
          <span>Novo Artigo</span>
        </button>
      </div>

      {/* Lista de Artigos */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background">
                <th className="px-6 py-3 text-left text-sm font-medium text-text/60">
                  Artigo
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-text/60">
                  Autor
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-text/60">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-text/60">
                  Tags
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-text/60">
                  Visualizações
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-text/60">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-text/60">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Newspaper className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-text/60">{post.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="text-text/40" size={16} />
                      <span>{post.author}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="text-text/40" size={16} />
                      <span>
                        {new Date(post.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                        >
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="text-text/40" size={16} />
                      <span>{post.views}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingPost(post)}
                        className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        <Pencil className="text-primary" size={20} />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash className="text-red-600" size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Adicionar/Editar Artigo */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Novo Artigo</h2>
            {/* Implementar formulário de adicionar artigo */}
          </div>
        </div>
      )}

      {/* Modal de Edição */}
      {editingPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Editar Artigo</h2>
            {/* Implementar formulário de edição */}
          </div>
        </div>
      )}
    </div>
  )
} 