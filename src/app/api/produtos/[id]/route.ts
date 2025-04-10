import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Buscar o produto no banco de dados ou fonte de dados pelo ID
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/produtos/${params.id}`);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }
    
    const produto = await response.json();
    return NextResponse.json(produto);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar produto' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    
    // Atualizar o produto no banco de dados
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/produtos/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || 'Erro ao atualizar produto' },
        { status: response.status }
      );
    }
    
    const updatedProduct = await response.json();
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar produto' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Excluir o produto do banco de dados
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/produtos/${params.id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || 'Erro ao excluir produto' },
        { status: response.status }
      );
    }
    
    return NextResponse.json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir produto' },
      { status: 500 }
    );
  }
} 