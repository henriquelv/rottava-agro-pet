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

  if (process.env.NODE_ENV === 'development') {
    const { level, message, metadata } = entry
    console[level](message, metadata)
  }
}

export function logInfo(message: string, metadata?: Record<string, any>) {
  const entry = createLogEntry('info', message, metadata)
  storeLog(entry)
}

export function logError(message: string, metadata?: Record<string, any>) {
  const entry = createLogEntry('error', message, metadata)
  storeLog(entry)
}

export function logWarn(message: string, metadata?: Record<string, any>) {
  const entry = createLogEntry('warn', message, metadata)
  storeLog(entry)
}

export function logDebug(message: string, metadata?: Record<string, any>) {
  const entry = createLogEntry('debug', message, metadata)
  storeLog(entry)
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
    
    const logDate = new Date(log.timestamp)
    if (options.startDate && logDate < options.startDate) return false
    
    if (options.endDate && logDate > options.endDate) return false
    
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
  if (format === 'json') {
    return JSON.stringify(logs, null, 2)
  }
  
  const headers = ['timestamp', 'level', 'message', 'metadata']
  const rows = logs.map((log) => [
    log.timestamp,
    log.level,
    log.message,
    JSON.stringify(log.metadata),
  ])
  
  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n')
} 