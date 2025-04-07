import { logInfo, logError } from './logger'

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID
const MAILCHIMP_SERVER = MAILCHIMP_API_KEY?.split('-')[1]

export interface MailchimpContact {
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  tags?: string[]
  customFields?: Record<string, string>
}

export interface MailchimpCampaign {
  type: 'regular' | 'plaintext' | 'absplit' | 'rss' | 'automation'
  recipients: {
    listId: string
    segment?: {
      savedSegmentId?: number
      match?: 'any' | 'all'
      conditions?: Array<{
        conditionType: string
        field: string
        op: string
        value: string
      }>
    }
  }
  settings: {
    subjectLine: string
    previewText?: string
    title: string
    fromName: string
    replyTo: string
    toName?: string
    templateId?: number
  }
}

async function makeMailchimpRequest(endpoint: string, options: RequestInit = {}) {
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_SERVER) {
    throw new Error('Configuração do Mailchimp não encontrada')
  }

  const response = await fetch(
    `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0${endpoint}`,
    {
      ...options,
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Erro na requisição do Mailchimp')
  }

  return response.json()
}

export async function subscribeToMailchimp(contact: MailchimpContact): Promise<boolean> {
  try {
    if (!MAILCHIMP_LIST_ID) {
      throw new Error('ID da lista do Mailchimp não configurado')
    }

    const mergeFields: Record<string, string> = {
      FNAME: contact.firstName || '',
      LNAME: contact.lastName || '',
      PHONE: contact.phone || '',
      ...contact.customFields,
    }

    await makeMailchimpRequest(`/lists/${MAILCHIMP_LIST_ID}/members`, {
      method: 'POST',
      body: JSON.stringify({
        email_address: contact.email,
        status: 'subscribed',
        merge_fields: mergeFields,
        tags: contact.tags || [],
      }),
    })

    logInfo('Inscrição no Mailchimp realizada com sucesso', { email: contact.email })
    return true
  } catch (error) {
    logError('Erro ao inscrever no Mailchimp', { error, contact })
    return false
  }
}

export async function unsubscribeFromMailchimp(email: string): Promise<boolean> {
  try {
    if (!MAILCHIMP_LIST_ID) {
      throw new Error('ID da lista do Mailchimp não configurado')
    }

    const subscriberHash = Buffer.from(email.toLowerCase()).toString('base64')
    
    await makeMailchimpRequest(`/lists/${MAILCHIMP_LIST_ID}/members/${subscriberHash}`, {
      method: 'PATCH',
      body: JSON.stringify({
        status: 'unsubscribed',
      }),
    })

    logInfo('Desinscrição do Mailchimp realizada com sucesso', { email })
    return true
  } catch (error) {
    logError('Erro ao desinscrever do Mailchimp', { error, email })
    return false
  }
}

export async function createCampaign(campaign: MailchimpCampaign): Promise<string> {
  try {
    const response = await makeMailchimpRequest('/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaign),
    })

    logInfo('Campanha do Mailchimp criada com sucesso', { campaignId: response.id })
    return response.id
  } catch (error) {
    logError('Erro ao criar campanha no Mailchimp', { error, campaign })
    throw error
  }
}

export async function sendCampaign(campaignId: string): Promise<boolean> {
  try {
    await makeMailchimpRequest(`/campaigns/${campaignId}/actions/send`, {
      method: 'POST',
    })

    logInfo('Campanha do Mailchimp enviada com sucesso', { campaignId })
    return true
  } catch (error) {
    logError('Erro ao enviar campanha do Mailchimp', { error, campaignId })
    return false
  }
}

export async function getListMembers(listId: string = MAILCHIMP_LIST_ID || ''): Promise<any[]> {
  try {
    if (!listId) {
      throw new Error('ID da lista do Mailchimp não configurado')
    }

    const response = await makeMailchimpRequest(`/lists/${listId}/members`)
    return response.members
  } catch (error) {
    logError('Erro ao obter membros da lista do Mailchimp', { error, listId })
    return []
  }
} 