import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { logError } from '@/lib/logger';

interface Produto {
  codigo: string;
  nome: string;
  slug: string;
  categoria: string;
  preco: number;
  descricao: string;
  imagem: string;
}

// Função para buscar produtos do arquivo JSON
async function getProdutos(): Promise<Produto[]> {
  try {
    const filePath = path.join(process.cwd(), 'src/data/produtos.json');
    
    // Verificar se o arquivo existe
    try {
      await fs.access(filePath);
    } catch (error) {
      throw new Error('Arquivo de produtos não encontrado');
    }
    
    // Ler o arquivo
    const jsonData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    logError('Erro ao ler produtos do arquivo:', error);
    return [];
  }
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug do produto não fornecido' },
        { status: 400 }
      );
    }
    
    const produtos = await getProdutos();
    
    // Procurar produto pelo slug ou código
    const produto = produtos.find(
      (p) => p.slug === slug || p.codigo === slug
    );
    
    if (!produto) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }
    
    // Retornar o produto encontrado
    return NextResponse.json(produto);
  } catch (error) {
    logError('Erro ao buscar produto por slug:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar produto' },
      { status: 500 }
    );
  }
}
