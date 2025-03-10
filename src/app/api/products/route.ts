import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true,
        variants: true,
      },
    })

    // Dividir as tags em uma lista de strings
    const productsWithTags = products.map(product => ({
      ...product,
      tags: product.tags.split(',').map(tag => tag.trim()),
    }))

    return NextResponse.json(productsWithTags)
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar produtos' },
      { status: 500 }
    )
  }
} 