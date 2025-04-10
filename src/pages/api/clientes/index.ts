import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Cliente } from '../../../models/cliente';

const dbPath = path.join(process.cwd(), 'data/clientes.json');

const ensureDbExists = () => {
  const dirPath = path.dirname(dbPath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([]));
  }
};

const getClientes = (): Cliente[] => {
  ensureDbExists();
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

const saveClientes = (clientes: Cliente[]) => {
  ensureDbExists();
  fs.writeFileSync(dbPath, JSON.stringify(clientes, null, 2));
};

// GET - Listar todos os clientes ou filtrar por email ou telefone
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const clientes = getClientes();
    const { email, telefone, search } = req.query;
    
    if (email) {
      const cliente = clientes.find(c => c.email.toLowerCase() === String(email).toLowerCase());
      return res.status(cliente ? 200 : 404).json(cliente || { error: 'Cliente não encontrado' });
    }
    
    if (telefone) {
      const cliente = clientes.find(c => c.telefone === telefone);
      return res.status(cliente ? 200 : 404).json(cliente || { error: 'Cliente não encontrado' });
    }
    
    if (search) {
      const searchLower = String(search).toLowerCase();
      const filteredClientes = clientes.filter(c => 
        c.nome.toLowerCase().includes(searchLower) || 
        c.email.toLowerCase().includes(searchLower) ||
        c.telefone.includes(String(search))
      );
      return res.status(200).json(filteredClientes);
    }
    
    return res.status(200).json(clientes);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    return res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
};

// POST - Adicionar um novo cliente
export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      nome,
      email,
      telefone,
      endereco,
      cidade,
      estado,
      cep
    } = req.body;
    
    // Validação básica
    if (!nome || !email || !telefone) {
      return res.status(400).json({ error: 'Nome, email e telefone são obrigatórios' });
    }
    
    const clientes = getClientes();
    
    // Verificar se já existe um cliente com o mesmo email
    const clienteExistente = clientes.find(c => c.email.toLowerCase() === email.toLowerCase());
    if (clienteExistente) {
      return res.status(409).json({ error: 'Já existe um cliente cadastrado com este email' });
    }
    
    const novoCliente: Cliente = {
      id: uuidv4(),
      nome,
      email,
      telefone,
      endereco,
      cidade,
      estado,
      cep,
      data_cadastro: new Date().toISOString(),
      total_compras: 0,
      status: 'ativo'
    };
    
    clientes.push(novoCliente);
    saveClientes(clientes);
    
    return res.status(201).json(novoCliente);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    return res.status(500).json({ error: 'Erro ao criar cliente' });
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