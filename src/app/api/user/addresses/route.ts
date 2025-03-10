import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { PrismaClient } from '@prisma/client'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      )
    }

    const addresses = await prisma.address.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(addresses)
  } catch (error) {
    console.error('Erro ao buscar endereços:', error)
    return NextResponse.json(
      { message: 'Erro ao buscar endereços' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { street, number, complement, district, city, state, zipCode } = body

    if (!street || !number || !district || !city || !state || !zipCode) {
      return NextResponse.json(
        { message: 'Campos obrigatórios não preenchidos' },
        { status: 400 }
      )
    }

    const address = await prisma.address.create({
      data: {
        street,
        number,
        complement,
        district,
        city,
        state,
        zipCode,
        userId: session.user.id,
      }
    })

    return NextResponse.json(address, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar endereço:', error)
    return NextResponse.json(
      { message: 'Erro ao criar endereço' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const addressId = searchParams.get('id')

    if (!addressId) {
      return NextResponse.json(
        { message: 'ID do endereço não fornecido' },
        { status: 400 }
      )
    }

    const address = await prisma.address.findUnique({
      where: { id: addressId }
    })

    if (!address || address.userId !== session.user.id) {
      return NextResponse.json(
        { message: 'Endereço não encontrado' },
        { status: 404 }
      )
    }

    await prisma.address.delete({
      where: { id: addressId }
    })

    return NextResponse.json({ message: 'Endereço excluído com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir endereço:', error)
    return NextResponse.json(
      { message: 'Erro ao excluir endereço' },
      { status: 500 }
    )
  }
} 