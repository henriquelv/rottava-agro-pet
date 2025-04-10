// Versão simplificada do logger compatível com Edge Runtime

// Define os níveis de log
type LogLevel = 'info' | 'error' | 'warn' | 'debug';

// Interface para entradas de log
interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

// Armazenamento em memória para logs (apenas em desenvolvimento)
const logs: LogEntry[] = [];
const MAX_LOGS = 100;

// Função para formatar data
function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

// Função para criar uma entrada de log
function createLogEntry(
  level: LogLevel,
  message: string | Error,
  metadata?: Record<string, any>
): LogEntry {
  const msg = message instanceof Error ? message.message : message;
  
  return {
    level,
    message: msg,
    timestamp: getCurrentTimestamp(),
    metadata: message instanceof Error 
      ? { 
          ...metadata, 
          stack: message.stack,
          name: message.name
        } 
      : metadata
  };
}

// Função para armazenar um log
function storeLog(entry: LogEntry) {
  // Adicionar ao array em memória
  logs.push(entry);
  if (logs.length > MAX_LOGS) {
    logs.shift();
  }

  // Também exibir no console (apenas no cliente)
  if (process.env.NODE_ENV === 'development') {
    const { level, message, metadata } = entry;
    console[level](message, metadata);
  }
}

// Funções exportadas
export function getLogs(level?: LogLevel): LogEntry[] {
  return level 
    ? logs.filter(log => log.level === level)
    : [...logs];
}

export function clearLogs(): void {
  logs.length = 0;
}

export function logInfo(message: string, metadata?: Record<string, any>) {
  const entry = createLogEntry('info', message, metadata);
  storeLog(entry);
}

export function logError(error: Error | string, metadata?: Record<string, any>) {
  const entry = createLogEntry('error', error, metadata);
  storeLog(entry);
}

export function logWarn(message: string, metadata?: Record<string, any>) {
  const entry = createLogEntry('warn', message, metadata);
  storeLog(entry);
}

export function logDebug(message: string, metadata?: Record<string, any>) {
  const entry = createLogEntry('debug', message, metadata);
  storeLog(entry);
}

// Função para filtrar logs
export function filterLogs(
  options: {
    level?: LogLevel;
    startDate?: Date;
    endDate?: Date;
    search?: string;
  } = {}
): LogEntry[] {
  return logs.filter((log) => {
    if (options.level && log.level !== options.level) return false;
    
    if (options.startDate && new Date(log.timestamp) < options.startDate) return false;
    
    if (options.endDate && new Date(log.timestamp) > options.endDate) return false;
    
    if (options.search) {
      const searchLower = options.search.toLowerCase();
      return (
        log.message.toLowerCase().includes(searchLower) ||
        JSON.stringify(log.metadata).toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
}

// Utilitários de formatação
export function formatError(error: Error) {
  return {
    message: error.message,
    stack: error.stack,
    name: error.name,
  };
}

export function formatMetadata(metadata: Record<string, any>) {
  return JSON.stringify(metadata, null, 2);
} 