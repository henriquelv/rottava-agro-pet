import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')

  if (!key) {
    return NextResponse.json({ error: 'Chave não fornecida' }, { status: 400 })
  }

  try {
    const data = await redis.get(key)
    if (data) {
      return NextResponse.json(data)
    }
    return NextResponse.json({ error: 'Dados não encontrados' }, { status: 404 })
  } catch (error) {
    console.error('Erro ao buscar dados do Redis:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar dados' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { key, data, ttl = 3600 } = await request.json()

    if (!key || !data) {
      return NextResponse.json(
        { error: 'Chave e dados são obrigatórios' },
        { status: 400 }
      )
    }

    await redis.set(key, data, { ex: ttl })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao salvar dados no Redis:', error)
    return NextResponse.json(
      { error: 'Erro ao salvar dados' },
      { status: 500 }
    )
  }
} 