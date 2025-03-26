'use client'

import React, { useState } from 'react'
import {
  Moon,
  Sun,
  TextAa,
  Plus,
  Minus,
  ArrowCounterClockwise,
  Eye,
  Wheelchair
} from 'phosphor-react'
import { useTheme } from '@/hooks/ThemeContext'

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const {
    isDarkMode,
    toggleDarkMode,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    isHighContrast,
    toggleHighContrast
  } = useTheme()

  return (
    <div className="fixed right-4 top-24 z-50">
      {/* Botão principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-dark transition-colors"
        aria-label="Menu de Acessibilidade"
      >
        <Wheelchair size={24} weight="bold" />
      </button>

      {/* Menu dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Acessibilidade
            </h3>
          </div>

          {/* Modo Escuro */}
          <button
            onClick={toggleDarkMode}
            className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? (
              <Sun className="text-yellow-500" size={20} />
            ) : (
              <Moon className="text-gray-600" size={20} />
            )}
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
            </span>
          </button>

          {/* Alto Contraste */}
          <button
            onClick={toggleHighContrast}
            className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Eye
              className={isHighContrast ? 'text-primary' : 'text-gray-600'}
              size={20}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Alto Contraste
            </span>
          </button>

          {/* Tamanho da Fonte */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <TextAa size={20} className="text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Tamanho da Fonte
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={decreaseFontSize}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                aria-label="Diminuir fonte"
              >
                <Minus size={16} />
              </button>
              <button
                onClick={resetFontSize}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                aria-label="Resetar fonte"
              >
                <ArrowCounterClockwise size={16} />
              </button>
              <button
                onClick={increaseFontSize}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                aria-label="Aumentar fonte"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Dicas de Acessibilidade */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Atalhos do teclado:
              <br />
              Alt + 1: Menu principal
              <br />
              Alt + 2: Conteúdo principal
              <br />
              Alt + 3: Busca
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 