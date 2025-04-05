import { NextResponse } from 'next/server'
import { Product, Image, Category } from '@/database/models'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await Product.findOne({
      where: { slug: params.slug },
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

    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Erro ao buscar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar produto' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const data = await request.json()

    const product = await Product.findOne({
      where: { slug: params.slug }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    await Product.update(data, {
      where: { id: product.id }
    })

    if (data.imagens && Array.isArray(data.imagens)) {
      await Image.destroy({
        where: { productId: product.id }
      })

      await Image.bulkCreate(
        data.imagens.map((url: string) => ({
          url,
          productId: product.id
        }))
      )
    }

    const updatedProduct = await Product.findByPk(product.id, {
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

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('Erro ao atualizar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar produto' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const product = await Product.findOne({
      where: { slug: params.slug }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    await Image.destroy({
      where: { productId: product.id }
    })

    await Product.destroy({
      where: { id: product.id }
    })

    return NextResponse.json({ message: 'Produto excluído com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir produto:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir produto' },
      { status: 500 }
    )
  }
} 