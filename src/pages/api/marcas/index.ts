import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Marca } from '../../../models/produto';

const dbPath = path.join(process.cwd(), 'data/marcas.json');

const ensureDbExists = () => {
  const dirPath = path.dirname(dbPath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([]));
  }
};

const getMarcas = (): Marca[] => {
  ensureDbExists();
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

const saveMarcas = (marcas: Marca[]) => {
  ensureDbExists();
  fs.writeFileSync(dbPath, JSON.stringify(marcas, null, 2));
};

// Função para criar slug a partir do nome
const createSlug = (nome: string): string => {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
};

// GET - Listar todas as marcas
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const marcas = getMarcas();
    return res.status(200).json(marcas);
  } catch (error) {
    console.error('Erro ao buscar marcas:', error);
    return res.status(500).json({ error: 'Erro ao buscar marcas' });
  }
};

// POST - Adicionar uma nova marca
export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { nome } = req.body;
    
    // Validação básica
    if (!nome) {
      return res.status(400).json({ error: 'Nome da marca é obrigatório' });
    }
    
    const marcas = getMarcas();
    
    // Verificar se já existe uma marca com o mesmo nome
    const existente = marcas.find(c => c.nome.toLowerCase() === nome.toLowerCase());
    if (existente) {
      return res.status(409).json({ error: 'Já existe uma marca com este nome' });
    }
    
    const slug = createSlug(nome);
    
    const novaMarca: Marca = {
      id: uuidv4(),
      nome,
      slug
    };
    
    marcas.push(novaMarca);
    saveMarcas(marcas);
    
    return res.status(201).json(novaMarca);
  } catch (error) {
    console.error('Erro ao criar marca:', error);
    return res.status(500).json({ error: 'Erro ao criar marca' });
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