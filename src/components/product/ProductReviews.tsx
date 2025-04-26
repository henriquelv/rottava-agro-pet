'use client'

import { useState } from 'react'
import { Star, StarHalf, StarFill } from 'phosphor-react'
import { useAuth } from '@/hooks/useAuth'

interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

interface ProductReviewsProps {
  productId: string
  reviews: Review[]
  averageRating: number
  totalReviews: number
}

export function ProductReviews({
  productId,
  reviews,
  averageRating,
  totalReviews
}: ProductReviewsProps) {
  const { user } = useAuth()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSubmitting(true)
    try {
      // Aqui você implementaria a chamada à API para salvar a avaliação
      console.log('Salvando avaliação:', { productId, rating, comment })
      // Reset form
      setRating(0)
      setComment('')
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarFill key={i} size={20} className="text-yellow-400" />)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<StarHalf key={i} size={20} className="text-yellow-400" />)
      } else {
        stars.push(<Star key={i} size={20} className="text-yellow-400" />)
      }
    }

    return stars
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Avaliações</h3>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center">
          {renderStars(averageRating)}
          <span className="ml-2 text-lg font-semibold">{averageRating.toFixed(1)}</span>
        </div>
        <span className="text-gray-600">({totalReviews} avaliações)</span>
      </div>

      {user && (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sua avaliação
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                  aria-label={`Avaliar com ${star} estrelas`}
                >
                  {star <= rating ? (
                    <StarFill size={24} className="text-yellow-400" />
                  ) : (
                    <Star size={24} className="text-yellow-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seu comentário
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
              placeholder="Conte sua experiência com o produto..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !rating}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar avaliação'}
          </button>
        </form>
      )}

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center">
                {renderStars(review.rating)}
              </div>
              <span className="font-semibold">{review.userName}</span>
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 