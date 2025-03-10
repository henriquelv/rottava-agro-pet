import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { message: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Por segurança, não informamos se o email existe ou não
      return NextResponse.json(
        { message: 'Se o email existir, você receberá as instruções em breve' },
        { status: 200 }
      )
    }

    // Gera um token único
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hora

    // Atualiza o usuário com o token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry
      }
    })

    // TODO: Implementar o envio de email
    // Por enquanto, apenas simula o envio
    console.log('Email de recuperação enviado para:', email)
    console.log('Token:', resetToken)

    return NextResponse.json({
      message: 'Se o email existir, você receberá as instruções em breve'
    })
  } catch (error) {
    console.error('Erro ao processar recuperação de senha:', error)
    return NextResponse.json(
      { message: 'Erro ao processar sua solicitação' },
      { status: 500 }
    )
  }
} 