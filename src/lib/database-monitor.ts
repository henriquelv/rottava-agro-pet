import { logInfo, logError } from './logger'
import { PrismaClient } from '@prisma/client'
import { addToQueue } from './queue'
import { addSchema } from './api-docs'

// Configuração do monitoramento
const config = {
  thresholds: {
    slowQuery: 1000, // 1 segundo
    errorRate: 0.1, // 10%
    connectionUsage: 0.8, // 80%
  },
  checkInterval: 60000, // 1 minuto
  notificationChannels: ['email', 'slack'],
}

// Tipos e interfaces
export interface DatabaseStats {
  queryCount: number
  slowQueries: number
  errorCount: number
  connectionCount: number
  maxConnections: number
  lastCheck: Date
}

export interface DatabaseAlert {
  type: 'slow_query' | 'error_rate' | 'connection_usage'
  message: string
  severity: 'warning' | 'critical'
  data: any
}

// Classe de monitoramento
export class DatabaseMonitor {
  private prisma: PrismaClient
  private stats: DatabaseStats
  private lastCheck: Date
  private errorCount: number
  private slowQueries: Array<{
    query: string
    duration: number
    timestamp: Date
  }>

  constructor() {
    this.prisma = new PrismaClient()
    this.stats = {
      queryCount: 0,
      slowQueries: 0,
      errorCount: 0,
      connectionCount: 0,
      maxConnections: 0,
      lastCheck: new Date(),
    }
    this.lastCheck = new Date()
    this.errorCount = 0
    this.slowQueries = []
  }

  // Funções de monitoramento
  async start(): Promise<void> {
    try {
      setInterval(() => this.checkHealth(), config.checkInterval)
      logInfo('Database monitoring started')
    } catch (error) {
      logError('Failed to start database monitoring', { error })
      throw error
    }
  }

  private async checkHealth(): Promise<void> {
    try {
      await this.checkConnections()
      await this.checkSlowQueries()
      await this.checkErrorRate()
      this.lastCheck = new Date()
    } catch (error) {
      logError('Health check failed', { error })
      throw error
    }
  }

  private async checkConnections(): Promise<void> {
    try {
      const result = await this.prisma.$queryRaw<[{ count: number }]>`
        SELECT COUNT(*) as count FROM pg_stat_activity
      `
      const connectionCount = result[0].count
      const maxConnections = 100 // Valor padrão, ajuste conforme necessário

      this.stats.connectionCount = connectionCount
      this.stats.maxConnections = maxConnections

      if (connectionCount / maxConnections > config.thresholds.connectionUsage) {
        await this.sendAlert({
          type: 'connection_usage',
          message: 'Alto uso de conexões no banco de dados',
          severity: 'warning',
          data: {
            current: connectionCount,
            max: maxConnections,
            usage: connectionCount / maxConnections,
          },
        })
      }
    } catch (error) {
      logError('Connection check failed', { error })
      throw error
    }
  }

  private async checkSlowQueries(): Promise<void> {
    try {
      const result = await this.prisma.$queryRaw<Array<{ query: string; duration: number }>>`
        SELECT query, duration
        FROM pg_stat_activity
        WHERE state = 'active'
        AND duration > ${config.thresholds.slowQuery}
      `

      for (const row of result) {
        this.slowQueries.push({
          query: row.query,
          duration: row.duration,
          timestamp: new Date(),
        })

        await this.sendAlert({
          type: 'slow_query',
          message: 'Query lenta detectada',
          severity: 'warning',
          data: {
            query: row.query,
            duration: row.duration,
          },
        })
      }

      this.stats.slowQueries = this.slowQueries.length
    } catch (error) {
      logError('Slow query check failed', { error })
      throw error
    }
  }

  private async checkErrorRate(): Promise<void> {
    try {
      const result = await this.prisma.$queryRaw<[{ count: number }]>`
        SELECT COUNT(*) as count FROM pg_stat_activity
        WHERE state = 'idle in transaction (aborted)'
      `
      const errorCount = result[0].count
      const totalQueries = this.stats.queryCount

      if (totalQueries > 0 && errorCount / totalQueries > config.thresholds.errorRate) {
        await this.sendAlert({
          type: 'error_rate',
          message: 'Alta taxa de erros no banco de dados',
          severity: 'critical',
          data: {
            errors: errorCount,
            total: totalQueries,
            rate: errorCount / totalQueries,
          },
        })
      }

      this.stats.errorCount = errorCount
    } catch (error) {
      logError('Error rate check failed', { error })
      throw error
    }
  }

  // Funções auxiliares
  private async sendAlert(alert: DatabaseAlert): Promise<void> {
    try {
      await addToQueue('notification', {
        type: 'database_alert',
        data: {
          ...alert,
          timestamp: new Date(),
        },
      })
    } catch (error) {
      logError('Failed to send alert', { error, alert })
      throw error
    }
  }

  // Funções de configuração
  updateConfig(newConfig: Partial<typeof config>) {
    Object.assign(config, newConfig)
    logInfo('Database monitor config updated', { config })
  }

  getConfig() {
    return { ...config }
  }

  getStats(): DatabaseStats {
    return { ...this.stats }
  }
}

// Instância padrão
export const databaseMonitor = new DatabaseMonitor()

// Funções de conveniência
export async function startMonitoring(): Promise<void> {
  return databaseMonitor.start()
}

export function getDatabaseStats(): DatabaseStats {
  return databaseMonitor.getStats()
}

// Adiciona schemas para documentação
addSchema('DatabaseStats', {
  type: 'object',
  properties: {
    queryCount: {
      type: 'integer',
      minimum: 0,
    },
    slowQueries: {
      type: 'integer',
      minimum: 0,
    },
    errorCount: {
      type: 'integer',
      minimum: 0,
    },
    connectionCount: {
      type: 'integer',
      minimum: 0,
    },
    maxConnections: {
      type: 'integer',
      minimum: 0,
    },
    lastCheck: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: [
    'queryCount',
    'slowQueries',
    'errorCount',
    'connectionCount',
    'maxConnections',
    'lastCheck',
  ],
})

addSchema('DatabaseAlert', {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['slow_query', 'error_rate', 'connection_usage'],
    },
    message: {
      type: 'string',
    },
    severity: {
      type: 'string',
      enum: ['warning', 'critical'],
    },
    data: {
      type: 'object',
      additionalProperties: true,
    },
  },
  required: ['type', 'message', 'severity', 'data'],
}) 