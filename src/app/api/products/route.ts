import { NextResponse } from 'next/server'
import { Product, Image, Category } from '@/database/models'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Op } from 'sequelize'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    const query = searchParams.get('q')

    const where: any = {
      disponivel: true
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (query) {
      where.nome = {
        [Op.iLike]: `%${query}%`
      }
    }

    const products = await Product.findAll({
      where,
      include: [
        {
          model: Image,
          as: 'imagens'
        },
        {
          model: Category,
          as: 'categoria'
        }
      ],
      order: [['createdAt', 'DESC']]
    })

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
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const data = await request.json()

    if (!data.nome || !data.preco || !data.categoryId) {
      return NextResponse.json(
        { error: 'Nome, preço e categoria são obrigatórios' },
        { status: 400 }
      )
    }

    const product = await Product.create(data)

    if (data.imagens && Array.isArray(data.imagens)) {
      await Image.bulkCreate(
        data.imagens.map((url: string) => ({
          url,
          productId: product.id
        }))
      )
    }

    const productWithRelations = await Product.findByPk(product.id, {
      include: [
        {
          model: Image,
          as: 'imagens'
        },
        {
          model: Category,
          as: 'categoria'
        }
      ]
    })

    return NextResponse.json(productWithRelations)
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao criar produto' },
      { status: 500 }
    )
  }
} 