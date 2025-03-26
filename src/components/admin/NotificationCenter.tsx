import React, { useState } from 'react'
import {
  Bell,
  Warning,
  ShoppingCart,
  Package,
  CaretDown,
  X
} from 'phosphor-react'
import {
  formatDateTime,
  getUnreadNotificationsCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  type Notification
} from '@/utils/admin'

// Dados mock para demonstração
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'stock',
    title: 'Estoque Baixo',
    message: 'Ração Premium Cães está com apenas 5 unidades em estoque.',
    date: '2024-03-20T10:30:00',
    read: false
  },
  {
    id: '2',
    type: 'order',
    title: 'Novo Pedido',
    message: 'Pedido #12345 foi realizado por João Silva.',
    date: '2024-03-20T09:15:00',
    read: false
  },
  {
    id: '3',
    type: 'alert',
    title: 'Meta Atingida',
    message: 'Meta de vendas do mês foi atingida! Parabéns!',
    date: '2024-03-19T16:45:00',
    read: true
  }
]

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadCount = getUnreadNotificationsCount(notifications)

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <Warning className="text-amber-500" size={20} />
      case 'order':
        return <ShoppingCart className="text-blue-500" size={20} />
      case 'stock':
        return <Package className="text-red-500" size={20} />
      default:
        return <Bell className="text-gray-500" size={20} />
    }
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications(markNotificationAsRead(notifications, id))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(markAllNotificationsAsRead(notifications))
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-text/60 hover:text-text transition-colors rounded-lg hover:bg-background"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-border overflow-hidden z-50">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-medium">Notificações</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Marcar todas como lidas
              </button>
            )}
          </div>

          <div className="divide-y max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-text/60">
                Nenhuma notificação
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 flex gap-3 ${
                    notification.read ? 'bg-white' : 'bg-primary/5'
                  }`}
                >
                  {getIcon(notification.type)}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium">{notification.title}</h4>
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-text/40 hover:text-text/60 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-text/60 mt-1">
                      {notification.message}
                    </p>
                    <span className="text-xs text-text/40 mt-2 block">
                      {formatDateTime(notification.date)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
} 