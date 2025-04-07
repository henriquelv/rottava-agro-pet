'use client'

import React from 'react'
import { WhatsappLogo } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'

export function WhatsAppButton() {
  const { t } = useTranslation()
  const phoneNumber = '5549999999999' // Substitua pelo número correto
  const message = encodeURIComponent(t('whatsapp.defaultMessage', 'Olá! Gostaria de mais informações.'))
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:bg-green-600 hover:scale-110"
      aria-label={t('whatsapp.buttonLabel', 'Falar no WhatsApp')}
    >
      <WhatsappLogo size={32} weight="fill" />
    </a>
  )
} 