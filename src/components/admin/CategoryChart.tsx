import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { defaultOptions, colors } from '@/lib/chart'

interface CategoryChartProps {
  data?: {
    labels: string[]
    datasets: {
      data: number[]
      backgroundColor: string[]
      borderWidth: number
    }[]
  }
}

// Dados mock para demonstração
const mockData = {
  labels: ['Ração', 'Medicamentos', 'Acessórios', 'Higiene', 'Brinquedos'],
  datasets: [
    {
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        colors.primary.main,
        colors.success.main,
        colors.warning.main,
        colors.error.main,
        colors.primary.light
      ],
      borderWidth: 0
    }
  ]
}

export default function CategoryChart({ data }: CategoryChartProps) {
  const chartData = data || mockData

  const options = {
    ...defaultOptions,
    plugins: {
      ...defaultOptions.plugins,
      title: {
        display: true,
        text: 'Vendas por Categoria',
        font: {
          size: 16,
          weight: 'bold',
          family: 'Inter'
        }
      },
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle'
        }
      }
    },
    cutout: '60%'
  }

  if (!chartData?.labels || !chartData?.datasets) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-center h-[300px]">
        <p className="text-text/60">Nenhum dado disponível</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="h-[300px]">
        <Doughnut data={chartData} options={options} />
      </div>
      
      <div className="mt-6 space-y-3">
        {chartData.labels.map((label, index) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: chartData.datasets[0].backgroundColor[index]
                }}
              />
              <span className="text-sm text-text/60">{label}</span>
            </div>
            <span className="font-medium">{chartData.datasets[0].data[index]}%</span>
          </div>
        ))}
      </div>
    </div>
  )
} 