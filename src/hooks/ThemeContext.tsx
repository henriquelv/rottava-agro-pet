'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface ThemeContextType {
  isDarkMode: boolean
  toggleDarkMode: () => void
  fontSize: number
  increaseFontSize: () => void
  decreaseFontSize: () => void
  resetFontSize: () => void
  isHighContrast: boolean
  toggleHighContrast: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const MIN_FONT_SIZE = 14
const MAX_FONT_SIZE = 24
const DEFAULT_FONT_SIZE = 16

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE)
  const [isHighContrast, setIsHighContrast] = useState(false)

  useEffect(() => {
    // Carregar preferências salvas
    const savedTheme = localStorage.getItem('theme')
    const savedFontSize = localStorage.getItem('fontSize')
    const savedContrast = localStorage.getItem('highContrast')

    if (savedTheme) setIsDarkMode(savedTheme === 'dark')
    if (savedFontSize) setFontSize(Number(savedFontSize))
    if (savedContrast) setIsHighContrast(savedContrast === 'true')

    // Verificar preferência do sistema
    if (!savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkMode(prefersDark)
    }
  }, [])

  useEffect(() => {
    // Aplicar classes ao documento
    document.documentElement.classList.toggle('dark', isDarkMode)
    document.documentElement.classList.toggle('high-contrast', isHighContrast)
    document.documentElement.style.fontSize = `${fontSize}px`

    // Salvar preferências
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    localStorage.setItem('fontSize', String(fontSize))
    localStorage.setItem('highContrast', String(isHighContrast))
  }, [isDarkMode, fontSize, isHighContrast])

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, MAX_FONT_SIZE))
  }

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, MIN_FONT_SIZE))
  }

  const resetFontSize = () => {
    setFontSize(DEFAULT_FONT_SIZE)
  }

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast)
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        isHighContrast,
        toggleHighContrast
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
  }
  return context
} 