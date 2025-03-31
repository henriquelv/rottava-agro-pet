import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Criar movimento de estoque
    const stockMovement = await prisma.stockMovement.create({
      data: {
        productId: data.productId,
        type: data.type,
        quantity: data.quantity,
        reason: data.reason
      }
    })
    
    // Atualizar estoque do produto
    const product = await prisma.product.findUnique({
      where: { id: data.productId }
    })
    
    if (!product) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 })
    }
    
    const newStock = data.type === 'in' 
      ? product.stock + data.quantity 
      : product.stock - data.quantity
    
    await prisma.product.update({
      where: { id: data.productId },
      data: { stock: newStock }
    })
    
    return NextResponse.json(stockMovement)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao registrar movimento de estoque' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')
    
    const stockMovements = await prisma.stockMovement.findMany({
      where: productId ? { productId } : undefined,
      include: {
        product: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(stockMovements)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar movimentos de estoque' }, { status: 500 })
  }
} 