import { NextResponse } from 'next/server'
import { User } from '@/database/models'
import bcrypt from 'bcryptjs'
import { Op } from 'sequelize'

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token e senha são obrigatórios' },
        { status: 400 }
      )
    }

    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          [Op.gt]: new Date()
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Token inválido ou expirado' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.update({
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null
    }, {
      where: { id: user.id }
    })

    return NextResponse.json({ message: 'Senha atualizada com sucesso' })
  } catch (error) {
    console.error('Erro ao redefinir senha:', error)
    return NextResponse.json(
      { error: 'Erro ao redefinir senha' },
      { status: 500 }
    )
  }
} 