'use client'

interface SkeletonProps {
  className?: string
  count?: number
}

export function Skeleton({ className = '', count = 1 }: SkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      aria-hidden="true"
    />
  ))

  return <>{skeletons}</>
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative aspect-square bg-gray-200 animate-pulse" />
      <div className="p-4 flex flex-col flex-1">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4 animate-pulse" />
        <div className="flex gap-2 mt-auto">
          <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse" />
          <div className="w-10 h-10 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
} 