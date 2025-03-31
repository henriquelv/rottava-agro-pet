import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        stockMovements: true,
        orderItems: true
      }
    })
    
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        compareAtPrice: data.compareAtPrice,
        images: data.images,
        category: data.category,
        brand: data.brand,
        tags: data.tags,
        stock: data.stock,
        minStock: data.minStock,
        status: data.status
      }
    })
    
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar produto' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    
    const product = await prisma.product.update({
      where: { id: data.id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        compareAtPrice: data.compareAtPrice,
        images: data.images,
        category: data.category,
        brand: data.brand,
        tags: data.tags,
        stock: data.stock,
        minStock: data.minStock,
        status: data.status
      }
    })
    
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar produto' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID não fornecido' }, { status: 400 })
    }
    
    await prisma.product.delete({
      where: { id }
    })
    
    return NextResponse.json({ message: 'Produto deletado com sucesso' })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar produto' }, { status: 500 })
  }
} 