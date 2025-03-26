import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MagnifyingGlass } from 'phosphor-react'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/blog?q=${encodeURIComponent(searchTerm.trim())}`)
    } else {
      router.push('/blog')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquisar artigos..."
          className="w-full pl-10 pr-4 py-2 bg-white rounded-lg border focus:ring-2 focus:ring-primary focus:border-primary outline-none"
        />
        <MagnifyingGlass
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text/40"
        />
      </div>
    </form>
  )
} 