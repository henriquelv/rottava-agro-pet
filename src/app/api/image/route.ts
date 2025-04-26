import { NextResponse } from 'next/server'
import sharp from 'sharp'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const src = searchParams.get('src')
  const width = searchParams.get('width')
  const height = searchParams.get('height')
  const quality = searchParams.get('quality') || '75'

  if (!src) {
    return NextResponse.json({ error: 'URL da imagem não fornecida' }, { status: 400 })
  }

  try {
    const response = await fetch(src)
    if (!response.ok) {
      throw new Error('Falha ao buscar imagem')
    }

    const buffer = await response.arrayBuffer()
    const image = sharp(Buffer.from(buffer))

    if (width || height) {
      image.resize(
        width ? parseInt(width) : undefined,
        height ? parseInt(height) : undefined,
        {
          fit: 'cover',
          position: 'center',
        }
      )
    }

    const optimizedBuffer = await image
      .webp({ quality: parseInt(quality) })
      .toBuffer()

    return new NextResponse(optimizedBuffer, {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Erro ao otimizar imagem:', error)
    return NextResponse.json(
      { error: 'Erro ao otimizar imagem' },
      { status: 500 }
    )
  }
} 