import { logInfo, logError } from './logger'
import { addToQueue } from './queue'
import { addSchema } from './api-docs'

// Configuração do sistema de push
const config = {
  providers: {
    firebase: {
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    },
    onesignal: {
      appId: process.env.ONESIGNAL_APP_ID,
      apiKey: process.env.ONESIGNAL_API_KEY,
    },
  },
  defaultIcon: 'https://rottavaagropet.com.br/logo.png',
  defaultSound: 'default',
  defaultBadge: 1,
  defaultPriority: 'high',
  defaultTTL: 3600,
}

// Tipos e interfaces
export interface PushNotification {
  title: string
  body: string
  data?: Record<string, any>
  icon?: string
  sound?: string
  badge?: number
  priority?: 'high' | 'normal' | 'low'
  ttl?: number
}

export interface PushRecipient {
  token: string
  platform: 'ios' | 'android' | 'web'
}

export interface PushResponse {
  id: string
  status: 'sent' | 'failed'
  recipients: PushRecipient[]
  notification: PushNotification
  sentAt: Date
}

// Classe de push
export class Push {
  // Funções de push
  async sendNotification(
    notification: PushNotification,
    recipients: PushRecipient | PushRecipient[]
  ): Promise<PushResponse> {
    try {
      this.validateNotification(notification)
      this.validateRecipients(recipients)

      const response = await this.sendWithProvider(notification, recipients)

      // Adiciona job para notificar envio
      await addToQueue('notification', {
        type: 'push_sent',
        data: {
          pushId: response.id,
          recipients: response.recipients,
          notification: response.notification,
        },
      })

      return response
    } catch (error) {
      logError('Push notification sending failed', { error, notification, recipients })
      throw error
    }
  }

  // Funções auxiliares
  private validateNotification(notification: PushNotification): void {
    if (!notification.title) {
      throw new Error('Título não especificado')
    }

    if (!notification.body) {
      throw new Error('Corpo não especificado')
    }

    if (notification.ttl && notification.ttl < 0) {
      throw new Error('TTL deve ser maior que 0')
    }

    if (notification.badge && notification.badge < 0) {
      throw new Error('Badge deve ser maior que 0')
    }
  }

  private validateRecipients(recipients: PushRecipient | PushRecipient[]): void {
    const recipientsArray = Array.isArray(recipients) ? recipients : [recipients]

    if (recipientsArray.length === 0) {
      throw new Error('Nenhum destinatário especificado')
    }

    for (const recipient of recipientsArray) {
      if (!recipient.token) {
        throw new Error('Token não especificado')
      }

      if (!recipient.platform) {
        throw new Error('Plataforma não especificada')
      }

      if (!['ios', 'android', 'web'].includes(recipient.platform)) {
        throw new Error(`Plataforma inválida: ${recipient.platform}`)
      }
    }
  }

  private async sendWithProvider(
    notification: PushNotification,
    recipients: PushRecipient | PushRecipient[]
  ): Promise<PushResponse> {
    // Implementação real iria enviar com o provedor escolhido
    return {
      id: '1',
      status: 'sent',
      recipients: Array.isArray(recipients) ? recipients : [recipients],
      notification: {
        ...notification,
        icon: notification.icon || config.defaultIcon,
        sound: notification.sound || config.defaultSound,
        badge: notification.badge || config.defaultBadge,
        priority: notification.priority || config.defaultPriority,
        ttl: notification.ttl || config.defaultTTL,
      },
      sentAt: new Date(),
    }
  }

  // Funções de configuração
  updateConfig(newConfig: Partial<typeof config>) {
    Object.assign(config, newConfig)
    logInfo('Push config updated', { config })
  }

  getConfig() {
    return { ...config }
  }
}

// Instância padrão
export const push = new Push()

// Funções de conveniência
export async function sendNotification(
  notification: PushNotification,
  recipients: PushRecipient | PushRecipient[]
): Promise<PushResponse> {
  return push.sendNotification(notification, recipients)
}

// Adiciona schemas para documentação
addSchema('PushNotification', {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    body: {
      type: 'string',
    },
    data: {
      type: 'object',
      additionalProperties: true,
    },
    icon: {
      type: 'string',
    },
    sound: {
      type: 'string',
    },
    badge: {
      type: 'integer',
      minimum: 0,
    },
    priority: {
      type: 'string',
      enum: ['high', 'normal', 'low'],
    },
    ttl: {
      type: 'integer',
      minimum: 0,
    },
  },
  required: ['title', 'body'],
})

addSchema('PushRecipient', {
  type: 'object',
  properties: {
    token: {
      type: 'string',
    },
    platform: {
      type: 'string',
      enum: ['ios', 'android', 'web'],
    },
  },
  required: ['token', 'platform'],
})

addSchema('PushResponse', {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    status: {
      type: 'string',
      enum: ['sent', 'failed'],
    },
    recipients: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/PushRecipient',
      },
    },
    notification: {
      $ref: '#/components/schemas/PushNotification',
    },
    sentAt: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: ['id', 'status', 'recipients', 'notification', 'sentAt'],
}) 