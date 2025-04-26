import { PrismaClient } from '@prisma/client'

// Usar uma instância global do PrismaClient para evitar 
// múltiplas instâncias durante hot-reloading no desenvolvimento
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Middleware para sanitização de inputs
prisma.$use(async (params, next) => {
  // Sanitização de strings
  if (params.args?.data) {
    Object.keys(params.args.data).forEach((key) => {
      if (typeof params.args.data[key] === 'string') {
        params.args.data[key] = params.args.data[key].replace(
          /[<>]/g,
          (match: string) => {
            return match === '<' ? '&lt;' : '&gt;'
          }
        )
      }
    })
  }

  // Sanitização de where
  if (params.args?.where) {
    Object.keys(params.args.where).forEach((key) => {
      if (typeof params.args.where[key] === 'string') {
        params.args.where[key] = params.args.where[key].replace(
          /[<>]/g,
          (match: string) => {
            return match === '<' ? '&lt;' : '&gt;'
          }
        )
      }
    })
  }

  return next(params)
})

// Middleware para logging
prisma.$use(async (params, next) => {
  const before = Date.now()
  const result = await next(params)
  const after = Date.now()

  console.log(
    `Query ${params.model}.${params.action} took ${after - before}ms`
  )

  return result
})

// Middleware para validação de inputs
prisma.$use(async (params, next) => {
  // Validação de email
  if (params.args?.data?.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(params.args.data.email)) {
      throw new Error('Email inválido')
    }
  }

  // Validação de senha
  if (params.args?.data?.senha) {
    if (params.args.data.senha.length < 6) {
      throw new Error('Senha deve ter no mínimo 6 caracteres')
    }
  }

  return next(params)
})

export default prisma 