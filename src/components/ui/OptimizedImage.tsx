'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Skeleton } from './Skeleton'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  fill?: boolean
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '100vw',
  quality = 75,
  fill = false,
  objectFit = 'cover',
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [blurDataURL] = useState(() => {
    // Gerar um placeholder base64 simples
    return `data:image/svg+xml;base64,${Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${width || 100}" height="${
        height || 100
      }" viewBox="0 0 ${width || 100} ${height || 100}"><rect width="100%" height="100%" fill="#f3f4f6"/></svg>`
    ).toString('base64')}`
  })

  return (
    <div className="relative">
      {isLoading && (
        <Skeleton
          className={`absolute inset-0 ${
            fill ? 'w-full h-full' : `w-[${width}px] h-[${height}px]`
          }`}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ objectFit }}
        priority={priority}
        sizes={sizes}
        quality={quality}
        fill={fill}
        placeholder="blur"
        blurDataURL={blurDataURL}
        loading={priority ? 'eager' : 'lazy'}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </div>
  )
} 