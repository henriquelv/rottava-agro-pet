import React from 'react'
import { Clock } from 'phosphor-react'

interface ReadingTimeProps {
  content: string
}

export default function ReadingTime({ content }: ReadingTimeProps) {
  // Média de palavras por minuto que uma pessoa lê
  const wordsPerMinute = 200

  // Remover HTML tags e caracteres especiais
  const cleanContent = content.replace(/<[^>]*>/g, '').replace(/[^\w\s]/g, '')
  
  // Contar palavras
  const wordCount = cleanContent.trim().split(/\s+/).length
  
  // Calcular tempo de leitura em minutos
  const readingTime = Math.ceil(wordCount / wordsPerMinute)

  return (
    <div className="flex items-center gap-1 text-text/60">
      <Clock size={16} />
      <span className="text-sm">
        {readingTime} {readingTime === 1 ? 'minuto' : 'minutos'} de leitura
      </span>
    </div>
  )
} 