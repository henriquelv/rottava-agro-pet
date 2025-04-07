import { logInfo, logError } from './logger'

const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER
const WHATSAPP_API_KEY = process.env.WHATSAPP_API_KEY
const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL

export interface WhatsAppMessage {
  to: string
  message: string
  mediaUrl?: string
  type?: 'text' | 'image' | 'document' | 'audio' | 'video'
}

export function formatWhatsAppNumber(number: string): string {
  if (!number) {
    throw new Error('Número de telefone não fornecido')
  }
  
  // Remove todos os caracteres não numéricos
  const cleaned = number.replace(/\D/g, '')
  
  // Verifica se o número tem o formato correto
  if (cleaned.length < 10 || cleaned.length > 15) {
    throw new Error('Número de telefone inválido')
  }
  
  return cleaned
}

export function getWhatsAppUrl(number: string, message?: string): string {
  try {
    const formattedNumber = formatWhatsAppNumber(number)
    const baseUrl = `https://wa.me/${formattedNumber}`
    
    if (message) {
      return `${baseUrl}?text=${encodeURIComponent(message)}`
    }
    
    return baseUrl
  } catch (error) {
    logError('Erro ao gerar URL do WhatsApp', { error, number })
    throw error
  }
}

export async function sendWhatsAppMessage(data: WhatsAppMessage): Promise<boolean> {
  try {
    if (!WHATSAPP_API_KEY || !WHATSAPP_API_URL) {
      throw new Error('Configuração do WhatsApp não encontrada')
    }

    const formattedNumber = formatWhatsAppNumber(data.to)
    
    const response = await fetch(WHATSAPP_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: formattedNumber,
        message: data.message,
        mediaUrl: data.mediaUrl,
        type: data.type || 'text',
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Erro ao enviar mensagem')
    }

    logInfo('Mensagem do WhatsApp enviada com sucesso', { to: formattedNumber })
    return true
  } catch (error) {
    logError('Erro ao enviar mensagem do WhatsApp', { error, data })
    return false
  }
}

export function openWhatsAppChat(number: string, message?: string): void {
  try {
    if (!WHATSAPP_NUMBER) {
      throw new Error('Número do WhatsApp não configurado')
    }

    const url = getWhatsAppUrl(number, message)
    window.open(url, '_blank')
    logInfo('Chat do WhatsApp aberto', { number })
  } catch (error) {
    logError('Erro ao abrir chat do WhatsApp', { error, number })
  }
}

export function validateWhatsAppNumber(number: string): boolean {
  try {
    formatWhatsAppNumber(number)
    return true
  } catch {
    return false
  }
} 