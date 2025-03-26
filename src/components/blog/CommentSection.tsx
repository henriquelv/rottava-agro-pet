'use client'

import React, { useState } from 'react'
import { useAuth } from '@/hooks/AuthContext'
import { useToast } from '@/hooks/ToastContext'
import {
  User,
  ThumbsUp,
  ThumbsDown,
  ChatDots,
  DotsThree,
  Trash,
  PencilSimple
} from 'phosphor-react'
import Image from 'next/image'
import SocialLogin from '../auth/SocialLogin'

interface Comment {
  id: string
  content: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  createdAt: string
  likes: number
  dislikes: number
  replies: Comment[]
  isEdited?: boolean
}

interface CommentSectionProps {
  articleId: string
}

const mockComments: Comment[] = [
  {
    id: '1',
    content: 'Excelente artigo! Muito informativo e bem escrito.',
    author: {
      id: '1',
      name: 'Maria Silva',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria'
    },
    createdAt: '2024-03-15T10:30:00Z',
    likes: 5,
    dislikes: 0,
    replies: [
      {
        id: '2',
        content: 'Concordo! Especialmente a parte sobre hidratação.',
        author: {
          id: '2',
          name: 'João Santos',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao'
        },
        createdAt: '2024-03-15T11:00:00Z',
        likes: 2,
        dislikes: 0,
        replies: []
      }
    ]
  }
]

export default function CommentSection({ articleId }: CommentSectionProps) {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [editingComment, setEditingComment] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const comment: Comment = {
      id: String(Date.now()),
      content: newComment,
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      replies: []
    }

    if (replyingTo) {
      setComments(comments.map(c => {
        if (c.id === replyingTo) {
          return {
            ...c,
            replies: [...c.replies, comment]
          }
        }
        return c
      }))
      setReplyingTo(null)
    } else {
      setComments([...comments, comment])
    }

    setNewComment('')
    showToast('Comentário publicado com sucesso!', 'success')
  }

  const handleEditComment = (commentId: string) => {
    const comment = comments.find(c => c.id === commentId) ||
      comments.flatMap(c => c.replies).find(c => c?.id === commentId)

    if (comment) {
      setEditingComment(commentId)
      setEditContent(comment.content)
    }
  }

  const handleSaveEdit = (commentId: string) => {
    setComments(comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          content: editContent,
          isEdited: true
        }
      }
      return {
        ...c,
        replies: c.replies.map(r => {
          if (r.id === commentId) {
            return {
              ...r,
              content: editContent,
              isEdited: true
            }
          }
          return r
        })
      }
    }))
    setEditingComment(null)
    setEditContent('')
    showToast('Comentário editado com sucesso!', 'success')
  }

  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter(c => {
      if (c.id === commentId) return false
      c.replies = c.replies.filter(r => r.id !== commentId)
      return true
    }))
    showToast('Comentário excluído com sucesso!', 'success')
  }

  const handleVote = (commentId: string, type: 'like' | 'dislike') => {
    if (!user) {
      showToast('Faça login para votar nos comentários', 'info')
      return
    }

    setComments(comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          likes: type === 'like' ? c.likes + 1 : c.likes,
          dislikes: type === 'dislike' ? c.dislikes + 1 : c.dislikes
        }
      }
      return {
        ...c,
        replies: c.replies.map(r => {
          if (r.id === commentId) {
            return {
              ...r,
              likes: type === 'like' ? r.likes + 1 : r.likes,
              dislikes: type === 'dislike' ? r.dislikes + 1 : r.dislikes
            }
          }
          return r
        })
      }
    }))
  }

  const renderComment = (comment: Comment, isReply = false) => (
    <div
      key={comment.id}
      className={`${
        isReply ? 'ml-8 mt-4' : 'mb-8'
      } bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm`}
    >
      <div className="flex items-start gap-4">
        {comment.author.avatar ? (
          <Image
            src={comment.author.avatar}
            alt={comment.author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="text-primary" size={20} />
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{comment.author.name}</h4>
              <p className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
                {comment.isEdited && (
                  <span className="ml-2 text-xs">(editado)</span>
                )}
              </p>
            </div>

            {user?.id === comment.author.id && (
              <div className="relative">
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <DotsThree size={20} />
                </button>
                <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                  <button
                    onClick={() => handleEditComment(comment.id)}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <PencilSimple size={16} />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash size={16} />
                    <span>Excluir</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {editingComment === comment.id ? (
            <div className="mt-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                rows={3}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setEditingComment(null)}
                  className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleSaveEdit(comment.id)}
                  className="px-3 py-1 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  Salvar
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-2">{comment.content}</p>
          )}

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => handleVote(comment.id, 'like')}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary"
            >
              <ThumbsUp size={16} />
              <span>{comment.likes}</span>
            </button>
            <button
              onClick={() => handleVote(comment.id, 'dislike')}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary"
            >
              <ThumbsDown size={16} />
              <span>{comment.dislikes}</span>
            </button>
            {!isReply && (
              <button
                onClick={() => setReplyingTo(comment.id)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary"
              >
                <ChatDots size={16} />
                <span>Responder</span>
              </button>
            )}
          </div>

          {replyingTo === comment.id && (
            <form onSubmit={handleSubmitComment} className="mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escreva sua resposta..."
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                rows={3}
                required
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setReplyingTo(null)}
                  className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  Responder
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {comment.replies.map((reply) => renderComment(reply, true))}
    </div>
  )

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-8">Comentários</h3>

      {user ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escreva seu comentário..."
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
            rows={4}
            required
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Publicar comentário
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
          <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
            Faça login para comentar
          </p>
          <SocialLogin />
        </div>
      )}

      <div className="space-y-6">
        {comments.map((comment) => renderComment(comment))}
      </div>
    </div>
  )
} 