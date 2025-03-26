'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'admin'
  preferences: {
    newsletter: boolean
    notifications: {
      comments: boolean
      replies: boolean
      mentions: boolean
    }
  }
  favorites: string[] // IDs dos artigos favoritos
  readingHistory: {
    articleId: string
    timestamp: number
  }[]
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (credentials: { email: string; password: string }) => Promise<void>
  signOut: () => Promise<void>
  updateUserPreferences: (preferences: Partial<User['preferences']>) => Promise<void>
  addToFavorites: (articleId: string) => Promise<void>
  removeFromFavorites: (articleId: string) => Promise<void>
  addToReadingHistory: (articleId: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mockUsers = {
  admin: {
    id: '1',
    name: 'Henrique Moreno',
    email: 'henrique.vmoreno@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    role: 'admin',
    preferences: {
      newsletter: true,
      notifications: {
        comments: true,
        replies: true,
        mentions: true
      }
    },
    favorites: [],
    readingHistory: []
  } as User,
  user: {
    id: '2',
    name: 'João Silva',
    email: 'joao@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao',
    role: 'user',
    preferences: {
      newsletter: true,
      notifications: {
        comments: true,
        replies: true,
        mentions: false
      }
    },
    favorites: [],
    readingHistory: []
  } as User
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento inicial do usuário
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simular autenticação
      if (email === 'henrique.vmoreno@gmail.com') {
        setUser(mockUsers.admin)
        localStorage.setItem('user', JSON.stringify(mockUsers.admin))
      } else if (email === 'joao@example.com') {
        setUser(mockUsers.user)
        localStorage.setItem('user', JSON.stringify(mockUsers.user))
      } else {
        throw new Error('Credenciais inválidas')
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)
    try {
      // Simular logout
      await new Promise(resolve => setTimeout(resolve, 500))
      setUser(null)
      localStorage.removeItem('user')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateUserPreferences = async (preferences: Partial<User['preferences']>) => {
    if (!user) return

    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        ...preferences
      }
    }

    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const addToFavorites = async (articleId: string) => {
    if (!user) return

    const updatedUser = {
      ...user,
      favorites: [...user.favorites, articleId]
    }

    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const removeFromFavorites = async (articleId: string) => {
    if (!user) return

    const updatedUser = {
      ...user,
      favorites: user.favorites.filter(id => id !== articleId)
    }

    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const addToReadingHistory = async (articleId: string) => {
    if (!user) return

    const updatedUser = {
      ...user,
      readingHistory: [
        { articleId, timestamp: Date.now() },
        ...user.readingHistory
      ].slice(0, 50) // Manter apenas os últimos 50 artigos
    }

    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signOut,
        updateUserPreferences,
        addToFavorites,
        removeFromFavorites,
        addToReadingHistory
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
} 