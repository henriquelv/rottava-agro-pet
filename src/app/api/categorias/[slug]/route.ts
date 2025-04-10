import { NextResponse } from 'next/server';
import { logError } from '@/lib/logger';
import path from 'path';
import { promises as fs } from 'fs';

// Interface para tipagem dos produtos
interface Produto {
  codigo: string;
  nome: string;
  slug: string;
  categoria: string;
  descricao: string;
  preco: number;
  preco_promocional?: number;
  imagem: string;
}

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

// Função para buscar produtos do arquivo JSON
async function getProdutos(): Promise<Produto[]> {
  try {
    const filePath = path.join(process.cwd(), 'src/data/produtos.json');
    
    // Verificar se o arquivo existe
    try {
      await fs.access(filePath);
    } catch (error) {
      logError('Arquivo de produtos não encontrado:', error);
      return [];
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
    
    // Buscar todas as categorias
    const categorias = await getCategorias();
    
    // Encontrar a categoria pelo slug
    const categoria = categorias.find(
      (cat) => cat.slug.toLowerCase() === slug.toLowerCase()
    );
    
    if (!categoria) {
      return NextResponse.json(
        { error: 'Categoria não encontrada' },
        { status: 404 }
      );
    }
    
    // Buscar todos os produtos
    const produtos = await getProdutos();
    
    // Filtrar produtos pela categoria
    const produtosDaCategoria = produtos.filter(
      (produto) => produto.categoria.toLowerCase() === categoria.id.toLowerCase()
    );
    
    // Retornar a categoria com seus produtos
    return NextResponse.json({
      ...categoria,
      produtos: produtosDaCategoria,
    });
  } catch (error) {
    logError('Erro ao buscar categoria por slug:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar categoria' },
      { status: 500 }
    );
  }
} 