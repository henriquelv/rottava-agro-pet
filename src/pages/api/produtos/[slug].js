import fs from 'fs';
import path from 'path';

export async function GET(req, { params }) {
  try {
    const { slug } = params;
    
    if (!slug) {
      return new Response(
        JSON.stringify({ error: 'Slug do produto é obrigatório' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Caminho para o arquivo JSON de produtos
    const filePath = path.join(process.cwd(), 'src/data/produtos.json');
    
    // Verificar se o arquivo existe
    if (!fs.existsSync(filePath)) {
      return new Response(
        JSON.stringify({ error: 'Arquivo de produtos não encontrado' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Ler o arquivo JSON
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const produtos = JSON.parse(fileContent);
    
    // Buscar o produto pelo slug
    const produto = produtos.find(p => p.slug === slug);
    
    if (!produto) {
      return new Response(
        JSON.stringify({ error: 'Produto não encontrado' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Retornar o produto
    return new Response(
      JSON.stringify(produto),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    return GET(req, { params: req.query })
      .then(response => response.json())
      .then(data => res.status(response.status).json(data))
      .catch(error => {
        console.error('Erro ao processar requisição GET:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
      });
  } else {
    // Método não permitido
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Método ${req.method} não permitido` });
  }
} 