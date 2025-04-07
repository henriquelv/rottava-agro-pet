'use client'

import { createContext, useContext } from 'react'
import { useNotification } from '@/hooks/useNotification'

interface NotificationContextData {
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'info'
    title: string
    message: string
  }>
  addNotification: (notification: {
    type: 'success' | 'error' | 'info'
    title: string
    message: string
  }) => void
  removeNotification: (id: string) => void
  showSuccess: (title: string, message: string) => void
  showError: (title: string, message: string) => void
  showInfo: (title: string, message: string) => void
}

const NotificationContext = createContext<NotificationContextData>({} as NotificationContextData)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showInfo
  } = useNotification()

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        showSuccess,
        showError,
        showInfo
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotificationContext() {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider')
  }

  return context
} 