import nodemailer from 'nodemailer'
import { logInfo, logError } from './logger'
import { addEmailJob, addToQueue } from './queue'
import { addSchema } from './api-docs'

// Configuração do transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

// Verificar conexão com o servidor SMTP
transporter.verify((error) => {
  if (error) {
    logInfo('SMTP connection failed', { error })
  } else {
    logInfo('SMTP connection established')
  }
})

// Templates de email
const templates = {
  welcome: (name: string) => `
    <h1>Bem-vindo(a) à Rottava Agro Pet!</h1>
    <p>Olá ${name},</p>
    <p>Obrigado por se cadastrar em nossa loja. Estamos felizes em tê-lo(a) conosco!</p>
    <p>Aproveite nossas ofertas e produtos de qualidade.</p>
    <p>Atenciosamente,<br>Equipe Rottava Agro Pet</p>
  `,
  orderConfirmation: (orderId: string, total: number) => `
    <h1>Confirmação de Pedido</h1>
    <p>Seu pedido #${orderId} foi confirmado com sucesso!</p>
    <p>Valor total: R$ ${total.toFixed(2)}</p>
    <p>Acompanhe o status do seu pedido em nossa loja.</p>
    <p>Atenciosamente,<br>Equipe Rottava Agro Pet</p>
  `,
  passwordReset: (token: string) => `
    <h1>Redefinição de Senha</h1>
    <p>Recebemos uma solicitação para redefinir sua senha.</p>
    <p>Clique no link abaixo para criar uma nova senha:</p>
    <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}">Redefinir Senha</a></p>
    <p>Se você não solicitou esta redefinição, ignore este email.</p>
    <p>Atenciosamente,<br>Equipe Rottava Agro Pet</p>
  `,
  newsletter: (content: string) => `
    <h1>Newsletter Rottava Agro Pet</h1>
    ${content}
    <p>Atenciosamente,<br>Equipe Rottava Agro Pet</p>
  `,
}

// Funções para envio de email
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  attachments?: nodemailer.Attachment[]
) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
      attachments,
    })
    logInfo('Email sent', { to, subject, messageId: info.messageId })
    return info
  } catch (error) {
    logInfo('Failed to send email', { error })
    throw error
  }
}

export async function sendWelcomeEmail(name: string, email: string) {
  const html = templates.welcome(name)
  return sendEmail(email, 'Bem-vindo à Rottava Agro Pet', html)
}

export async function sendOrderConfirmationEmail(
  email: string,
  orderId: string,
  total: number
) {
  const html = templates.orderConfirmation(orderId, total)
  return sendEmail(email, 'Confirmação de Pedido', html)
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const html = templates.passwordReset(token)
  return sendEmail(email, 'Redefinição de Senha', html)
}

export async function sendNewsletterEmail(email: string, content: string) {
  const html = templates.newsletter(content)
  return sendEmail(email, 'Newsletter Rottava Agro Pet', html)
}

// Funções para envio de email em lote
export async function sendBulkEmails(
  emails: string[],
  subject: string,
  html: string
) {
  const jobs = emails.map((email) =>
    addEmailJob({
      to: email,
      subject,
      body: html,
    })
  )
  await Promise.all(jobs)
  logInfo('Bulk emails queued', { count: emails.length })
}

export async function sendBulkNewsletter(emails: string[], content: string) {
  const html = templates.newsletter(content)
  await sendBulkEmails(emails, 'Newsletter Rottava Agro Pet', html)
}

// Funções para gerenciamento de email
export async function verifyEmail(email: string) {
  try {
    const info = await transporter.verify()
    logInfo('Email verified', { email, info })
    return true
  } catch (error) {
    logInfo('Email verification failed', { email, error })
    return false
  }
}

export async function getEmailStatus(messageId: string) {
  try {
    const info = await transporter.getSentMessageInfo(messageId)
    logInfo('Email status retrieved', { messageId, info })
    return info
  } catch (error) {
    logInfo('Failed to get email status', { messageId, error })
    throw error
  }
}

// Funções para templates
export function getTemplate(name: keyof typeof templates, ...args: any[]) {
  return templates[name](...args)
}

export function addTemplate(
  name: string,
  template: (...args: any[]) => string
) {
  templates[name as keyof typeof templates] = template
  logInfo('Template added', { name })
}

// Funções para configuração
export function updateSmtpConfig(config: {
  host: string
  port: number
  secure: boolean
  user: string
  pass: string
}) {
  transporter.set('host', config.host)
  transporter.set('port', config.port)
  transporter.set('secure', config.secure)
  transporter.set('auth', {
    user: config.user,
    pass: config.pass,
  })
  logInfo('SMTP config updated', { config })
}

export function getSmtpConfig() {
  return {
    host: transporter.get('host'),
    port: transporter.get('port'),
    secure: transporter.get('secure'),
    user: transporter.get('auth')?.user,
  }
}

// Configuração do sistema de e-mails
const config = {
  defaultFrom: process.env.EMAIL_FROM || 'noreply@rottavaagropet.com.br',
  defaultReplyTo: process.env.EMAIL_REPLY_TO || 'contato@rottavaagropet.com.br',
  providers: {
    sendgrid: {
      apiKey: process.env.SENDGRID_API_KEY,
      from: process.env.SENDGRID_FROM,
    },
    ses: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    },
  },
  templates: {
    welcome: {
      subject: 'Bem-vindo à Rottava Agro Pet',
      template: 'welcome.html',
    },
    orderConfirmation: {
      subject: 'Confirmação de Pedido',
      template: 'order-confirmation.html',
    },
    passwordReset: {
      subject: 'Redefinição de Senha',
      template: 'password-reset.html',
    },
    newsletter: {
      subject: 'Newsletter Rottava Agro Pet',
      template: 'newsletter.html',
    },
  },
}

// Tipos e interfaces
export interface EmailAddress {
  name?: string
  email: string
}

export interface EmailAttachment {
  filename: string
  content: Buffer
  contentType: string
}

export interface EmailData {
  to: EmailAddress | EmailAddress[]
  subject: string
  html: string
  text?: string
  cc?: EmailAddress | EmailAddress[]
  bcc?: EmailAddress | EmailAddress[]
  attachments?: EmailAttachment[]
}

export interface EmailResponse {
  id: string
  status: 'sent' | 'failed'
  to: EmailAddress[]
  subject: string
  sentAt: Date
}

// Classe de e-mails
export class Email {
  // Funções de envio
  async sendEmail(data: EmailData): Promise<EmailResponse> {
    try {
      this.validateEmailData(data)

      const response = await this.sendWithProvider(data)

      // Adiciona job para notificar envio
      await addToQueue('notification', {
        type: 'email_sent',
        data: {
          emailId: response.id,
          to: response.to,
          subject: response.subject,
        },
      })

      return response
    } catch (error) {
      logError('Email sending failed', { error, emailData: data })
      throw error
    }
  }

  async sendTemplate(
    template: keyof typeof config.templates,
    to: EmailAddress | EmailAddress[],
    data: Record<string, any>
  ): Promise<EmailResponse> {
    try {
      const templateConfig = config.templates[template]
      const html = await this.renderTemplate(templateConfig.template, data)

      return this.sendEmail({
        to,
        subject: templateConfig.subject,
        html,
      })
    } catch (error) {
      logError('Template email sending failed', { error, template, to, data })
      throw error
    }
  }

  // Funções auxiliares
  private validateEmailData(data: EmailData): void {
    if (!data.to) {
      throw new Error('Destinatário não especificado')
    }

    if (!data.subject) {
      throw new Error('Assunto não especificado')
    }

    if (!data.html) {
      throw new Error('Conteúdo HTML não especificado')
    }

    if (Array.isArray(data.to)) {
      for (const recipient of data.to) {
        if (!this.isValidEmail(recipient.email)) {
          throw new Error(`Email inválido: ${recipient.email}`)
        }
      }
    } else {
      if (!this.isValidEmail(data.to.email)) {
        throw new Error(`Email inválido: ${data.to.email}`)
      }
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  private async sendWithProvider(data: EmailData): Promise<EmailResponse> {
    // Implementação real iria enviar com o provedor escolhido
    return {
      id: '1',
      status: 'sent',
      to: Array.isArray(data.to) ? data.to : [data.to],
      subject: data.subject,
      sentAt: new Date(),
    }
  }

  private async renderTemplate(template: string, data: Record<string, any>): Promise<string> {
    // Implementação real iria renderizar o template com os dados
    return `<html><body>${JSON.stringify(data)}</body></html>`
  }

  // Funções de configuração
  updateConfig(newConfig: Partial<typeof config>) {
    Object.assign(config, newConfig)
    logInfo('Email config updated', { config })
  }

  getConfig() {
    return { ...config }
  }
}

// Instância padrão
export const email = new Email()

// Funções de conveniência
export async function sendEmail(data: EmailData): Promise<EmailResponse> {
  return email.sendEmail(data)
}

export async function sendTemplate(
  template: keyof typeof config.templates,
  to: EmailAddress | EmailAddress[],
  data: Record<string, any>
): Promise<EmailResponse> {
  return email.sendTemplate(template, to, data)
}

// Adiciona schemas para documentação
addSchema('EmailAddress', {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
  },
  required: ['email'],
})

addSchema('EmailAttachment', {
  type: 'object',
  properties: {
    filename: {
      type: 'string',
    },
    content: {
      type: 'string',
      format: 'binary',
    },
    contentType: {
      type: 'string',
    },
  },
  required: ['filename', 'content', 'contentType'],
})

addSchema('EmailData', {
  type: 'object',
  properties: {
    to: {
      oneOf: [
        {
          $ref: '#/components/schemas/EmailAddress',
        },
        {
          type: 'array',
          items: {
            $ref: '#/components/schemas/EmailAddress',
          },
        },
      ],
    },
    subject: {
      type: 'string',
    },
    html: {
      type: 'string',
    },
    text: {
      type: 'string',
    },
    cc: {
      oneOf: [
        {
          $ref: '#/components/schemas/EmailAddress',
        },
        {
          type: 'array',
          items: {
            $ref: '#/components/schemas/EmailAddress',
          },
        },
      ],
    },
    bcc: {
      oneOf: [
        {
          $ref: '#/components/schemas/EmailAddress',
        },
        {
          type: 'array',
          items: {
            $ref: '#/components/schemas/EmailAddress',
          },
        },
      ],
    },
    attachments: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/EmailAttachment',
      },
    },
  },
  required: ['to', 'subject', 'html'],
})

addSchema('EmailResponse', {
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
      type: 'array',
      items: {
        $ref: '#/components/schemas/EmailAddress',
      },
    },
    subject: {
      type: 'string',
    },
    sentAt: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: ['id', 'status', 'to', 'subject', 'sentAt'],
}) 