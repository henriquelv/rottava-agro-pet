import { logInfo, logError } from './logger'
import { addToQueue } from './queue'
import { addSchema } from './api-docs'

// Configuração do sistema de pagamento
const config = {
  defaultCurrency: 'BRL',
  defaultPaymentMethod: 'credit_card',
  maxInstallments: 12,
  minInstallmentValue: 100,
  paymentMethods: ['credit_card', 'pix', 'boleto'],
  providers: {
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
      publicKey: process.env.STRIPE_PUBLIC_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    },
    pagseguro: {
      email: process.env.PAGSEGURO_EMAIL,
      token: process.env.PAGSEGURO_TOKEN,
      sandbox: process.env.PAGSEGURO_SANDBOX === 'true',
    },
  },
}

// Tipos e interfaces
export type PaymentMethod = typeof config.paymentMethods[number]

export interface PaymentItem {
  id: string
  name: string
  quantity: number
  price: number
}

export interface PaymentData {
  items: PaymentItem[]
  paymentMethod: PaymentMethod
  installments?: number
  customer: {
    name: string
    email: string
    document: string
    phone?: string
  }
  billingAddress?: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
}

export interface PaymentResponse {
  id: string
  status: 'pending' | 'paid' | 'failed' | 'refunded'
  amount: number
  currency: string
  paymentMethod: PaymentMethod
  installments?: number
  createdAt: Date
  updatedAt: Date
}

// Classe de pagamento
export class Payment {
  // Funções de pagamento
  async processPayment(data: PaymentData): Promise<PaymentResponse> {
    try {
      this.validatePaymentData(data)

      const payment = await this.processWithProvider(data)

      // Adiciona job para notificar pagamento
      await addToQueue('notification', {
        type: 'payment_processed',
        data: {
          paymentId: payment.id,
          status: payment.status,
          amount: payment.amount,
        },
      })

      return payment
    } catch (error) {
      logError('Payment processing failed', { error, paymentData: data })
      throw error
    }
  }

  async refundPayment(paymentId: string): Promise<PaymentResponse> {
    try {
      const payment = await this.refundWithProvider(paymentId)

      // Adiciona job para notificar reembolso
      await addToQueue('notification', {
        type: 'payment_refunded',
        data: {
          paymentId: payment.id,
          amount: payment.amount,
        },
      })

      return payment
    } catch (error) {
      logError('Payment refund failed', { error, paymentId })
      throw error
    }
  }

  // Funções auxiliares
  private validatePaymentData(data: PaymentData): void {
    if (!data.items || data.items.length === 0) {
      throw new Error('Nenhum item especificado')
    }

    if (!data.paymentMethod) {
      throw new Error('Método de pagamento não especificado')
    }

    if (!config.paymentMethods.includes(data.paymentMethod)) {
      throw new Error('Método de pagamento inválido')
    }

    if (data.installments) {
      if (data.installments > config.maxInstallments) {
        throw new Error('Número de parcelas excede o limite')
      }

      const totalAmount = data.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
      const installmentValue = totalAmount / data.installments

      if (installmentValue < config.minInstallmentValue) {
        throw new Error('Valor da parcela menor que o mínimo permitido')
      }
    }

    if (!data.customer.name || !data.customer.email || !data.customer.document) {
      throw new Error('Dados do cliente incompletos')
    }
  }

  private async processWithProvider(data: PaymentData): Promise<PaymentResponse> {
    // Implementação real iria processar com o provedor escolhido
    return {
      id: '1',
      status: 'paid',
      amount: data.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      currency: config.defaultCurrency,
      paymentMethod: data.paymentMethod,
      installments: data.installments,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  private async refundWithProvider(paymentId: string): Promise<PaymentResponse> {
    // Implementação real iria reembolsar com o provedor escolhido
    return {
      id: paymentId,
      status: 'refunded',
      amount: 0,
      currency: config.defaultCurrency,
      paymentMethod: 'credit_card',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  // Funções de configuração
  updateConfig(newConfig: Partial<typeof config>) {
    Object.assign(config, newConfig)
    logInfo('Payment config updated', { config })
  }

  getConfig() {
    return { ...config }
  }
}

// Instância padrão
export const payment = new Payment()

// Funções de conveniência
export async function processPayment(data: PaymentData): Promise<PaymentResponse> {
  return payment.processPayment(data)
}

export async function refundPayment(paymentId: string): Promise<PaymentResponse> {
  return payment.refundPayment(paymentId)
}

// Adiciona schemas para documentação
addSchema('PaymentItem', {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    quantity: {
      type: 'integer',
      minimum: 1,
    },
    price: {
      type: 'number',
      minimum: 0,
    },
  },
  required: ['id', 'name', 'quantity', 'price'],
})

addSchema('PaymentData', {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/PaymentItem',
      },
    },
    paymentMethod: {
      type: 'string',
      enum: config.paymentMethods,
    },
    installments: {
      type: 'integer',
      minimum: 1,
      maximum: config.maxInstallments,
    },
    customer: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
          format: 'email',
        },
        document: {
          type: 'string',
        },
        phone: {
          type: 'string',
        },
      },
      required: ['name', 'email', 'document'],
    },
    billingAddress: {
      type: 'object',
      properties: {
        street: {
          type: 'string',
        },
        number: {
          type: 'string',
        },
        complement: {
          type: 'string',
        },
        neighborhood: {
          type: 'string',
        },
        city: {
          type: 'string',
        },
        state: {
          type: 'string',
        },
        zipCode: {
          type: 'string',
        },
      },
      required: ['street', 'number', 'neighborhood', 'city', 'state', 'zipCode'],
    },
  },
  required: ['items', 'paymentMethod', 'customer'],
})

addSchema('PaymentResponse', {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    status: {
      type: 'string',
      enum: ['pending', 'paid', 'failed', 'refunded'],
    },
    amount: {
      type: 'number',
      minimum: 0,
    },
    currency: {
      type: 'string',
    },
    paymentMethod: {
      type: 'string',
      enum: config.paymentMethods,
    },
    installments: {
      type: 'integer',
      minimum: 1,
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: [
    'id',
    'status',
    'amount',
    'currency',
    'paymentMethod',
    'createdAt',
    'updatedAt',
  ],
}) 