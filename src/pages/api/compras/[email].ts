import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

interface Cliente {
  nome: string
  email: string
  telefone: string
  areaEntrega: string
}

interface Produto {
  id: string
  nome: string
  preco: number
  precoPromocao?: number
  promocao: boolean
  imagem: string
  quantidade: number
}

interface Compra {
  id: string
  data: string
  cliente: Cliente
  produtos: Produto[]
}

// Função para buscar os dados de compras do arquivo JSON
const getComprasData = (): Compra[] => {
  const filePath = path.join(process.cwd(), 'src/data/compras.json')
  
  // Verifica se o arquivo existe
  if (!fs.existsSync(filePath)) {
    // Se não existir, cria o diretório e arquivo com array vazio
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(filePath, JSON.stringify([]))
    return []
  }
  
  try {
    const jsonData = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(jsonData)
  } catch (error) {
    console.error('Erro ao ler arquivo de compras:', error)
    return []
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Só permitimos método GET para buscar compras
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    // Pega o email da rota
    const { email } = req.query
    
    if (!email || Array.isArray(email)) {
      return res.status(400).json({ error: 'Email inválido ou não fornecido' })
    }

    // Busca compras do arquivo
    const compras = getComprasData()
    
    // Filtra por email e ordena da mais recente para a mais antiga
    const comprasDoCliente = compras
      .filter(compra => compra.cliente.email.toLowerCase() === email.toLowerCase())
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
      
    return res.status(200).json(comprasDoCliente)
    
  } catch (error) {
    console.error('Erro ao buscar compras:', error)
    return res.status(500).json({ error: 'Erro ao buscar compras' })
  }
} 