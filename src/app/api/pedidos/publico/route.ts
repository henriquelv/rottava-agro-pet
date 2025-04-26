import { NextResponse } from 'next/server';
import { logError, logInfo } from '@/lib/logger';
import path from 'path';
import { promises as fs } from 'fs';

// Definir interfaces para tipagem
interface Endereco {
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface Cliente {
  nome: string;
  email: string;
  telefone: string;
  endereco: Endereco;
}

interface Produto {
  id: string;
  nome: string;
  quantidade: number;
  preco: number;
}

interface Pedido {
  orderId: string;
  cliente: Cliente;
  produtos: Produto[];
  total: number;
  tipoPagamento: string;
  paymentId: string;
  status: string;
  data: string;
}

// Função para buscar pedidos do arquivo JSON
async function getPedidos(): Promise<Pedido[]> {
  try {
    const filePath = path.join(process.cwd(), 'src/data/pedidos.json');
    
    // Verificar se o arquivo existe
    try {
      await fs.access(filePath);
    } catch (error) {
      // Se o arquivo não existe, criar um arquivo vazio com array
      await fs.writeFile(filePath, JSON.stringify([]));
      return [];
    }
    
    // Ler o arquivo
    const jsonData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    logError('Erro ao ler pedidos do arquivo:', error);
    return [];
  }
}

// Função para salvar pedidos no arquivo JSON
async function salvarPedidos(pedidos: Pedido[]): Promise<void> {
  try {
    const filePath = path.join(process.cwd(), 'src/data/pedidos.json');
    
    // Garantir que o diretório existe
    const dirPath = path.join(process.cwd(), 'src/data');
    try {
      await fs.access(dirPath);
    } catch (error) {
      await fs.mkdir(dirPath, { recursive: true });
    }
    
    // Salvar dados no arquivo
    await fs.writeFile(filePath, JSON.stringify(pedidos, null, 2));
  } catch (error) {
    logError('Erro ao salvar pedidos no arquivo:', error);
    throw new Error('Falha ao salvar dados de pedidos');
  }
}

export async function POST(request: Request) {
  try {
    // Verificar se o corpo da requisição tem o formato esperado
    const data = await request.json();
    
    if (!data.orderId || !data.cliente || !data.produtos || !data.total) {
      return NextResponse.json(
        { error: 'Dados incompletos do pedido' },
        { status: 400 }
      );
    }
    
    // Validar cliente
    if (!data.cliente.nome || !data.cliente.email) {
      return NextResponse.json(
        { error: 'Dados do cliente incompletos' },
        { status: 400 }
      );
    }
    
    // Formatar o pedido para salvar
    const novoPedido: Pedido = {
      orderId: data.orderId,
      cliente: data.cliente,
      produtos: data.produtos,
      total: data.total,
      tipoPagamento: data.tipoPagamento,
      paymentId: data.paymentId,
      status: data.status || 'pendente',
      data: data.data || new Date().toISOString()
    };
    
    // Buscar pedidos existentes
    const pedidosAtuais = await getPedidos();
    
    // Adicionar novo pedido
    pedidosAtuais.push(novoPedido);
    
    // Salvar no arquivo
    await salvarPedidos(pedidosAtuais);
    
    // Registrar log
    logInfo('Novo pedido público criado', { 
      orderId: novoPedido.orderId,
      cliente: novoPedido.cliente.email,
      tipoPagamento: novoPedido.tipoPagamento,
      total: novoPedido.total
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Pedido criado com sucesso',
      orderId: novoPedido.orderId
    });
  } catch (error) {
    logError('Erro ao processar pedido público:', error);
    return NextResponse.json(
      { error: 'Erro ao processar pedido' },
      { status: 500 }
    );
  }
}

// API para consultar pedidos por email
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email não fornecido' },
        { status: 400 }
      );
    }
    
    // Buscar todos os pedidos
    const pedidos = await getPedidos();
    
    // Filtrar pedidos pelo email do cliente
    const pedidosDoCliente = pedidos.filter(
      pedido => pedido.cliente.email.toLowerCase() === email.toLowerCase()
    );
    
    // Ordenar pedidos por data (mais recentes primeiro)
    pedidosDoCliente.sort((a, b) => 
      new Date(b.data).getTime() - new Date(a.data).getTime()
    );
    
    return NextResponse.json(pedidosDoCliente);
  } catch (error) {
    logError('Erro ao buscar pedidos por email:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar pedidos' },
      { status: 500 }
    );
  }
} 