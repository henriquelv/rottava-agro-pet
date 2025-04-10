import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Pedido } from '../../../models/pedido';

const dbPath = path.join(process.cwd(), 'data/pedidos.json');

const getPedidos = (): Pedido[] => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const savePedidos = (pedidos: Pedido[]) => {
  const dirPath = path.dirname(dbPath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(dbPath, JSON.stringify(pedidos, null, 2));
};

// GET - Obter um pedido específico
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const pedidos = getPedidos();
    
    const pedido = pedidos.find(p => p.id === id);
    
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    
    return res.status(200).json(pedido);
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    return res.status(500).json({ error: 'Erro ao buscar pedido' });
  }
};

// PUT - Atualizar um pedido (geralmente para atualizar o status)
export const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const pedidos = getPedidos();
    
    const index = pedidos.findIndex(p => p.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    
    const pedidoExistente = pedidos[index];
    
    const {
      status,
      codigo_rastreio
    } = req.body;
    
    // Validações específicas de status
    if (status && !['pendente', 'aprovado', 'enviado', 'entregue', 'cancelado'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }
    
    const pedidoAtualizado: Pedido = {
      ...pedidoExistente,
      status: status || pedidoExistente.status,
      codigo_rastreio: codigo_rastreio !== undefined ? codigo_rastreio : pedidoExistente.codigo_rastreio,
      data_atualizacao: new Date().toISOString()
    };
    
    pedidos[index] = pedidoAtualizado;
    savePedidos(pedidos);
    
    return res.status(200).json(pedidoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);
    return res.status(500).json({ error: 'Erro ao atualizar pedido' });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch(req.method) {
    case 'GET':
      return GET(req, res);
    case 'PUT':
      return PUT(req, res);
    default:
      return res.status(405).json({ error: 'Método não permitido' });
  }
} 