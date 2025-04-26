/**
 * Utilitários para formatação e manipulação de datas
 */

/**
 * Formata uma data para o formato brasileiro (DD/MM/YYYY)
 */
export function formatDate(date: Date | string | number): string {
  if (!date) return '';
  
  const dateObj = date instanceof Date ? date : new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return 'Data inválida';
  }
  
  return new Intl.DateTimeFormat('pt-BR').format(dateObj);
}

/**
 * Formata uma data e hora para o formato brasileiro (DD/MM/YYYY HH:MM)
 */
export function formatDateTime(date: Date | string | number): string {
  if (!date) return '';
  
  const dateObj = date instanceof Date ? date : new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return 'Data inválida';
  }
  
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(dateObj);
}

/**
 * Formata uma data para exibição em formato extenso (15 de Janeiro de 2023)
 */
export function formatDateLong(date: Date | string | number): string {
  if (!date) return '';
  
  const dateObj = date instanceof Date ? date : new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return 'Data inválida';
  }
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(dateObj);
}

/**
 * Verifica se uma data é válida
 */
export function isValidDate(date: any): boolean {
  if (!date) return false;
  const dateObj = date instanceof Date ? date : new Date(date);
  return !isNaN(dateObj.getTime());
}

/**
 * Calcula a diferença em dias entre duas datas
 */
export function daysBetween(startDate: Date | string, endDate: Date | string): number {
  const start = startDate instanceof Date ? startDate : new Date(startDate);
  const end = endDate instanceof Date ? endDate : new Date(endDate);
  
  // Converter para UTC para evitar problemas com horário de verão
  const utcStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const utcEnd = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  
  // Converter para dias (86400000 = 1000 * 60 * 60 * 24)
  return Math.floor((utcEnd - utcStart) / 86400000);
}

/**
 * Adiciona dias a uma data
 */
export function addDays(date: Date | string, days: number): Date {
  const dateObj = date instanceof Date ? new Date(date) : new Date(date);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj;
}

/**
 * Formata uma data relativa (hoje, ontem, há X dias)
 */
export function formatRelativeDate(date: Date | string | number): string {
  if (!date) return '';
  
  const dateObj = date instanceof Date ? date : new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return 'Data inválida';
  }
  
  const now = new Date();
  const diffDays = daysBetween(dateObj, now);
  
  if (diffDays === 0) {
    return 'Hoje';
  } else if (diffDays === 1) {
    return 'Ontem';
  } else if (diffDays < 7) {
    return `Há ${diffDays} dias`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? 'Há 1 semana' : `Há ${weeks} semanas`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return months === 1 ? 'Há 1 mês' : `Há ${months} meses`;
  } else {
    const years = Math.floor(diffDays / 365);
    return years === 1 ? 'Há 1 ano' : `Há ${years} anos`;
  }
} 