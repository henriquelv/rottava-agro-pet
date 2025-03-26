import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { ArrowUp, ArrowDown, Coins, ShoppingCart } from 'phosphor-react'
import {
  formatCurrency,
  calculatePercentageChange,
  calculateSalesByPeriod
} from '@/utils/admin'
import { defaultOptions, colors } from '@/lib/chart'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
)

// Dados mock para demonstração
const mockData = {
  vendedores: [
    { id: '1', nome: 'Maria Silva', vendas: 45, valor: 8750.90, meta: 8000 },
    { id: '2', nome: 'João Santos', vendas: 38, valor: 7230.50, meta: 8000 },
    { id: '3', nome: 'Ana Oliveira', vendas: 42, valor: 8120.30, meta: 8000 }
  ],
  vendasPorHora: {
    labels: ['8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h'],
    datasets: [
      {
        label: 'Quantidade de Vendas',
        data: [5, 8, 12, 15, 10, 7, 9, 14, 16, 13, 8],
        backgroundColor: colors.primary.main
      }
    ]
  },
  comparativoMensal: {
    mesAtual: {
      vendas: 234,
      valor: 45678.90
    },
    mesAnterior: {
      vendas: 198,
      valor: 42345.67
    }
  }
}

export default function SalesAnalysis() {
  const options = {
    ...defaultOptions,
    plugins: {
      ...defaultOptions.plugins,
      title: {
        display: true,
        text: 'Vendas por Horário',
        font: {
          size: 16,
          weight: 'bold',
          family: 'Inter'
        }
      }
    }
  }

  // Calcular variações usando a função de utilitário
  const variacaoVendas = calculatePercentageChange(
    mockData.comparativoMensal.mesAtual.vendas,
    mockData.comparativoMensal.mesAnterior.vendas
  )
  const variacaoValor = calculatePercentageChange(
    mockData.comparativoMensal.mesAtual.valor,
    mockData.comparativoMensal.mesAnterior.valor
  )

  return (
    <div className="space-y-6">
      {/* Comparativo Mensal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-text/60">Total de Vendas</span>
              <h3 className="text-2xl font-bold">
                {mockData.comparativoMensal.mesAtual.vendas}
              </h3>
            </div>
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <ShoppingCart size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {variacaoVendas >= 0 ? (
              <ArrowUp className="text-green-500" size={16} weight="bold" />
            ) : (
              <ArrowDown className="text-red-500" size={16} weight="bold" />
            )}
            <span className={variacaoVendas >= 0 ? 'text-green-500' : 'text-red-500'}>
              {Math.abs(variacaoVendas).toFixed(1)}%
            </span>
            <span className="text-text/60">vs mês anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-text/60">Valor Total</span>
              <h3 className="text-2xl font-bold">
                {formatCurrency(mockData.comparativoMensal.mesAtual.valor)}
              </h3>
            </div>
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Coins size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {variacaoValor >= 0 ? (
              <ArrowUp className="text-green-500" size={16} weight="bold" />
            ) : (
              <ArrowDown className="text-red-500" size={16} weight="bold" />
            )}
            <span className={variacaoValor >= 0 ? 'text-green-500' : 'text-red-500'}>
              {Math.abs(variacaoValor).toFixed(1)}%
            </span>
            <span className="text-text/60">vs mês anterior</span>
          </div>
        </div>
      </div>

      {/* Gráfico de Vendas por Horário */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="h-[300px]">
          <Bar data={mockData.vendasPorHora} options={options} />
        </div>
      </div>

      {/* Desempenho dos Vendedores */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Desempenho dos Vendedores</h2>
        <div className="space-y-6">
          {mockData.vendedores.map((vendedor) => {
            const progresso = (vendedor.valor / vendedor.meta) * 100
            return (
              <div key={vendedor.id}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{vendedor.nome}</h4>
                    <div className="flex items-center gap-4 text-sm text-text/60">
                      <span>{vendedor.vendas} vendas</span>
                      <span>{formatCurrency(vendedor.valor)}</span>
                    </div>
                  </div>
                  <span className={`font-medium ${
                    progresso >= 100 ? 'text-green-500' : 'text-amber-500'
                  }`}>
                    {progresso.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      progresso >= 100 ? 'bg-green-500' : 'bg-primary'
                    }`}
                    style={{ width: `${Math.min(progresso, 100)}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 