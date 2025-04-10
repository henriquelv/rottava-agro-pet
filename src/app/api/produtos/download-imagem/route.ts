import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';

// Função para baixar uma imagem a partir de uma URL
async function downloadImage(url: string): Promise<Buffer> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Falha ao baixar imagem. Status: ${response.status}`);
  }
  
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// Função para gerar um nome de arquivo único
function generateUniqueFileName(url: string, fileType: string): string {
  const urlHash = crypto.createHash('md5').update(url).digest('hex');
  const timeStamp = Date.now();
  const extension = fileType.split('/')[1] || 'jpg'; // Padrão para jpg se não conseguir detectar
  
  return `${urlHash}-${timeStamp}.${extension}`;
}

// Função para determinar o tipo da imagem a partir da URL ou conteúdo
function getImageType(url: string, buffer: Buffer): string {
  // Tenta determinar a partir da URL
  const extension = url.split('.').pop()?.toLowerCase();
  
  if (extension === 'jpg' || extension === 'jpeg') return 'image/jpeg';
  if (extension === 'png') return 'image/png';
  if (extension === 'gif') return 'image/gif';
  if (extension === 'webp') return 'image/webp';
  
  // Se não conseguir determinar pela URL, assume jpg
  return 'image/jpeg';
}

export async function POST(req: NextRequest) {
  try {
    const { url, produtoId } = await req.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL da imagem não fornecida' },
        { status: 400 }
      );
    }
    
    // Cria o diretório de produtos se não existir
    const produtosDir = join(process.cwd(), 'public', 'images', 'produtos');
    try {
      await fs.access(produtosDir);
    } catch {
      await fs.mkdir(produtosDir, { recursive: true });
    }
    
    // Baixa a imagem
    const imageBuffer = await downloadImage(url);
    
    // Determina o tipo da imagem
    const imageType = getImageType(url, imageBuffer);
    
    // Gera um nome de arquivo único
    const fileName = generateUniqueFileName(url, imageType);
    
    // Caminho completo para salvar o arquivo
    const imagePath = join(produtosDir, fileName);
    
    // Salva a imagem localmente
    await writeFile(imagePath, imageBuffer);
    
    // Caminho relativo para acesso via URL
    const imageUrl = `/images/produtos/${fileName}`;
    
    // Atualiza o JSON do produto (se fornecido produtoId)
    if (produtoId) {
      try {
        const produtosJsonPath = join(process.cwd(), 'src', 'data', 'produtos.json');
        const produtosJson = await fs.readFile(produtosJsonPath, 'utf8');
        const produtos = JSON.parse(produtosJson);
        
        const produtoIndex = produtos.findIndex((p: any) => p.id === produtoId);
        
        if (produtoIndex !== -1) {
          produtos[produtoIndex].imagem_url = imageUrl;
          produtos[produtoIndex].data_atualizacao = new Date().toISOString();
          
          await fs.writeFile(produtosJsonPath, JSON.stringify(produtos, null, 2), 'utf8');
        }
      } catch (error) {
        console.error('Erro ao atualizar JSON de produtos:', error);
        // Não falha a operação, apenas loga o erro
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Imagem baixada e salva com sucesso',
      imageUrl,
    });
    
  } catch (error) {
    console.error('Erro ao processar imagem:', error);
    return NextResponse.json(
      { error: 'Falha ao processar a imagem' },
      { status: 500 }
    );
  }
} 