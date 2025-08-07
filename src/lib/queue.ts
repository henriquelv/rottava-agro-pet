import { logInfo, logError } from './logger'
import { Queue, Worker, Job } from 'bullmq'
import { redis } from './redis'
import { addSchema } from './api-docs'

// Configuração do sistema de filas
const config = {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB || '0'),
  },
  queues: {
    email: {
      concurrency: 1,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    },
    notification: {
      concurrency: 1,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    },
    backup: {
      concurrency: 1,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    },
    report: {
      concurrency: 1,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    },
  },
}

// Tipos e interfaces
export type QueueType = keyof typeof config.queues

export interface QueueData {
  type: string
  data: any
  priority?: number
  delay?: number
  attempts?: number
}

export interface QueueResponse {
  id: string
  type: string
  status: 'waiting' | 'active' | 'completed' | 'failed' | 'delayed'
  data: any
  createdAt: Date
  updatedAt: Date
}

// Classe de gerenciamento de filas
export class QueueManager {
  private queues: Map<QueueType, Queue>
  private workers: Map<QueueType, Worker>

  constructor() {
    this.queues = new Map()
    this.workers = new Map()
  }

  // Funções para gerenciamento de filas
  async addJob(queueType: QueueType, data: QueueData): Promise<QueueResponse> {
    try {
      const queue = this.getQueue(queueType)
      const job = await queue.add(data.type, data.data, {
        priority: data.priority,
        delay: data.delay,
        attempts: data.attempts || config.queues[queueType].attempts,
        backoff: config.queues[queueType].backoff,
      })

      return {
        id: job.id,
        type: data.type,
        status: 'waiting',
        data: data.data,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    } catch (error) {
      logError('Job addition failed', { error, queueType, data })
      throw error
    }
  }

  async getJob(queueType: QueueType, jobId: string): Promise<QueueResponse | null> {
    try {
      const queue = this.getQueue(queueType)
      const job = await queue.getJob(jobId)

      if (!job) {
        return null
      }

      return {
        id: job.id,
        type: job.name,
        status: await job.getState(),
        data: job.data,
        createdAt: job.timestamp,
        updatedAt: job.processedOn || job.timestamp,
      }
    } catch (error) {
      logError('Job retrieval failed', { error, queueType, jobId })
      throw error
    }
  }

  async removeJob(queueType: QueueType, jobId: string): Promise<void> {
    try {
      const queue = this.getQueue(queueType)
      await queue.remove(jobId)
    } catch (error) {
      logError('Job removal failed', { error, queueType, jobId })
      throw error
    }
  }

  async cleanQueue(queueType: QueueType): Promise<void> {
    try {
      const queue = this.getQueue(queueType)
      await queue.clean(0, 0, 'completed')
      await queue.clean(0, 0, 'failed')
    } catch (error) {
      logError('Queue cleaning failed', { error, queueType })
      throw error
    }
  }

  // Funções para processamento de jobs
  private async processEmailJob(job: Job): Promise<void> {
    logInfo('Processing email job', { jobId: job.id, data: job.data })
    // Implementação real iria enviar o email
  }

  private async processNotificationJob(job: Job): Promise<void> {
    logInfo('Processing notification job', { jobId: job.id, data: job.data })
    // Implementação real iria enviar a notificação
  }

  private async processBackupJob(job: Job): Promise<void> {
    logInfo('Processing backup job', { jobId: job.id, data: job.data })
    // Implementação real iria fazer o backup
  }

  private async processReportJob(job: Job): Promise<void> {
    logInfo('Processing report job', { jobId: job.id, data: job.data })
    // Implementação real iria gerar o relatório
  }

  // Funções auxiliares
  private getQueue(queueType: QueueType): Queue {
    if (!this.queues.has(queueType)) {
      const queue = new Queue(queueType, {
        connection: config.redis,
        defaultJobOptions: {
          attempts: config.queues[queueType].attempts,
          backoff: config.queues[queueType].backoff,
        },
      })
      this.queues.set(queueType, queue)
    }
    return this.queues.get(queueType)!
  }

  private getWorker(queueType: QueueType): Worker {
    if (!this.workers.has(queueType)) {
      const worker = new Worker(
        queueType,
        async (job: Job) => {
          switch (queueType) {
            case 'email':
              await this.processEmailJob(job)
              break
            case 'notification':
              await this.processNotificationJob(job)
              break
            case 'backup':
              await this.processBackupJob(job)
              break
            case 'report':
              await this.processReportJob(job)
              break
          }
        },
        {
          connection: config.redis,
          concurrency: config.queues[queueType].concurrency,
        }
      )
      this.workers.set(queueType, worker)
    }
    return this.workers.get(queueType)!
  }

  // Funções de configuração
  updateConfig(newConfig: Partial<typeof config>) {
    Object.assign(config, newConfig)
    logInfo('Queue config updated', { config })
  }

  getConfig() {
    return { ...config }
  }
}

// Instâncias padrão
export const emailQueue = new QueueManager()
export const notificationQueue = new QueueManager()
export const backupQueue = new QueueManager()
export const reportQueue = new QueueManager()

// Funções de conveniência
export async function addToQueue(queueType: QueueType, data: QueueData): Promise<QueueResponse> {
  switch (queueType) {
    case 'email':
      return emailQueue.addJob(queueType, data)
    case 'notification':
      return notificationQueue.addJob(queueType, data)
    case 'backup':
      return backupQueue.addJob(queueType, data)
    case 'report':
      return reportQueue.addJob(queueType, data)
  }
}

export async function addBulkToQueue(queueType: QueueType, data: QueueData[]): Promise<QueueResponse[]> {
  return Promise.all(data.map((item) => addToQueue(queueType, item)))
}

// Adiciona schemas para documentação
addSchema('QueueData', {
  type: 'object',
  properties: {
    type: {
      type: 'string',
    },
    data: {
      type: 'object',
      additionalProperties: true,
    },
    priority: {
      type: 'integer',
      minimum: 1,
      maximum: 10,
    },
    delay: {
      type: 'integer',
      minimum: 0,
    },
    attempts: {
      type: 'integer',
      minimum: 1,
    },
  },
  required: ['type', 'data'],
})

addSchema('QueueResponse', {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
    status: {
      type: 'string',
      enum: ['waiting', 'active', 'completed', 'failed', 'delayed'],
    },
    data: {
      type: 'object',
      additionalProperties: true,
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: ['id', 'type', 'status', 'data', 'createdAt', 'updatedAt'],
})

// Funções de conveniência
export async function addToQueue(
  type: QueueType,
  data: any,
  options?: any
): Promise<Job> {
  const queue = getQueueByType(type)
  return queue.add(data, options)
}

export async function addBulkToQueue(
  type: QueueType,
  jobs: Array<{ data: any; options?: any }>
): Promise<Job[]> {
  const queue = getQueueByType(type)
  return queue.addBulk(jobs)
}

function getQueueByType(type: QueueType): QueueManager {
  switch (type) {
    case 'email':
      return emailQueue
    case 'notification':
      return notificationQueue
    case 'backup':
      return backupQueue
    case 'report':
      return reportQueue
    default:
      throw new Error(`Unknown queue type: ${type}`)
  }
}

// Funções para gerenciar filas
export async function pauseQueue(queue: Queue) {
  await queue.pause()
  logInfo('Queue paused', { queueName: queue.name })
}

export async function resumeQueue(queue: Queue) {
  await queue.resume()
  logInfo('Queue resumed', { queueName: queue.name })
}

export async function getQueueStats(queue: Queue) {
  const stats = await queue.getJobCounts(
    'waiting',
    'active',
    'completed',
    'failed',
    'delayed',
    'paused'
  )
  logInfo('Queue stats retrieved', { queueName: queue.name, stats })
  return stats
}

export async function retryFailedJobs(queue: Queue) {
  const failedJobs = await queue.getFailed()
  for (const job of failedJobs) {
    await job.retry()
    logInfo('Failed job retried', { jobId: job.id })
  }
}

// Funções para gerenciar workers
export async function startWorkers() {
  await emailQueue.worker.run()
  await notificationQueue.worker.run()
  await backupQueue.worker.run()
  await reportQueue.worker.run()
  logInfo('All workers started')
}

export async function stopWorkers() {
  await emailQueue.worker.close()
  await notificationQueue.worker.close()
  await backupQueue.worker.close()
  await reportQueue.worker.close()
  logInfo('All workers stopped')
}

// Tratamento de erros
emailQueue.worker.on('failed', (job, err) => {
  logInfo('Email job failed', { jobId: job?.id, error: err })
})

notificationQueue.worker.on('failed', (job, err) => {
  logInfo('Notification job failed', { jobId: job?.id, error: err })
})

backupQueue.worker.on('failed', (job, err) => {
  logInfo('Backup job failed', { jobId: job?.id, error: err })
})

reportQueue.worker.on('failed', (job, err) => {
  logInfo('Report job failed', { jobId: job?.id, error: err })
}) 