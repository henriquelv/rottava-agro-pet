import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Criar uma nova instância do Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

// Criar uma nova instância do rate limiter
export const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requisições por 10 segundos
  analytics: true,
  prefix: '@upstash/ratelimit',
})

// Função para verificar o rate limit
export async function checkRateLimit(ip: string) {
  try {
    const { success, limit, reset, remaining } = await rateLimit.limit(ip)
    
    return {
      success,
      limit,
      reset,
      remaining,
    }
  } catch (error) {
    console.error('Erro ao verificar rate limit:', error)
    return {
      success: true, // Em caso de erro, permitir a requisição
      limit: 10,
      reset: 0,
      remaining: 10,
    }
  }
}

// Função para obter o IP do cliente
export function getClientIp(req: Request) {
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  
  const realIp = req.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }
  
  return '127.0.0.1'
} 