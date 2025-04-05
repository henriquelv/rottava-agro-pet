import { NextResponse } from 'next/server';
import { orderRepository } from '@/database/repositories';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const order = await orderRepository.findById(data.orderId);

    if (!order) {
      return NextResponse.json(
        { error: 'Pedido não encontrado' },
        { status: 404 }
      );
    }

    if (order.userId !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const item = await order.createItem({
      productId: data.productId,
      quantity: data.quantity,
      price: data.price,
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error('Erro ao criar item do pedido:', error);
    return NextResponse.json(
      { error: 'Erro ao criar item do pedido' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const itemId = searchParams.get('itemId');

    if (!orderId || !itemId) {
      return NextResponse.json(
        { error: 'ID do pedido e do item são obrigatórios' },
        { status: 400 }
      );
    }

    const order = await orderRepository.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { error: 'Pedido não encontrado' },
        { status: 404 }
      );
    }

    if (order.userId !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    await order.destroyItem(itemId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar item do pedido:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar item do pedido' },
      { status: 500 }
    );
  }
} 