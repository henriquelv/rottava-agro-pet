import fs from 'fs/promises';
import path from 'path';

/**
 * Função que verifica se a imagem de um produto já foi salva localmente
 * e, caso contrário, faz o download e salva.
 */
export async function ensureProductImage(produto: any): Promise<string> {
  // Se a imagem já for local, retorna ela mesma
  if (
    produto.imagem_url && 
    (produto.imagem_url.startsWith('/images/') || produto.imagem_url.startsWith('/produtos/'))
  ) {
    return produto.imagem_url;
  }

  try {
    // Faz o download da imagem usando nossa API
    const response = await fetch('/api/produtos/download-imagem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: produto.imagem_url,
        produtoId: produto.id,
      }),
    });

    if (!response.ok) {
      throw new Error('Falha ao baixar imagem');
    }

    const data = await response.json();
    
    // Atualiza o objeto produto (sem modificar o original)
    return data.imageUrl;
  } catch (error) {
    console.error(`Erro ao processar imagem para o produto ${produto.id}:`, error);
    // Retorna a URL original como fallback
    return produto.imagem_url;
  }
}

/**
 * Função para verificar se um caminho de imagem é válido
 */
export function isValidImagePath(imagePath: string): boolean {
  if (!imagePath) return false;
  
  // Verifica se o caminho é uma URL externa
  if (imagePath.startsWith('http')) return true;
  
  // Verifica se o caminho é relativo ao diretório public
  if (imagePath.startsWith('/')) {
    // Remove a barra inicial para obter o caminho relativo ao diretório public
    const relativePath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    const fullPath = path.join(process.cwd(), 'public', relativePath);
    
    // Verifica se o arquivo existe
    try {
      fs.access(fullPath);
      return true;
    } catch {
      return false;
    }
  }
  
  return false;
}

/**
 * Função que retorna um caminho de imagem padrão caso a imagem não exista
 */
export function getImageWithFallback(imagePath: string, fallbackImage: string = '/images/fallback-image.jpg'): string {
  if (!imagePath) return fallbackImage;
  
  if (imagePath.startsWith('http')) {
    // Para URLs externas, retornamos a URL
    return imagePath;
  }
  
  // Para caminhos relativos, verificamos se o arquivo existe
  return isValidImagePath(imagePath) ? imagePath : fallbackImage;
} 