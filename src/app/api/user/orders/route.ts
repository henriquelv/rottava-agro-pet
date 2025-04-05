import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Order, OrderItem, Product, Image } from '@/database/models'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const orders = await Order.findAll({
      where: { userId: session.user.id },
      include: [{
        model: OrderItem,
        include: [{
          model: Product,
          include: [{
            model: Image,
            as: 'imagens'
          }]
        }]
      }],
      order: [['createdAt', 'DESC']]
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar pedidos' },
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

    const { items, total } = await request.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Itens do pedido são obrigatórios' },
        { status: 400 }
      )
    }

    const order = await Order.create({
      userId: session.user.id,
      total,
      status: 'pending'
    })

    await OrderItem.bulkCreate(items.map((item: any) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price
    })))

    return NextResponse.json(order)
  } catch (error) {
    console.error('Erro ao criar pedido:', error)
    return NextResponse.json(
      { error: 'Erro ao criar pedido' },
      { status: 500 }
    )
  }
} 