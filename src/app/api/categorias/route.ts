import { NextResponse } from 'next/server';
import { logError } from '@/lib/logger';
import path from 'path';
import { promises as fs } from 'fs';

// Interface para tipagem das categorias
interface Categoria {
  id: string;
  nome: string;
  slug: string;
  descricao: string;
  imagem: string;
}

// Função para buscar categorias do arquivo JSON
async function getCategorias(): Promise<Categoria[]> {
  try {
    const filePath = path.join(process.cwd(), 'src/data/categorias.json');
    
    // Verificar se o arquivo existe
    try {
      await fs.access(filePath);
    } catch (error) {
      logError('Arquivo de categorias não encontrado:', error);
      return [];
    }
    
    // Ler o arquivo
    const jsonData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    logError('Erro ao ler categorias do arquivo:', error);
    return [];
  }
}

export async function GET() {
  try {
    // Buscar todas as categorias
    const categorias = await getCategorias();
    
    return NextResponse.json(categorias);
  } catch (error) {
    logError('Erro ao buscar categorias:', error);
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