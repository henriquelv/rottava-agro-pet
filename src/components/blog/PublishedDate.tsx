import React from 'react'
import { Calendar } from 'phosphor-react'

interface PublishedDateProps {
  date: string
  className?: string
}

export default function PublishedDate({ date, className = '' }: PublishedDateProps) {
  const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className={`flex items-center gap-2 text-text/60 ${className}`}>
      <Calendar size={16} weight="regular" />
      <time dateTime={date}>{formattedDate}</time>
    </div>
  )
} 