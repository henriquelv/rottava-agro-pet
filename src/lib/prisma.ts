import { PrismaClient } from '@prisma/client'

// Usar uma instância global do PrismaClient para evitar 
// múltiplas instâncias durante hot-reloading no desenvolvimento
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma 