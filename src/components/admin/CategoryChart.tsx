import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { defaultOptions, colors } from '@/lib/chart'

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

export default function CategoryChart() {
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

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="h-[300px]">
        <Doughnut data={mockData} options={options} />
      </div>
      
      <div className="mt-6 space-y-3">
        {mockData.labels.map((label, index) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: mockData.datasets[0].backgroundColor[index]
                }}
              />
              <span className="text-sm text-text/60">{label}</span>
            </div>
            <span className="font-medium">{mockData.datasets[0].data[index]}%</span>
          </div>
        ))}
      </div>
    </div>
  )
} 