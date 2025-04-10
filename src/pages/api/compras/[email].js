import fs from 'fs';
import path from 'path';

// Função para ler os dados de compras do arquivo JSON
const getComprasData = () => {
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

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório' });
    }

    const compras = getComprasData();
    
    // Filtra compras pelo email do cliente e ordena por data (mais recente primeiro)
    const filteredCompras = compras
      .filter((compra) => compra.cliente.email.toLowerCase() === email.toLowerCase())
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

    return res.status(200).json(filteredCompras);
  } catch (error) {
    console.error('Erro ao buscar compras:', error);
    return res.status(500).json({ error: 'Erro ao processar a requisição' });
  }
} 