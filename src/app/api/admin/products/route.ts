import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Product, Image, Category } from '@/database/models'
import slugify from 'slugify'

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

    const slug = slugify(data.nome, { lower: true })

    const existingProduct = await Product.findOne({
      where: { slug }
    })

    if (existingProduct) {
      return NextResponse.json(
        { error: 'Já existe um produto com este nome' },
        { status: 400 }
      )
    }

    const product = await Product.create({
      ...data,
      slug
    })

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
    const { id, ...updateData } = data

    if (!id) {
      return NextResponse.json(
        { error: 'ID do produto é obrigatório' },
        { status: 400 }
      )
    }

    if (updateData.nome) {
      updateData.slug = slugify(updateData.nome, { lower: true })

      const existingProduct = await Product.findOne({
        where: {
          slug: updateData.slug,
          id: { [Op.ne]: id }
        }
      })

      if (existingProduct) {
        return NextResponse.json(
          { error: 'Já existe um produto com este nome' },
          { status: 400 }
        )
      }
    }

    await Product.update(updateData, {
      where: { id }
    })

    if (data.imagens && Array.isArray(data.imagens)) {
      await Image.destroy({
        where: { productId: id }
      })

      await Image.bulkCreate(
        data.imagens.map((url: string) => ({
          url,
          productId: id
        }))
      )
    }

    const updatedProduct = await Product.findByPk(id, {
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

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID do produto é obrigatório' },
        { status: 400 }
      )
    }

    await Image.destroy({
      where: { productId: id }
    })

    await Product.destroy({
      where: { id }
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