'use client'

import { useState } from 'react'
import { TextAa, TextT, SpeakerHigh, SpeakerX } from 'phosphor-react'

export default function AccessibilityBar() {
  const [fontSize, setFontSize] = useState(16)
  const [contrast, setContrast] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [speech, setSpeech] = useState(false)

  const handleFontSize = (size: number) => {
    setFontSize(size)
    document.documentElement.style.fontSize = `${size}px`
  }

  const handleContrast = () => {
    setContrast(!contrast)
    document.body.classList.toggle('contrast')
  }

  const handleHighContrast = () => {
    setHighContrast(!highContrast)
    document.body.classList.toggle('high-contrast')
  }

  const handleSpeech = () => {
    setSpeech(!speech)
    if (!speech) {
      // Iniciar leitura de tela
      const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, button')
      elements.forEach(element => {
        element.setAttribute('aria-live', 'polite')
      })
    } else {
      // Parar leitura de tela
      const elements = document.querySelectorAll('[aria-live]')
      elements.forEach(element => {
        element.removeAttribute('aria-live')
      })
    }
  }

  return (
    <div className="bg-gray-100 py-2 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleFontSize(14)}
          className={`p-2 rounded-lg ${
            fontSize === 14 ? 'bg-primary text-white' : 'bg-white text-gray-700'
          }`}
          aria-label="Diminuir tamanho da fonte"
        >
          <TextAa size={20} />
        </button>
        <button
          onClick={() => handleFontSize(16)}
          className={`p-2 rounded-lg ${
            fontSize === 16 ? 'bg-primary text-white' : 'bg-white text-gray-700'
          }`}
          aria-label="Tamanho normal da fonte"
        >
          <TextAa size={24} />
        </button>
        <button
          onClick={() => handleFontSize(18)}
          className={`p-2 rounded-lg ${
            fontSize === 18 ? 'bg-primary text-white' : 'bg-white text-gray-700'
          }`}
          aria-label="Aumentar tamanho da fonte"
        >
          <TextAa size={28} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleContrast}
          className={`p-2 rounded-lg ${
            contrast ? 'bg-primary text-white' : 'bg-white text-gray-700'
          }`}
          aria-label="Alternar contraste"
        >
          <TextT size={24} />
        </button>
        <button
          onClick={handleHighContrast}
          className={`p-2 rounded-lg ${
            highContrast ? 'bg-primary text-white' : 'bg-white text-gray-700'
          }`}
          aria-label="Alternar alto contraste"
        >
          <TextT size={24} weight="bold" />
        </button>
        <button
          onClick={handleSpeech}
          className={`p-2 rounded-lg ${
            speech ? 'bg-primary text-white' : 'bg-white text-gray-700'
          }`}
          aria-label="Alternar leitura de tela"
        >
          {speech ? <SpeakerX size={24} /> : <SpeakerHigh size={24} />}
        </button>
      </div>
    </div>
  )
} 