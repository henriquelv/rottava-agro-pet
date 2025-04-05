import { NextResponse } from 'next/server';
import { categoryRepository } from '@/database/repositories';

export async function GET() {
  try {
    const categories = await categoryRepository.findWithProducts();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar categorias' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const category = await categoryRepository.create(data);
    return NextResponse.json(category);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    return NextResponse.json(
      { error: 'Erro ao criar categoria' },
      { status: 500 }
    );
  }
} 