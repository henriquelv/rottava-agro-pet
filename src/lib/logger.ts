import winston from 'winston'
import { format } from 'winston'
import 'winston-daily-rotate-file'

// Configuração do formato do log
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }),
  format.splat(),
  format.json()
)

// Configuração do transporte para arquivo
const fileTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: logFormat,
})

// Configuração do transporte para console
const consoleTransport = new winston.transports.Console({
  format: format.combine(
    format.colorize(),
    format.printf(
      (info) =>
        `${info.timestamp} ${info.level}: ${info.message} ${
          info.metadata ? JSON.stringify(info.metadata) : ''
        }`
    )
  ),
})

// Criação do logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports: [fileTransport, consoleTransport],
})

// Funções de log
export function logInfo(message: string, metadata?: Record<string, any>) {
  logger.info(message, { metadata })
}

export function logError(message: string, metadata?: Record<string, any>) {
  logger.error(message, { metadata })
}

export function logWarn(message: string, metadata?: Record<string, any>) {
  logger.warn(message, { metadata })
}

export function logDebug(message: string, metadata?: Record<string, any>) {
  logger.debug(message, { metadata })
}

// Funções para gerenciamento de logs
export function setLogLevel(level: string) {
  logger.level = level
  logInfo('Log level changed', { level })
}

export function addTransport(transport: winston.transport) {
  logger.add(transport)
  logInfo('Transport added', { transport })
}

export function removeTransport(transport: winston.transport) {
  logger.remove(transport)
  logInfo('Transport removed', { transport })
}

// Funções para formatação de logs
export function formatError(error: Error) {
  return {
    message: error.message,
    stack: error.stack,
    name: error.name,
  }
}

export function formatMetadata(metadata: Record<string, any>) {
  return JSON.stringify(metadata, null, 2)
}

// Funções para configuração
export function configureLogger(config: {
  level: string
  filename: string
  maxSize: string
  maxFiles: string
}) {
  logger.level = config.level
  fileTransport.filename = config.filename
  fileTransport.maxSize = config.maxSize
  fileTransport.maxFiles = config.maxFiles
  logInfo('Logger configured', { config })
}

export function getLoggerConfig() {
  return {
    level: logger.level,
    filename: fileTransport.filename,
    maxSize: fileTransport.maxSize,
    maxFiles: fileTransport.maxFiles,
  }
}

// Funções para limpeza de logs
export async function cleanupLogs(daysToKeep: number) {
  const { stdout, stderr } = await execAsync(
    `find logs -name "*.log*" -mtime +${daysToKeep} -delete`
  )

  if (stderr) {
    logError('Log cleanup stderr', { stderr })
  }

  logInfo('Old logs cleaned up', { daysToKeep })
}

// Funções para análise de logs
export async function analyzeLogs(
  startDate: Date,
  endDate: Date,
  level?: string
) {
  const logs = await readLogs(startDate, endDate, level)
  const analysis = {
    total: logs.length,
    byLevel: {} as Record<string, number>,
    byHour: {} as Record<string, number>,
    errors: [] as string[],
  }

  logs.forEach((log) => {
    // Contagem por nível
    analysis.byLevel[log.level] = (analysis.byLevel[log.level] || 0) + 1

    // Contagem por hora
    const hour = new Date(log.timestamp).getHours()
    analysis.byHour[hour] = (analysis.byHour[hour] || 0) + 1

    // Coletar erros
    if (log.level === 'error') {
      analysis.errors.push(log.message)
    }
  })

  logInfo('Logs analyzed', { analysis })
  return analysis
}

// Funções auxiliares
async function readLogs(startDate: Date, endDate: Date, level?: string) {
  // Implementar lógica para ler logs do arquivo
  return []
}

const { exec } = require('child_process')
const { promisify } = require('util')
const execAsync = promisify(exec)

type LogLevel = 'info' | 'error' | 'warn' | 'debug'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  metadata?: Record<string, any>
}

const logs: LogEntry[] = []
const MAX_LOGS = 1000

function formatDate(date: Date): string {
  return date.toISOString()
}

function createLogEntry(
  level: LogLevel,
  message: string,
  metadata?: Record<string, any>
): LogEntry {
  return {
    level,
    message,
    timestamp: formatDate(new Date()),
    metadata,
  }
}

function storeLog(entry: LogEntry) {
  logs.push(entry)
  if (logs.length > MAX_LOGS) {
    logs.shift()
  }

  if (typeof window !== 'undefined') {
    console[entry.level](
      `[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}`,
      entry.metadata || ''
    )
  }
}

export function getLogs(): LogEntry[] {
  return [...logs]
}

export function clearLogs() {
  logs.length = 0
}

export function filterLogs(
  options: {
    level?: LogLevel
    startDate?: Date
    endDate?: Date
    search?: string
  } = {}
): LogEntry[] {
  return logs.filter((log) => {
    if (options.level && log.level !== options.level) return false
    
    if (options.startDate && new Date(log.timestamp) < options.startDate) return false
    
    if (options.endDate && new Date(log.timestamp) > options.endDate) return false
    
    if (options.search) {
      const searchLower = options.search.toLowerCase()
      return (
        log.message.toLowerCase().includes(searchLower) ||
        JSON.stringify(log.metadata).toLowerCase().includes(searchLower)
      )
    }
    
    return true
  })
}

export function exportLogs(format: 'json' | 'csv' = 'json'): string {
  if (format === 'csv') {
    const headers = ['timestamp', 'level', 'message', 'metadata']
    const rows = logs.map((log) => [
      log.timestamp,
      log.level,
      log.message,
      JSON.stringify(log.metadata),
    ])
    return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n')
  }
  
  return JSON.stringify(logs, null, 2)
} 