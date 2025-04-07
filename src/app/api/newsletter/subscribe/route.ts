import { NextResponse } from 'next/server'
import { logInfo } from '@/lib/logger'
import { subscribeToMailchimp } from '@/lib/mailchimp'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    const success = await subscribeToMailchimp(email)

    if (!success) {
      return NextResponse.json(
        { error: 'Erro ao processar inscrição' },
        { status: 500 }
      )
    }

    logInfo('Newsletter subscription', { email })

    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch (error) {
    logInfo('Newsletter subscription error', { error })
    return NextResponse.json(
      { error: 'Erro ao processar inscrição' },
      { status: 500 }
    )
  }
} 