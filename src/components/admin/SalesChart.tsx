import React from 'react'
import { Line } from 'react-chartjs-2'
import { defaultOptions, colors } from '@/lib/chart'
import { formatCurrency } from '@/utils/admin'

interface SalesChartProps {
  type: 'vendas' | 'faturamento'
}

// Dados mock para demonstração
const mockData = {
  vendas: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: '2024',
        data: [150, 165, 180, 170, 160, 185, 190, 185, 180, 175, 190, 195],
        borderColor: colors.primary.main,
        backgroundColor: colors.primary.light,
        tension: 0.4,
        fill: true
      },
      {
        label: '2023',
        data: [140, 155, 165, 155, 150, 170, 175, 170, 165, 160, 175, 180],
        borderColor: colors.text[400],
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  },
  faturamento: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: '2024',
        data: [45000, 48000, 52000, 49000, 47000, 53000, 55000, 54000, 52000, 51000, 54000, 56000],
        borderColor: colors.success.main,
        backgroundColor: colors.success.light,
        tension: 0.4,
        fill: true
      },
      {
        label: '2023',
        data: [42000, 45000, 48000, 46000, 44000, 49000, 51000, 50000, 48000, 47000, 50000, 52000],
        borderColor: colors.text[400],
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  }
}

const options = {
  ...defaultOptions,
  plugins: {
    ...defaultOptions.plugins,
    title: {
      display: true,
      font: {
        size: 16,
        weight: 'bold',
        family: 'Inter'
      }
    }
  },
  scales: {
    ...defaultOptions.scales,
    y: {
      ...defaultOptions.scales.y,
      beginAtZero: true,
      ticks: {
        ...defaultOptions.scales.y.ticks,
        callback: (value: number) => {
          if (value >= 1000) {
            return `${value / 1000}k`
          }
          return value
        }
      }
    }
  }
}

export default function SalesChart({ type }: SalesChartProps) {
  const chartOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      title: {
        ...options.plugins.title,
        text: type === 'vendas' ? 'Evolução de Vendas' : 'Evolução do Faturamento'
      }
    },
    scales: {
      ...options.scales,
      y: {
        ...options.scales.y,
        ticks: {
          ...options.scales.y.ticks,
          callback: (value: number) => {
            if (type === 'faturamento') {
              return formatCurrency(value)
            }
            return value
          }
        }
      }
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="h-[400px]">
        <Line data={mockData[type]} options={chartOptions} />
      </div>
    </div>
  )
} 