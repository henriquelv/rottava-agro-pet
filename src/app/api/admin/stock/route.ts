import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Product } from '@/database/models'
import { Op } from 'sequelize'
import { sequelize } from '@/lib/sequelize'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const products = await Product.findAll({
      attributes: ['id', 'nome', 'estoque', 'estoqueMinimo'],
      where: {
        estoque: {
          [Op.lte]: sequelize.col('estoqueMinimo')
        }
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Erro ao buscar estoque:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar estoque' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const { id, estoque } = data

    if (!id || estoque === undefined) {
      return NextResponse.json(
        { error: 'ID e estoque são obrigatórios' },
        { status: 400 }
      )
    }

    await Product.update(
      { estoque },
      { where: { id } }
    )

    return NextResponse.json({ message: 'Estoque atualizado com sucesso' })
  } catch (error) {
    console.error('Erro ao atualizar estoque:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar estoque' },
      { status: 500 }
    )
  }
} 