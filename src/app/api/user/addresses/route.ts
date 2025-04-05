import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Address } from '@/database/models'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const addresses = await Address.findAll({
      where: { userId: session.user.id },
      order: [['createdAt', 'DESC']]
    })

    return NextResponse.json(addresses)
  } catch (error) {
    console.error('Erro ao buscar endereços:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar endereços' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const data = await request.json()

    if (!data.cep || !data.logradouro || !data.numero || !data.bairro || !data.cidade || !data.estado) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    const address = await Address.create({
      ...data,
      userId: session.user.id
    })

    return NextResponse.json(address)
  } catch (error) {
    console.error('Erro ao criar endereço:', error)
    return NextResponse.json(
      { error: 'Erro ao criar endereço' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const { id, ...updateData } = data

    if (!id) {
      return NextResponse.json(
        { error: 'ID do endereço é obrigatório' },
        { status: 400 }
      )
    }

    const address = await Address.findOne({
      where: {
        id,
        userId: session.user.id
      }
    })

    if (!address) {
      return NextResponse.json(
        { error: 'Endereço não encontrado' },
        { status: 404 }
      )
    }

    await Address.update(updateData, {
      where: { id }
    })

    return NextResponse.json({ message: 'Endereço atualizado com sucesso' })
  } catch (error) {
    console.error('Erro ao atualizar endereço:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar endereço' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID do endereço é obrigatório' },
        { status: 400 }
      )
    }

    const address = await Address.findOne({
      where: {
        id,
        userId: session.user.id
      }
    })

    if (!address) {
      return NextResponse.json(
        { error: 'Endereço não encontrado' },
        { status: 404 }
      )
    }

    await Address.destroy({
      where: { id }
    })

    return NextResponse.json({ message: 'Endereço excluído com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir endereço:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir endereço' },
      { status: 500 }
    )
  }
} 
} 