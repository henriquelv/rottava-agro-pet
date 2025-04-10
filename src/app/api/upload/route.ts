import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      );
    }

    // Valide o tipo do arquivo
    const fileType = file.type;
    if (!fileType.startsWith('image/')) {
      return NextResponse.json(
        { error: 'O arquivo deve ser uma imagem' },
        { status: 400 }
      );
    }

    // Gere um nome de arquivo único
    const buffer = await file.arrayBuffer();
    const fileExtension = fileType.split('/')[1];
    const hash = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
    const fileName = `${hash}.${fileExtension}`;

    // Defina o caminho para salvar o arquivo
    const imagePath = join(process.cwd(), 'public', 'images', 'produtos', fileName);
    
    // Salve o arquivo
    await writeFile(imagePath, Buffer.from(buffer));
    
    // Retorne o caminho da imagem que será acessível pela URL
    const imageUrl = `/images/produtos/${fileName}`;
    
    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    return NextResponse.json(
      { error: 'Falha ao processar o upload da imagem' },
      { status: 500 }
    );
  }
} 