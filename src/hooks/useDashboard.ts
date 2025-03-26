import { useState, useEffect, useCallback, useMemo } from 'react'
import { api } from '@/services/api'
import type { Product, Sale, Customer, Seller, Bill } from '@/services/api'
import { toast } from 'sonner'

interface DashboardState {
  loading: boolean
  error: string | null
  data: {
    revenue: {
      current: number
      previous: number
    }
    sales: {
      current: number
      previous: number
    }
    customers: {
      current: number
      previous: number
    }
    stock: {
      lowStock: number
      total: number
    }
    topProducts: Product[]
    stockAlerts: Product[]
  }
  filters: {
    period: string
    category: string
    searchTerm: string
  }
}

interface DashboardFilters {
  period: string
  category: string
  searchTerm: string
}

interface DashboardData {
  sales: {
    total: number
    previousTotal: number
    chart: {
      labels: string[]
      current: number[]
      previous: number[]
    }
  }
  revenue: {
    total: number
    previousTotal: number
    chart: {
      labels: string[]
      current: number[]
      previous: number[]
    }
  }
  categories: {
    labels: string[]
    data: number[]
  }
  inventory: {
    totalProducts: number
    totalValue: number
    lowStock: number
    outOfStock: number
    chart: {
      labels: string[]
      current: number[]
      minimum: number[]
    }
  }
}

// Dados mock para demonstração
const mockDashboardData: DashboardData = {
  sales: {
    total: 2125,
    previousTotal: 1890,
    chart: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      current: [150, 165, 180, 170, 160, 185, 190, 185, 180, 175, 190, 195],
      previous: [140, 155, 165, 155, 150, 170, 175, 170, 165, 160, 175, 180]
    }
  },
  revenue: {
    total: 616000,
    previousTotal: 572000,
    chart: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      current: [45000, 48000, 52000, 49000, 47000, 53000, 55000, 54000, 52000, 51000, 54000, 56000],
      previous: [42000, 45000, 48000, 46000, 44000, 49000, 51000, 50000, 48000, 47000, 50000, 52000]
    }
  },
  categories: {
    labels: ['Ração', 'Medicamentos', 'Acessórios', 'Higiene', 'Brinquedos'],
    data: [35, 25, 20, 15, 5]
  },
  inventory: {
    totalProducts: 165,
    totalValue: 45678.90,
    lowStock: 8,
    outOfStock: 2,
    chart: {
      labels: ['Ração Premium Cães', 'Ração Gatos', 'Antipulgas', 'Coleira', 'Shampoo Pet', 'Brinquedo'],
      current: [25, 30, 15, 40, 20, 35],
      minimum: [20, 25, 10, 30, 15, 25]
    }
  }
}

// Dados mockados para o estado inicial
const mockInitialState = {
  revenue: { current: 616000, previous: 572000 },
  sales: { current: 2125, previous: 1890 },
  customers: { current: 1250, previous: 1100 },
  stock: { lowStock: 8, total: 165 },
  topProducts: [
    { id: '1', name: 'Ração Premium para Cães', price: 129.90, quantity: 45, minQuantity: 10, category: 'Ração', createdAt: '2023-01-15' },
    { id: '2', name: 'Ração para Gatos Castrados', price: 89.90, quantity: 38, minQuantity: 8, category: 'Ração', createdAt: '2023-02-10' },
    { id: '3', name: 'Antipulgas e Carrapatos', price: 79.90, quantity: 25, minQuantity: 5, category: 'Medicamentos', createdAt: '2023-03-05' },
    { id: '4', name: 'Coleira Ajustável', price: 39.90, quantity: 60, minQuantity: 10, category: 'Acessórios', createdAt: '2023-04-20' },
    { id: '5', name: 'Shampoo Hidratante', price: 29.90, quantity: 42, minQuantity: 8, category: 'Higiene', createdAt: '2023-05-15' }
  ],
  stockAlerts: [
    { id: '3', name: 'Antipulgas e Carrapatos', price: 79.90, quantity: 5, minQuantity: 5, category: 'Medicamentos', createdAt: '2023-03-05' },
    { id: '6', name: 'Brinquedo Interativo', price: 49.90, quantity: 4, minQuantity: 5, category: 'Brinquedos', createdAt: '2023-06-10' },
    { id: '8', name: 'Cama para Pets', price: 89.90, quantity: 3, minQuantity: 4, category: 'Acessórios', createdAt: '2023-08-05' }
  ]
}

export function useDashboard() {
  const [state, setState] = useState<DashboardState>({
    loading: true,
    error: null,
    data: mockInitialState,
    filters: {
      period: 'month',
      category: 'all',
      searchTerm: ''
    }
  })

  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<DashboardFilters>({
    period: 'month',
    category: 'all',
    searchTerm: ''
  })
  const [data, setData] = useState<DashboardData>(mockDashboardData)

  const fetchDashboardData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))

      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Usar dados mockados em vez de chamar a API real
      setState(prev => ({
        ...prev,
        loading: false,
        data: mockInitialState
      }))
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      // Mesmo em caso de erro, usar dados mockados
      setState(prev => ({
        ...prev,
        loading: false,
        error: null,
        data: mockInitialState
      }))
    }
  }, [])

  const updateFilters = useCallback((newFilters: Partial<DashboardFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }, [])

  const refreshData = useCallback(async () => {
    try {
      setLoading(true)
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setData(mockDashboardData)
      toast.success('Dados atualizados com sucesso!')
    } catch (error) {
      console.error('Erro ao atualizar dados:', error)
      toast.error('Erro ao atualizar dados. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }, [])

  const exportDashboardReport = useCallback(async (format: 'pdf' | 'excel' | 'csv') => {
    try {
      // Simular exportação
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success(`Relatório exportado com sucesso em formato ${format.toUpperCase()}!`)
    } catch (error) {
      console.error('Erro ao exportar relatório:', error)
      toast.error('Erro ao exportar relatório. Tente novamente.')
    }
  }, [])

  const filteredData = useMemo(() => {
    // Aqui você pode implementar a lógica de filtragem dos dados
    // com base nos filtros selecionados
    return data
  }, [data, filters])

  // Carregar dados iniciais
  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  return {
    ...state,
    loading,
    filters,
    data: filteredData,
    updateFilters,
    refreshData,
    exportDashboardReport
  }
} 