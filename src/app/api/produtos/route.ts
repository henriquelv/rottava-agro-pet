import { NextResponse } from 'next/server'
import { productRepository } from '@/database/repositories'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoria')
    const promotional = searchParams.get('promocional')

    let products

    if (categoryId) {
      products = await productRepository.findByCategory(categoryId)
    } else if (promotional === 'true') {
      products = await productRepository.findPromotional()
    } else {
      products = await productRepository.findAll({
        include: ['images', 'category'],
      })
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar produtos' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const product = await productRepository.create(data)
    return NextResponse.json(product)
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao criar produto' },
      { status: 500 }
    )
  }
} 