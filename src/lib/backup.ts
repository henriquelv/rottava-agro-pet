import { exec } from 'child_process'
import { promisify } from 'util'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'
import { logInfo, logError } from './logger'
import { addToQueue } from './queue'
import { addSchema } from './api-docs'

const execAsync = promisify(exec)

// Configuração do sistema de backup
const config = {
  providers: {
    s3: {
      bucket: process.env.BACKUP_S3_BUCKET,
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    google: {
      bucket: process.env.BACKUP_GOOGLE_BUCKET,
      projectId: process.env.GOOGLE_PROJECT_ID,
      credentials: process.env.GOOGLE_CREDENTIALS,
    },
  },
  defaultProvider: 's3',
  retentionDays: 30,
  compression: true,
  encryption: true,
  schedule: {
    daily: '0 0 * * *', // Todos os dias à meia-noite
    weekly: '0 0 * * 0', // Todo domingo à meia-noite
    monthly: '0 0 1 * *', // Todo primeiro dia do mês à meia-noite
  },
}

// Tipos e interfaces
export type BackupProvider = keyof typeof config.providers

export interface BackupData {
  name: string
  description?: string
  type: 'full' | 'incremental'
  provider: BackupProvider
  paths: string[]
  exclude?: string[]
  schedule?: string
  retentionDays?: number
  compression?: boolean
  encryption?: boolean
}

export interface BackupResponse {
  id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  provider: BackupProvider
  url?: string
  size?: number
  error?: string
  createdAt: Date
  updatedAt: Date
}

// Classe de backup
export class Backup {
  // Funções de backup
  async createBackup(data: BackupData): Promise<BackupResponse> {
    try {
      // Aqui você implementaria a lógica de criação do backup
      const backup = await this.createWithProvider(data)

      // Adiciona job para notificar criação
      await addToQueue('notification', {
        type: 'backup',
        data: {
          backupId: backup.id,
          status: backup.status,
          provider: backup.provider,
          size: backup.size,
        },
      })

      return backup
    } catch (error) {
      logError('Backup creation failed', { error, backupData: data })
      throw error
    }
  }

  async restoreBackup(backupId: string): Promise<BackupResponse> {
    try {
      // Aqui você implementaria a lógica de restauração do backup
      const backup = await this.restoreWithProvider(backupId)

      // Adiciona job para notificar restauração
      await addToQueue('notification', {
        type: 'restore',
        data: {
          backupId: backup.id,
          status: backup.status,
          provider: backup.provider,
        },
      })

      return backup
    } catch (error) {
      logError('Backup restoration failed', { error, backupId })
      throw error
    }
  }

  // Funções auxiliares
  private async createWithProvider(data: BackupData): Promise<BackupResponse> {
    // Implementação real iria criar o backup com o provedor escolhido
    return {
      id: 'mock-id',
      status: 'completed',
      provider: data.provider,
      url: 'https://rottavaagropet.com.br/backups/mock-backup.zip',
      size: 1024 * 1024, // 1MB
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  private async restoreWithProvider(backupId: string): Promise<BackupResponse> {
    // Implementação real iria restaurar o backup com o provedor
    return {
      id: backupId,
      status: 'completed',
      provider: config.defaultProvider,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  private validateData(data: BackupData): void {
    if (!data.paths.length) {
      throw new Error('Nenhum caminho especificado para backup')
    }

    if (data.retentionDays && data.retentionDays < 1) {
      throw new Error('Período de retenção deve ser maior que 0')
    }
  }

  // Funções de configuração
  updateConfig(newConfig: Partial<typeof config>) {
    Object.assign(config, newConfig)
    logInfo('Backup config updated', { config })
  }

  getConfig() {
    return { ...config }
  }
}

// Instância padrão
export const backup = new Backup()

// Funções de conveniência
export async function createBackup(data: BackupData): Promise<BackupResponse> {
  return backup.createBackup(data)
}

export async function restoreBackup(backupId: string): Promise<BackupResponse> {
  return backup.restoreBackup(backupId)
}

// Adiciona schemas para documentação
addSchema('BackupData', {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    type: {
      type: 'string',
      enum: ['full', 'incremental'],
    },
    provider: {
      type: 'string',
      enum: Object.keys(config.providers),
    },
    paths: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    exclude: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    schedule: {
      type: 'string',
    },
    retentionDays: {
      type: 'integer',
      minimum: 1,
    },
    compression: {
      type: 'boolean',
    },
    encryption: {
      type: 'boolean',
    },
  },
  required: ['name', 'type', 'provider', 'paths'],
})

addSchema('BackupResponse', {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    status: {
      type: 'string',
      enum: ['pending', 'processing', 'completed', 'failed'],
    },
    provider: {
      type: 'string',
      enum: Object.keys(config.providers),
    },
    url: {
      type: 'string',
      format: 'uri',
    },
    size: {
      type: 'integer',
      minimum: 0,
    },
    error: {
      type: 'string',
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
  required: ['id', 'status', 'provider', 'createdAt', 'updatedAt'],
})

export async function listBackups() {
  const backupDir = process.env.BACKUP_DIR || './backups'
  
  try {
    const { stdout } = await execAsync(`ls -l ${backupDir}/*.sql`)
    const backups = stdout
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const [permissions, links, owner, group, size, date, time, ...nameParts] = line.split(' ')
        const name = nameParts.join(' ')
        return {
          name,
          size: parseInt(size, 10),
          date: `${date} ${time}`,
          path: join(backupDir, name),
        }
      })

    logInfo('Backups listed', { count: backups.length })
    return backups
  } catch (error) {
    logInfo('Failed to list backups', { error })
    throw error
  }
}

export async function deleteBackup(backupPath: string) {
  try {
    await execAsync(`rm ${backupPath}`)
    logInfo('Backup deleted', { backupPath })
  } catch (error) {
    logInfo('Failed to delete backup', { error })
    throw error
  }
}

export async function scheduleBackup(cronExpression: string) {
  const backupDir = process.env.BACKUP_DIR || './backups'
  const scriptPath = join(backupDir, 'backup-script.sh')

  try {
    // Criar script de backup
    const scriptContent = `#!/bin/bash
export DATABASE_URL="${process.env.DATABASE_URL}"
export BACKUP_DIR="${backupDir}"
${process.cwd()}/node_modules/.bin/ts-node ${process.cwd()}/src/scripts/backup.ts
`
    await writeFile(scriptPath, scriptContent, { mode: 0o755 })
    logInfo('Backup script created', { scriptPath })

    // Adicionar ao crontab
    const { stdout, stderr } = await execAsync(
      `(crontab -l 2>/dev/null; echo "${cronExpression} ${scriptPath}") | crontab -`
    )

    if (stderr) {
      logInfo('Crontab stderr', { stderr })
    }

    logInfo('Backup scheduled', { cronExpression })
  } catch (error) {
    logInfo('Failed to schedule backup', { error })
    throw error
  }
}

export async function removeBackupSchedule() {
  const backupDir = process.env.BACKUP_DIR || './backups'
  const scriptPath = join(backupDir, 'backup-script.sh')

  try {
    // Remover do crontab
    const { stdout, stderr } = await execAsync(
      `crontab -l | grep -v "${scriptPath}" | crontab -`
    )

    if (stderr) {
      logInfo('Crontab stderr', { stderr })
    }

    // Remover script
    await execAsync(`rm ${scriptPath}`)
    logInfo('Backup schedule removed')
  } catch (error) {
    logInfo('Failed to remove backup schedule', { error })
    throw error
  }
}

export async function compressBackup(backupPath: string) {
  const compressedPath = `${backupPath}.gz`

  try {
    const { stdout, stderr } = await execAsync(`gzip -c ${backupPath} > ${compressedPath}`)

    if (stderr) {
      logInfo('Compression stderr', { stderr })
    }

    logInfo('Backup compressed', { compressedPath })
    return compressedPath
  } catch (error) {
    logInfo('Failed to compress backup', { error })
    throw error
  }
}

export async function decompressBackup(compressedPath: string) {
  const backupPath = compressedPath.replace('.gz', '')

  try {
    const { stdout, stderr } = await execAsync(`gunzip -c ${compressedPath} > ${backupPath}`)

    if (stderr) {
      logInfo('Decompression stderr', { stderr })
    }

    logInfo('Backup decompressed', { backupPath })
    return backupPath
  } catch (error) {
    logInfo('Failed to decompress backup', { error })
    throw error
  }
}

export async function verifyBackup(backupPath: string) {
  try {
    const { stdout, stderr } = await execAsync(
      `pg_restore -l ${backupPath} > /dev/null 2>&1`
    )

    logInfo('Backup verified', { backupPath, valid: true })
    return true
  } catch (error) {
    logInfo('Backup verification failed', { backupPath, error })
    return false
  }
}

export async function cleanupOldBackups(daysToKeep: number) {
  const backupDir = process.env.BACKUP_DIR || './backups'

  try {
    const { stdout, stderr } = await execAsync(
      `find ${backupDir} -name "*.sql*" -mtime +${daysToKeep} -delete`
    )

    if (stderr) {
      logInfo('Cleanup stderr', { stderr })
    }

    logInfo('Old backups cleaned up', { daysToKeep })
  } catch (error) {
    logInfo('Failed to cleanup old backups', { error })
    throw error
  }
} 