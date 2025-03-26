// Funções de formatação
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export function formatDate(date: any): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Data Inválida';
  }
  return new Intl.DateTimeFormat('pt-BR').format(date);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(date)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value)
}

// Funções de cálculo
export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const value = String(item[key])
    return {
      ...groups,
      [value]: [...(groups[value] || []), item]
    }
  }, {} as Record<string, T[]>)
}

export function sumBy<T>(array: T[], key: keyof T): number {
  return array.reduce((sum, item) => sum + Number(item[key]), 0)
}

export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1
    return 0
  })
}

// Funções de exportação
export const exportToPDF = async (data: any) => {
  // Implementar lógica de exportação para PDF
  console.log('Exportando para PDF:', data)
}

export const exportToExcel = async (data: any) => {
  // Implementar lógica de exportação para Excel
  console.log('Exportando para Excel:', data)
}

export const exportToCSV = async (data: any) => {
  // Implementar lógica de exportação para CSV
  console.log('Exportando para CSV:', data)
}

// Funções de filtro
export const filterByPeriod = (data: any[], period: string, dateField: string = 'date') => {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  switch (period) {
    case 'today':
      return data.filter(item => {
        const itemDate = new Date(item[dateField])
        return itemDate >= startOfDay
      })
    case 'week':
      const startOfWeek = new Date(now)
      startOfWeek.setDate(now.getDate() - now.getDay())
      return data.filter(item => {
        const itemDate = new Date(item[dateField])
        return itemDate >= startOfWeek
      })
    case 'month':
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      return data.filter(item => {
        const itemDate = new Date(item[dateField])
        return itemDate >= startOfMonth
      })
    case 'year':
      const startOfYear = new Date(now.getFullYear(), 0, 1)
      return data.filter(item => {
        const itemDate = new Date(item[dateField])
        return itemDate >= startOfYear
      })
    default:
      return data
  }
}

export const filterByCategory = (data: any[], category: string, categoryField: string = 'category') => {
  if (category === 'all') return data
  return data.filter(item => item[categoryField] === category)
}

export const filterBySearch = (data: any[], searchTerm: string, searchFields: string[]) => {
  if (!searchTerm) return data
  const term = searchTerm.toLowerCase()
  return data.filter(item =>
    searchFields.some(field =>
      String(item[field]).toLowerCase().includes(term)
    )
  )
}

// Funções de estoque
export const checkLowStock = (quantity: number, minQuantity: number): boolean => {
  return quantity <= minQuantity
}

export const calculateStockStatus = (products: any[]) => {
  return products.reduce((acc, product) => {
    if (checkLowStock(product.quantity, product.minQuantity)) {
      acc.lowStock += 1
    }
    acc.total += product.quantity
    return acc
  }, { lowStock: 0, total: 0 })
}

// Funções financeiras
export const calculateTotalRevenue = (sales: any[]): number => {
  return sales.reduce((total, sale) => total + sale.value, 0)
}

export const calculateAverageTicket = (sales: any[]): number => {
  if (sales.length === 0) return 0
  const total = calculateTotalRevenue(sales)
  return total / sales.length
}

export const calculateProfitMargin = (revenue: number, costs: number): number => {
  if (revenue === 0) return 0
  return ((revenue - costs) / revenue) * 100
}

// Funções de análise de vendas
export const calculateSalesByPeriod = (sales: any[], period: 'hour' | 'day' | 'month') => {
  return sales.reduce((acc, sale) => {
    const date = new Date(sale.date)
    let key = ''
    
    switch (period) {
      case 'hour':
        key = date.getHours().toString().padStart(2, '0') + 'h'
        break
      case 'day':
        key = date.getDate().toString()
        break
      case 'month':
        key = (date.getMonth() + 1).toString()
        break
    }
    
    if (!acc[key]) {
      acc[key] = { count: 0, value: 0 }
    }
    
    acc[key].count += 1
    acc[key].value += sale.value
    
    return acc
  }, {})
}

// Funções de notificação
export interface Notification {
  id: string
  type: 'alert' | 'order' | 'stock'
  title: string
  message: string
  date: string
  read: boolean
}

export const getUnreadNotificationsCount = (notifications: Notification[]): number => {
  return notifications.filter(n => !n.read).length
}

export const markNotificationAsRead = (notifications: Notification[], id: string): Notification[] => {
  return notifications.map(notification =>
    notification.id === id
      ? { ...notification, read: true }
      : notification
  )
}

export const markAllNotificationsAsRead = (notifications: Notification[]): Notification[] => {
  return notifications.map(notification => ({ ...notification, read: true }))
} 