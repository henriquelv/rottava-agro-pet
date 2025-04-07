'use client'

import React, { useState } from 'react'
import { ChatCircleText } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'

export function ChatButton() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-4 left-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-all hover:bg-blue-600 hover:scale-110"
        aria-label={t('chat.buttonLabel', 'Abrir chat')}
      >
        <ChatCircleText size={32} weight="fill" />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 left-4 z-50 w-80 rounded-lg bg-white p-4 shadow-xl">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-lg font-semibold">
              {t('chat.title', 'Chat de Atendimento')}
            </h3>
            <button
              onClick={toggleChat}
              className="text-gray-500 hover:text-gray-700"
              aria-label={t('chat.closeLabel', 'Fechar chat')}
            >
              ✕
            </button>
          </div>
          <div className="mt-4 h-80 overflow-y-auto">
            <div className="space-y-4">
              <p className="rounded-lg bg-gray-100 p-3">
                {t('chat.welcomeMessage', 'Olá! Como posso ajudar você hoje?')}
              </p>
            </div>
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              placeholder={t('chat.inputPlaceholder', 'Digite sua mensagem...')}
              className="flex-1 rounded-l-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            />
            <button className="rounded-r-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              {t('chat.sendButton', 'Enviar')}
            </button>
          </div>
        </div>
      )}
    </>
  )
} 