import { logInfo, logError } from './logger'
import { addToQueue } from './queue'
import { addSchema } from './api-docs'

// Configuração do sistema de SMS
const config = {
  providers: {
    twilio: {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
      from: process.env.TWILIO_FROM,
    },
    zenvia: {
      apiKey: process.env.ZENVIA_API_KEY,
      from: process.env.ZENVIA_FROM,
    },
  },
  defaultCountryCode: '55',
  maxLength: 160,
  defaultTTL: 3600,
}

// Tipos e interfaces
export interface SMSMessage {
  to: string
  message: string
  from?: string
  ttl?: number
}

export interface SMSResponse {
  id: string
  status: 'sent' | 'failed'
  to: string
  message: string
  sentAt: Date
}

// Classe de SMS
export class SMS {
  // Funções de SMS
  async sendMessage(message: SMSMessage): Promise<SMSResponse> {
    try {
      this.validateMessage(message)

      const response = await this.sendWithProvider(message)

      // Adiciona job para notificar envio
      await addToQueue('notification', {
        type: 'sms_sent',
        data: {
          smsId: response.id,
          to: response.to,
          message: response.message,
        },
      })

      return response
    } catch (error) {
      logError('SMS sending failed', { error, message })
      throw error
    }
  }

  // Funções auxiliares
  private validateMessage(message: SMSMessage): void {
    if (!message.to) {
      throw new Error('Destinatário não especificado')
    }

    if (!message.message) {
      throw new Error('Mensagem não especificada')
    }

    if (message.message.length > config.maxLength) {
      throw new Error(`Mensagem excede o limite de ${config.maxLength} caracteres`)
    }

    if (message.ttl && message.ttl < 0) {
      throw new Error('TTL deve ser maior que 0')
    }

    const phone = this.formatPhoneNumber(message.to)
    if (!this.isValidPhone(phone)) {
      throw new Error(`Número de telefone inválido: ${message.to}`)
    }
  }

  private isValidPhone(phone: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{10,14}$/
    return phoneRegex.test(phone)
  }

  private formatPhoneNumber(phone: string): string {
    // Remove caracteres não numéricos
    const cleaned = phone.replace(/\D/g, '')

    // Adiciona código do país se necessário
    if (!cleaned.startsWith('55')) {
      return `55${cleaned}`
    }

    return cleaned
  }

  private async sendWithProvider(message: SMSMessage): Promise<SMSResponse> {
    // Implementação real iria enviar com o provedor escolhido
    return {
      id: '1',
      status: 'sent',
      to: this.formatPhoneNumber(message.to),
      message: message.message,
      sentAt: new Date(),
    }
  }

  // Funções de configuração
  updateConfig(newConfig: Partial<typeof config>) {
    Object.assign(config, newConfig)
    logInfo('SMS config updated', { config })
  }

  getConfig() {
    return { ...config }
  }
}

// Instância padrão
export const sms = new SMS()

// Funções de conveniência
export async function sendMessage(message: SMSMessage): Promise<SMSResponse> {
  return sms.sendMessage(message)
}

// Adiciona schemas para documentação
addSchema('SMSMessage', {
  type: 'object',
  properties: {
    to: {
      type: 'string',
    },
    message: {
      type: 'string',
      maxLength: 160,
    },
    from: {
      type: 'string',
    },
    ttl: {
      type: 'integer',
      minimum: 0,
    },
  },
  required: ['to', 'message'],
})

addSchema('SMSResponse', {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    status: {
      type: 'string',
      enum: ['sent', 'failed'],
    },
    to: {
      type: 'string',
    },
    message: {
      type: 'string',
    },
    sentAt: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: ['id', 'status', 'to', 'message', 'sentAt'],
}) 