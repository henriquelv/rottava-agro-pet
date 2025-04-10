import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Produto } from '../../../models/produto';
import { MovimentacaoEstoque } from '../../../models/produto';

const produtosDbPath = path.join(process.cwd(), 'data/produtos.json');
const estoqueDbPath = path.join(process.cwd(), 'data/movimentacoes_estoque.json');

// Garantir que os arquivos existam
const ensureDbExists = () => {
  [path.dirname(produtosDbPath), path.dirname(estoqueDbPath)].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  if (!fs.existsSync(produtosDbPath)) {
    fs.writeFileSync(produtosDbPath, JSON.stringify([]));
  }
  
  if (!fs.existsSync(estoqueDbPath)) {
    fs.writeFileSync(estoqueDbPath, JSON.stringify([]));
  }
};

const getProdutos = (): Produto[] => {
  ensureDbExists();
  const data = fs.readFileSync(produtosDbPath, 'utf8');
  return JSON.parse(data);
};

const saveProdutos = (produtos: Produto[]) => {
  ensureDbExists();
  fs.writeFileSync(produtosDbPath, JSON.stringify(produtos, null, 2));
};

const getMovimentacoes = (): MovimentacaoEstoque[] => {
  ensureDbExists();
  const data = fs.readFileSync(estoqueDbPath, 'utf8');
  return JSON.parse(data);
};

const saveMovimentacoes = (movimentacoes: MovimentacaoEstoque[]) => {
  ensureDbExists();
  fs.writeFileSync(estoqueDbPath, JSON.stringify(movimentacoes, null, 2));
};

// GET - Listar todas as movimentações de estoque ou filtrar por produto
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const movimentacoes = getMovimentacoes();
    const { produto_id } = req.query;
    
    if (produto_id) {
      const filtradas = movimentacoes.filter(m => m.produto_id === produto_id);
      return res.status(200).json(filtradas);
    }
    
    return res.status(200).json(movimentacoes);
  } catch (error) {
    console.error('Erro ao buscar movimentações de estoque:', error);
    return res.status(500).json({ error: 'Erro ao buscar movimentações de estoque' });
  }
};

// POST - Adicionar uma nova movimentação de estoque
export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      produto_id,
      tipo,
      quantidade,
      motivo,
      usuario_id
    } = req.body;
    
    // Validação básica
    if (!produto_id || !tipo || !quantidade || !motivo || !usuario_id) {
      return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
    }
    
    // Verificar se o produto existe
    const produtos = getProdutos();
    const produto = produtos.find(p => p.id === produto_id);
    
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    
    const quantidadeNum = Number(quantidade);
    
    // Verificar se a quantidade é válida
    if (isNaN(quantidadeNum) || quantidadeNum <= 0) {
      return res.status(400).json({ error: 'Quantidade inválida' });
    }
    
    // Verificar se há estoque suficiente para saída
    if (tipo === 'saida' && produto.quantidade_disponivel < quantidadeNum) {
      return res.status(400).json({ error: 'Estoque insuficiente para esta operação' });
    }
    
    // Atualizar o estoque do produto
    const quantidadeAnterior = produto.quantidade_disponivel;
    const quantidadeNova = tipo === 'entrada' 
      ? quantidadeAnterior + quantidadeNum 
      : quantidadeAnterior - quantidadeNum;
    
    // Atualizar o produto
    const produtoIndex = produtos.findIndex(p => p.id === produto_id);
    produtos[produtoIndex] = {
      ...produto,
      quantidade_disponivel: quantidadeNova,
      data_atualizacao: new Date().toISOString()
    };
    
    saveProdutos(produtos);
    
    // Registrar a movimentação
    const movimentacoes = getMovimentacoes();
    const novaMovimentacao: MovimentacaoEstoque = {
      id: uuidv4(),
      produto_id,
      tipo,
      quantidade: quantidadeNum,
      quantidade_anterior: quantidadeAnterior,
      quantidade_nova: quantidadeNova,
      motivo,
      usuario_id,
      data: new Date().toISOString()
    };
    
    movimentacoes.push(novaMovimentacao);
    saveMovimentacoes(movimentacoes);
    
    return res.status(201).json(novaMovimentacao);
  } catch (error) {
    console.error('Erro ao registrar movimentação de estoque:', error);
    return res.status(500).json({ error: 'Erro ao registrar movimentação de estoque' });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch(req.method) {
    case 'GET':
      return GET(req, res);
    case 'POST':
      return POST(req, res);
    default:
      return res.status(405).json({ error: 'Método não permitido' });
  }
} 