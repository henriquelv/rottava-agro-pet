import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Aqui você implementará a integração com seu serviço de email
    // Por exemplo: Mailchimp, SendGrid, etc.
    console.log('Email cadastrado:', email)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao cadastrar email:', error)
    return NextResponse.json(
      { error: 'Erro ao cadastrar email' },
      { status: 500 }
    )
  }
} 