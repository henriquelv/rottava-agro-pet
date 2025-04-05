import React from 'react'
import { Bar } from 'react-chartjs-2'
import { defaultOptions, colors } from '@/lib/chart'
import { formatCurrency } from '@/utils/admin'

interface InventoryChartProps {
  data?: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string
    }[]
  }
  summary?: {
    totalProducts: number
    totalValue: number
    lowStock: number
    outOfStock: number
  }
}

// Dados mock para demonstração
const mockData = {
  labels: ['Ração', 'Medicamentos', 'Acessórios', 'Higiene', 'Brinquedos'],
  datasets: [
    {
      label: 'Quantidade Atual',
      data: [45, 32, 28, 35, 20],
      backgroundColor: colors.primary.main
    },
    {
      label: 'Quantidade Mínima',
      data: [20, 15, 10, 12, 8],
      backgroundColor: colors.warning.main
    }
  ]
}

const options = {
  ...defaultOptions,
  plugins: {
    ...defaultOptions.plugins,
    title: {
      display: true,
      text: 'Controle de Estoque',
      font: {
        size: 16,
        weight: 'bold',
        family: 'Inter'
      }
    }
  },
  scales: {
    ...defaultOptions.scales,
    x: {
      ...defaultOptions.scales.x,
      grid: {
        display: false
      }
    },
    y: {
      ...defaultOptions.scales.y,
      beginAtZero: true,
      grid: {
        color: '#f1f5f9'
      }
    }
  }
}

// Dados adicionais para o resumo
const mockSummary = {
  totalProducts: 165,
  totalValue: 45678.90,
  lowStock: 8,
  outOfStock: 2
}

export default function InventoryChart({ data, summary }: InventoryChartProps) {
  const chartData = data || mockData
  const summaryData = summary || mockSummary

  if (!chartData?.labels || !chartData?.datasets) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-center h-[300px]">
        <p className="text-text/60">Nenhum dado disponível</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-background rounded-lg">
          <span className="text-sm text-text/60">Total de Produtos</span>
          <h4 className="text-xl font-bold">{summaryData.totalProducts}</h4>
        </div>
        
        <div className="p-4 bg-background rounded-lg">
          <span className="text-sm text-text/60">Valor em Estoque</span>
          <h4 className="text-xl font-bold">{formatCurrency(summaryData.totalValue)}</h4>
        </div>
        
        <div className="p-4 bg-background rounded-lg">
          <span className="text-sm text-text/60">Estoque Baixo</span>
          <h4 className="text-xl font-bold text-amber-500">{summaryData.lowStock}</h4>
        </div>
        
        <div className="p-4 bg-background rounded-lg">
          <span className="text-sm text-text/60">Sem Estoque</span>
          <h4 className="text-xl font-bold text-red-500">{summaryData.outOfStock}</h4>
        </div>
      </div>

      <div className="h-[300px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
} 