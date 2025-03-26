'use client'

import { WhatsappLogo } from 'phosphor-react'

export function WhatsAppButton() {
  const phoneNumber = '5549999999999' // Substitua pelo número correto
  const message = 'Olá! Gostaria de mais informações sobre a Rottava Agropet.'

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
      aria-label="Contato via WhatsApp"
    >
      <WhatsappLogo size={32} weight="fill" />
    </button>
  )
} 