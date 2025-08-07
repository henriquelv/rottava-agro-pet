'use client'

import { useTranslation } from 'react-i18next'
import { Globe } from 'phosphor-react'

export default function LanguageSelector() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
        aria-label="Selecionar idioma"
      >
        <Globe size={24} />
        <span className="hidden md:block">
          {i18n.language === 'pt-BR' ? 'Português' : 'English'}
        </span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg hidden group-hover:block">
        <button
          onClick={() => changeLanguage('pt-BR')}
          className={`w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg ${
            i18n.language === 'pt-BR' ? 'bg-gray-100' : ''
          }`}
        >
          Português
        </button>
        <button
          onClick={() => changeLanguage('en-US')}
          className={`w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg ${
            i18n.language === 'en-US' ? 'bg-gray-100' : ''
          }`}
        >
          English
        </button>
      </div>
    </div>
  )
} 