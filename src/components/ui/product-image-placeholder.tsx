'use client'

import { PawPrint } from 'lucide-react'

interface ProductImagePlaceholderProps {
  name: string
  className?: string
}

export function ProductImagePlaceholder({ name, className = '' }: ProductImagePlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center bg-gray-100 ${className}`}
      style={{ aspectRatio: '1/1' }}
    >
      <div className="text-center">
        <PawPrint className="w-12 h-12 mx-auto text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">{name}</p>
      </div>
    </div>
  )
} 