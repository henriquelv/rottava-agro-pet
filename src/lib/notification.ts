import { logInfo } from './logger'
import { addNotificationJob } from './queue'

// Tipos de notificação
export type NotificationType =
  | 'order'
  | 'payment'
  | 'shipping'
  | 'account'
  | 'promotion'
  | 'system'

// Prioridades de notificação
export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent'

// Interface para notificação
export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  priority: NotificationPriority
  read: boolean
  createdAt: Date
  data?: Record<string, any>
}

// Templates de notificação
const templates = {
  order: {
    created: (orderId: string) => ({
      title: 'Pedido Criado',
      message: `Seu pedido #${orderId} foi criado com sucesso!`,
    }),
    paid: (orderId: string) => ({
      title: 'Pedido Pago',
      message: `Seu pedido #${orderId} foi confirmado!`,
    }),
    shipped: (orderId: string) => ({
      title: 'Pedido Enviado',
      message: `Seu pedido #${orderId} foi enviado!`,
    }),
    delivered: (orderId: string) => ({
      title: 'Pedido Entregue',
      message: `Seu pedido #${orderId} foi entregue!`,
    }),
  },
  payment: {
    success: (amount: number) => ({
      title: 'Pagamento Confirmado',
      message: `Seu pagamento de R$ ${amount.toFixed(2)} foi confirmado!`,
    }),
    failed: (amount: number) => ({
      title: 'Pagamento Falhou',
      message: `O pagamento de R$ ${amount.toFixed(2)} falhou. Tente novamente.`,
    }),
    refund: (amount: number) => ({
      title: 'Reembolso Efetuado',
      message: `Um reembolso de R$ ${amount.toFixed(2)} foi efetuado.`,
    }),
  },
  shipping: {
    update: (orderId: string, status: string) => ({
      title: 'Atualização de Envio',
      message: `Seu pedido #${orderId} está com status: ${status}`,
    }),
    delay: (orderId: string) => ({
      title: 'Atraso no Envio',
      message: `Seu pedido #${orderId} está com atraso no envio.`,
    }),
  },
  account: {
    welcome: () => ({
      title: 'Bem-vindo!',
      message: 'Bem-vindo à Rottava Agro Pet!',
    }),
    passwordChanged: () => ({
      title: 'Senha Alterada',
      message: 'Sua senha foi alterada com sucesso.',
    }),
    emailVerified: () => ({
      title: 'Email Verificado',
      message: 'Seu email foi verificado com sucesso.',
    }),
  },
  promotion: {
    new: (title: string) => ({
      title: 'Nova Promoção',
      message: `Nova promoção: ${title}`,
    }),
    ending: (title: string) => ({
      title: 'Promoção Terminando',
      message: `A promoção ${title} está terminando em breve!`,
    }),
  },
  system: {
    maintenance: (message: string) => ({
      title: 'Manutenção do Sistema',
      message,
    }),
    update: (message: string) => ({
      title: 'Atualização do Sistema',
      message,
    }),
  },
}

// Funções para criar notificações
export async function createNotification(
  userId: string,
  type: NotificationType,
  template: keyof typeof templates[NotificationType],
  priority: NotificationPriority = 'medium',
  data?: Record<string, any>
) {
  const templateData = templates[type][template](...(data ? Object.values(data) : []))
  
  const notification: Notification = {
    id: Math.random().toString(36).substr(2, 9),
    userId,
    type,
    title: templateData.title,
    message: templateData.message,
    priority,
    read: false,
    createdAt: new Date(),
    data,
  }

  await addNotificationJob({
    userId,
    message: JSON.stringify(notification),
  })

  logInfo('Notification created', { notification })
  return notification
}

// Funções para gerenciar notificações
export async function markAsRead(notificationId: string) {
  logInfo('Notification marked as read', { notificationId })
  // Implementar lógica para marcar notificação como lida
}

export async function deleteNotification(notificationId: string) {
  logInfo('Notification deleted', { notificationId })
  // Implementar lógica para deletar notificação
}

export async function getNotifications(userId: string) {
  logInfo('Notifications retrieved', { userId })
  // Implementar lógica para buscar notificações
  return []
}

export async function getUnreadCount(userId: string) {
  logInfo('Unread notifications count retrieved', { userId })
  // Implementar lógica para contar notificações não lidas
  return 0
}

// Funções para templates
export function getTemplate(
  type: NotificationType,
  template: keyof typeof templates[NotificationType],
  ...args: any[]
) {
  return templates[type][template](...args)
}

export function addTemplate(
  type: NotificationType,
  name: string,
  template: (...args: any[]) => { title: string; message: string }
) {
  templates[type][name as keyof typeof templates[NotificationType]] = template
  logInfo('Template added', { type, name })
}

// Funções para configuração
export function setDefaultPriority(priority: NotificationPriority) {
  logInfo('Default priority set', { priority })
  // Implementar lógica para definir prioridade padrão
}

export function setNotificationPreferences(
  userId: string,
  preferences: Record<NotificationType, boolean>
) {
  logInfo('Notification preferences set', { userId, preferences })
  // Implementar lógica para definir preferências de notificação
}

export function getNotificationPreferences(userId: string) {
  logInfo('Notification preferences retrieved', { userId })
  // Implementar lógica para buscar preferências de notificação
  return {}
} 