import { NextResponse } from 'next/server'
import { User } from '@/database/models'
import crypto from 'crypto'
import { sendEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    const user = await User.findOne({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 3600000) // 1 hora

    await User.update({
      resetPasswordToken: token,
      resetPasswordExpires: expires
    }, {
      where: { id: user.id }
    })

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`

    await sendEmail({
      to: email,
      subject: 'Redefinição de Senha',
      text: `Para redefinir sua senha, acesse o link: ${resetUrl}`,
      html: `
        <p>Para redefinir sua senha, clique no link abaixo:</p>
        <p><a href="${resetUrl}">Redefinir Senha</a></p>
        <p>Este link é válido por 1 hora.</p>
      `
    })

    return NextResponse.json({ message: 'Email de recuperação enviado' })
  } catch (error) {
    console.error('Erro ao enviar email de recuperação:', error)
    return NextResponse.json(
      { error: 'Erro ao enviar email de recuperação' },
      { status: 500 }
    )
  }
} 