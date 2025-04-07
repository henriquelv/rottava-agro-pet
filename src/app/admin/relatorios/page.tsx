'use client'

import { useState, useEffect } from 'react'
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { formatPrice } from '@/utils/format'

// Registrando os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

interface VendasPorPeriodo {
  data: string
  total: number
  quantidade: number
}

interface VendasPorCategoria {
  categoria: string
  total: number
  quantidade: number
}

interface ProdutoMaisVendido {
  nome: string
  quantidade: number
  total: number
}

export default function RelatoriosPage() {
  const [periodo, setPeriodo] = useState('7d')
  const [vendasPorPeriodo, setVendasPorPeriodo] = useState<VendasPorPeriodo[]>([])
  const [vendasPorCategoria, setVendasPorCategoria] = useState<VendasPorCategoria[]>([])
  const [produtosMaisVendidos, setProdutosMaisVendidos] = useState<ProdutoMaisVendido[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDados = async () => {
      // Aqui você irá buscar os dados da API
      // Simulando dados
      setVendasPorPeriodo([
        { data: '01/03', total: 1250.90, quantidade: 15 },
        { data: '02/03', total: 980.50, quantidade: 12 },
        { data: '03/03', total: 1520.30, quantidade: 18 },
        { data: '04/03', total: 890.20, quantidade: 10 },
        { data: '05/03', total: 1680.40, quantidade: 20 },
        { data: '06/03', total: 1340.60, quantidade: 16 },
        { data: '07/03', total: 1890.80, quantidade: 22 },
      ])

      setVendasPorCategoria([
        { categoria: 'Rações', total: 4500.80, quantidade: 45 },
        { categoria: 'Acessórios', total: 2800.50, quantidade: 32 },
        { categoria: 'Higiene', total: 1500.20, quantidade: 18 },
        { categoria: 'Medicamentos', total: 2200.40, quantidade: 24 },
      ])

      setProdutosMaisVendidos([
        { nome: 'Ração Golden Special', quantidade: 25, total: 2250.00 },
        { nome: 'Antipulgas Simparic', quantidade: 18, total: 1440.00 },
        { nome: 'Coleira Petz', quantidade: 15, total: 450.00 },
        { nome: 'Shampoo Pet Clean', quantidade: 12, total: 360.00 },
        { nome: 'Ração Whiskas', quantidade: 10, total: 800.00 },
      ])

      setLoading(false)
    }

    fetchDados()
  }, [periodo])

  const vendasLineData = {
    labels: vendasPorPeriodo.map(v => v.data),
    datasets: [
      {
        label: 'Total de Vendas (R$)',
        data: vendasPorPeriodo.map(v => v.total),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Quantidade de Vendas',
        data: vendasPorPeriodo.map(v => v.quantidade),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  }

  const categoriaBarData = {
    labels: vendasPorCategoria.map(v => v.categoria),
    datasets: [
      {
        label: 'Total de Vendas por Categoria (R$)',
        data: vendasPorCategoria.map(v => v.total),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
      },
    ],
  }

  const produtosDoughnutData = {
    labels: produtosMaisVendidos.map(p => p.nome),
    datasets: [
      {
        data: produtosMaisVendidos.map(p => p.quantidade),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Relatórios</h1>
        <select
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
          className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="7d">Últimos 7 dias</option>
          <option value="15d">Últimos 15 dias</option>
          <option value="30d">Últimos 30 dias</option>
          <option value="90d">Últimos 90 dias</option>
        </select>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total de Vendas</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {formatPrice(vendasPorPeriodo.reduce((acc, v) => acc + v.total, 0))}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Quantidade de Vendas</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {vendasPorPeriodo.reduce((acc, v) => acc + v.quantidade, 0)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Ticket Médio</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {formatPrice(
              vendasPorPeriodo.reduce((acc, v) => acc + v.total, 0) / 
              vendasPorPeriodo.reduce((acc, v) => acc + v.quantidade, 0)
            )}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Categorias Vendidas</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {vendasPorCategoria.length}
          </p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendas por Período */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Vendas por Período
          </h3>
          <div className="h-80">
            <Line 
              data={vendasLineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Vendas por Categoria */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Vendas por Categoria
          </h3>
          <div className="h-80">
            <Bar
              data={categoriaBarData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Produtos Mais Vendidos */}
        <div className="bg-white p-6 rounded-lg shadow col-span-1 lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Top 5 Produtos Mais Vendidos
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80">
              <Doughnut
                data={produtosDoughnutData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Qtd.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {produtosMaisVendidos.map((produto) => (
                    <tr key={produto.nome}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {produto.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {produto.quantidade}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatPrice(produto.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 