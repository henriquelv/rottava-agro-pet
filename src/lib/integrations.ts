import { FacebookLogo, InstagramLogo, TwitterLogo, YoutubeLogo } from '@phosphor-icons/react'
import { logInfo } from './logger'
import { initializeTawk } from './tawk'
import { sendWhatsAppMessage as sendWhatsApp } from './whatsapp'

// Configurações das redes sociais
export const socialMedia = {
  facebook: {
    url: 'https://facebook.com/rottavaagropet',
    icon: FacebookLogo,
    name: 'Facebook'
  },
  instagram: {
    url: 'https://instagram.com/rottavaagropet',
    icon: InstagramLogo,
    name: 'Instagram'
  },
  twitter: {
    url: 'https://twitter.com/rottavaagropet',
    icon: TwitterLogo,
    name: 'Twitter'
  },
  youtube: {
    url: 'https://youtube.com/rottavaagropet',
    icon: YoutubeLogo,
    name: 'YouTube'
  }
}

// Configuração do WhatsApp
export const whatsapp = {
  number: process.env.WHATSAPP_NUMBER || '+5511999999999',
  message: 'Olá, gostaria de mais informações sobre os produtos.'
}

// Configuração do chat online
export const chat = {
  enabled: true,
  provider: 'tawk.to',
  id: process.env.NEXT_PUBLIC_TAWK_TO_ID
}

// Configuração da newsletter
export const newsletter = {
  enabled: true,
  provider: 'mailchimp',
  apiKey: process.env.MAILCHIMP_API_KEY,
  listId: process.env.MAILCHIMP_LIST_ID
}

// Função para compartilhar nas redes sociais
export function shareOnSocialMedia(platform: keyof typeof socialMedia, url: string, title: string) {
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    whatsapp: `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(`${title} ${url}`)}`
  }

  if (platform in shareUrls) {
    window.open(shareUrls[platform], '_blank')
    logInfo(`Shared on ${platform}`, { url, title })
  }
}

// Função para enviar newsletter
export async function subscribeToNewsletter(email: string) {
  try {
    const response = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })

    if (!response.ok) {
      throw new Error('Failed to subscribe to newsletter')
    }

    logInfo('Subscribed to newsletter', { email })
    return true
  } catch (error) {
    logInfo('Failed to subscribe to newsletter', { email, error })
    return false
  }
}

// Função para iniciar chat
export function startChat() {
  if (chat.enabled && chat.provider === 'tawk.to') {
    initializeTawk()
    // @ts-ignore
    window.Tawk_API?.maximize()
    logInfo('Chat started')
  }
}

// Função para enviar mensagem no WhatsApp
export function sendWhatsAppMessage(message?: string) {
  sendWhatsApp(message || whatsapp.message)
}

// Função para compartilhar produto
export function shareProduct(product: { name: string; url: string }) {
  if (navigator.share) {
    navigator.share({
      title: product.name,
      url: product.url
    }).then(() => {
      logInfo('Product shared', product)
    }).catch((error) => {
      logInfo('Failed to share product', { product, error })
    })
  } else {
    // Fallback para redes sociais
    shareOnSocialMedia('facebook', product.url, product.name)
  }
}

export const socialMediaIcons = {
  facebook: FacebookLogo,
  instagram: InstagramLogo,
  twitter: TwitterLogo,
  youtube: YoutubeLogo
}

export const socialMediaLinks = {
  facebook: 'https://facebook.com/rottavaagropet',
  instagram: 'https://instagram.com/rottavaagropet',
  twitter: 'https://twitter.com/rottavaagropet',
  youtube: 'https://youtube.com/rottavaagropet'
} 