import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Interfaces para tipagem
interface Cliente {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
}

interface Produto {
  codigo: string;
  nome: string;
  quantidade: number;
  preco: number;
}

interface Compra {
  id: string;
  data: string;
  cliente: Cliente;
  produtos: Produto[];
  valorTotal: number;
  status: string;
  formaPagamento: string;
}

// Função para ler os dados de compras do arquivo JSON
const getComprasData = (): Compra[] => {
  try {
    const dataPath = path.join(process.cwd(), 'src/data/compras.json');
    
    if (!fs.existsSync(dataPath)) {
      console.warn('Arquivo de compras não encontrado:', dataPath);
      return [];
    }
    
    const fileContent = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Erro ao ler dados de compras:', error);
    return [];
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const email = params.email;
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      );
    }

    const compras = getComprasData();
    
    // Filtra compras pelo email do cliente e ordena por data (mais recente primeiro)
    const filteredCompras = compras
      .filter((compra) => compra.cliente.email.toLowerCase() === email.toLowerCase())
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

    return NextResponse.json(filteredCompras);
  } catch (error) {
    console.error('Erro ao buscar compras:', error);
    return NextResponse.json(
      { error: 'Erro ao processar a requisição' },
      { status: 500 }
    );
  }
} 