'use client'

import { Loader2 } from 'lucide-react'

interface LoadingProps {
  size?: number
  className?: string
  fullScreen?: boolean
  text?: string
}

export function Loading({
  size = 32,
  className = '',
  fullScreen = false,
  text,
}: LoadingProps) {
  const content = (
    <div
      className={`flex flex-col items-center justify-center gap-2 ${className}`}
      role="status"
      aria-label="Carregando"
    >
      <Loader2
        size={size}
        className="animate-spin text-primary"
        aria-hidden="true"
      />
      {text && (
        <span className="text-sm text-gray-600" aria-hidden="true">
          {text}
        </span>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    )
  }

  return content
} 