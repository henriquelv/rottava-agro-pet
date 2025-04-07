import { useState, useCallback } from 'react'

interface Notification {
  id: string
  type: 'success' | 'error' | 'info'
  title: string
  message: string
}

export function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setNotifications(prev => [...prev, { ...notification, id }])
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])

  const showSuccess = useCallback((title: string, message: string) => {
    addNotification({
      type: 'success',
      title,
      message
    })
  }, [addNotification])

  const showError = useCallback((title: string, message: string) => {
    addNotification({
      type: 'error',
      title,
      message
    })
  }, [addNotification])

  const showInfo = useCallback((title: string, message: string) => {
    addNotification({
      type: 'info',
      title,
      message
    })
  }, [addNotification])

  return {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showInfo
  }
} 