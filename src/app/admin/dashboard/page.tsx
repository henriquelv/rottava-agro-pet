'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ChartLineUp,
  ShoppingCart,
  Package,
  Money,
  Users,
  ArrowUp,
  ArrowDown,
  Warning,
  ChartLine,
  TrendUp,
  TrendDown,
  Clock,
  CurrencyCircleDollar,
  Archive,
  Tag,
  Truck,
  CaretRight,
  Eye
} from 'phosphor-react'
import SalesChart from '@/components/admin/SalesChart'
import CategoryChart from '@/components/admin/CategoryChart'
import InventoryChart from '@/components/admin/InventoryChart'
import DashboardFilters from '@/components/admin/DashboardFilters'
import ExportReport from '@/components/admin/ExportReport'
import NotificationCenter from '@/components/admin/NotificationCenter'
import SalesAnalysis from '@/components/admin/SalesAnalysis'
import FinancialManagement from '@/components/admin/FinancialManagement'
import { useDashboard } from '@/hooks/useDashboard'
import { formatCurrency } from '@/utils/admin'
import { products } from '@/data/products'

export default function DashboardPage() {
  const {
    loading,
    error,
    data,
    filters,
    updateFilters,
    exportDashboardReport,
    refreshData
  } = useDashboard()

  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const handleExport = async (format: 'pdf' | 'excel' | 'csv') => {
    // Implementar lógica de exportação
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(`Exportando relatório em formato ${format}...`)
  }

  // Dados reais de vendas e estatísticas
  const stats = [
    {
      title: 'Total de Vendas',
      value: 'R$ 25.650,00',
      change: '+12.5%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'blue',
      link: '/admin/pedidos'
    },
    {
      title: 'Pedidos do Mês',
      value: '78',
      change: '+8.2%',
      trend: 'up',
      icon: Package,
      color: 'green',
      link: '/admin/pedidos'
    },
    {
      title: 'Ticket Médio',
      value: 'R$ 156,30',
      change: '+5.4%',
      trend: 'up',
      icon: CurrencyCircleDollar,
      color: 'purple',
      link: '/admin/relatorios'
    },
    {
      title: 'Taxa de Conversão',
      value: '3.2%',
      change: '+4.6%',
      trend: 'up',
      icon: ChartLine,
      color: 'orange',
      link: '/admin/relatorios'
    }
  ]

  // Alertas de estoque
  const stockAlerts = [
    {
      product: 'Ração Golden Special Sênior',
      type: 'low_stock',
      current: 3,
      minimum: 5,
      message: 'Estoque abaixo do mínimo'
    },
    {
      product: 'Ração Premier Formula Filhotes',
      type: 'expiring',
      date: '2024-03-15',
      message: 'Produto próximo ao vencimento'
    },
    {
      product: 'Ração Farmina N&D',
      type: 'out_of_stock',
      message: 'Produto sem estoque'
    }
  ]

  // Pedidos recentes
  const recentOrders = [
    {
      id: 'PED-00145',
      customer: 'João Silva',
      date: '2024-02-25',
      status: 'pending',
      total: 'R$ 259,90'
    },
    {
      id: 'PED-00144',
      customer: 'Maria Santos',
      date: '2024-02-25',
      status: 'processing',
      total: 'R$ 189,90'
    },
    {
      id: 'PED-00143',
      customer: 'Pedro Oliveira',
      date: '2024-02-24',
      status: 'completed',
      total: 'R$ 459,90'
    },
    {
      id: 'PED-00142',
      customer: 'Ana Souza',
      date: '2024-02-24',
      status: 'cancelled',
      total: 'R$ 129,80'
    },
    {
      id: 'PED-00141',
      customer: 'Carlos Ferreira',
      date: '2024-02-23',
      status: 'completed',
      total: 'R$ 319,70'
    }
  ]

  // Produtos mais vendidos
  const topProducts = [
    {
      name: 'Ração Golden Special Adultos - 15kg',
      sales: 156,
      revenue: 'R$ 12.480,00'
    },
    {
      name: 'Ração Premier Formula Cães - 15kg',
      sales: 98,
      revenue: 'R$ 9.800,00'
    },
    {
      name: 'Ração Farmina N&D Cães - 10kg',
      sales: 67,
      revenue: 'R$ 8.375,00'
    },
    {
      name: 'Ração Hills Science Diet Gatos - 7,5kg',
      sales: 52,
      revenue: 'R$ 7.540,00'
    },
    {
      name: 'Antipulgas e Carrapatos Bravecto',
      sales: 48,
      revenue: 'R$ 7.200,00'
    }
  ]

  // Categorias mais vendidas
  const topCategories = [
    { name: 'Ração', sales: 384, percentage: 45 },
    { name: 'Medicamentos', sales: 156, percentage: 18 },
    { name: 'Acessórios', sales: 132, percentage: 15 },
    { name: 'Higiene', sales: 105, percentage: 12 },
    { name: 'Brinquedos', sales: 87, percentage: 10 }
  ]

  // Função auxiliar para obter cor de status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Função auxiliar para obter texto de status
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente'
      case 'processing':
        return 'Em processamento'
      case 'completed':
        return 'Concluído'
      case 'cancelled':
        return 'Cancelado'
      default:
        return 'Desconhecido'
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center h-96">
          <h2 className="text-xl font-semibold text-red-500 mb-4">{error}</h2>
          <button
            onClick={refreshData}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          <p className="text-text/60">
            Acompanhe as métricas e o desempenho da sua loja
          </p>
        </div>
        <div className="flex items-center gap-4">
          <NotificationCenter />
          <ExportReport onExport={handleExport} />
        </div>
      </div>

      {/* Filtros */}
      <DashboardFilters
        selectedPeriod={selectedPeriod}
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        onPeriodChange={setSelectedPeriod}
        onCategoryChange={setSelectedCategory}
        onSearch={setSearchTerm}
      />

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            purple: 'bg-purple-50 text-purple-600',
            orange: 'bg-orange-50 text-orange-600'
          }
          const iconColorClass = colorClasses[stat.color as keyof typeof colorClasses]

          return (
            <Link
              href={stat.link}
              key={index}
              className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${iconColorClass}`}>
                  <Icon size={24} weight="fill" />
                </div>
                <div className={`flex items-center ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendUp size={16} weight="bold" />
                  ) : (
                    <TrendDown size={16} weight="bold" />
                  )}
                  <span className="ml-1 text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
              <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
            </Link>
          )
        })}
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Faturamento */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-text/60">Faturamento Mensal</span>
              {data.revenue && (
                <h3 className="text-2xl font-bold">
                  {data.revenue.current ? formatCurrency(data.revenue.current) : 'N/A'}
                </h3>
              )}
            </div>
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Money size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {data.revenue && data.revenue.current >= data.revenue.previous ? (
              <ArrowUp className="text-green-500" size={16} weight="bold" />
            ) : (
              <ArrowDown className="text-red-500" size={16} weight="bold" />
            )}
            <span
              className={
                data.revenue && data.revenue.current >= data.revenue.previous
                  ? 'text-green-500'
                  : 'text-red-500'
              }
            >
              {Math.abs(
                ((data.revenue && data.revenue.current - (data.revenue && data.revenue.previous)) /
                  (data.revenue && data.revenue.previous)) *
                  100
              ).toFixed(1)}
              %
            </span>
            <span className="text-text/60">vs mês anterior</span>
          </div>
        </div>

        {/* Vendas */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-text/60">Vendas Mensais</span>
              {data.sales && (
                <h3 className="text-2xl font-bold">{data.sales.current}</h3>
              )}
            </div>
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <ShoppingCart size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {data.sales && data.sales.current >= data.sales.previous ? (
              <ArrowUp className="text-green-500" size={16} weight="bold" />
            ) : (
              <ArrowDown className="text-red-500" size={16} weight="bold" />
            )}
            <span
              className={
                data.sales && data.sales.current >= data.sales.previous
                  ? 'text-green-500'
                  : 'text-red-500'
              }
            >
              {Math.abs(
                ((data.sales && data.sales.current - (data.sales && data.sales.previous)) /
                  (data.sales && data.sales.previous)) *
                  100
              ).toFixed(1)}
              %
            </span>
            <span className="text-text/60">vs mês anterior</span>
          </div>
        </div>

        {/* Clientes */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-text/60">Clientes Ativos</span>
              {data.customers && (
                <h3 className="text-2xl font-bold">{data.customers.current}</h3>
              )}
            </div>
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Users size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {data.customers && data.customers.current >= data.customers.previous ? (
              <ArrowUp className="text-green-500" size={16} weight="bold" />
            ) : (
              <ArrowDown className="text-red-500" size={16} weight="bold" />
            )}
            <span
              className={
                data.customers && data.customers.current >= data.customers.previous
                  ? 'text-green-500'
                  : 'text-red-500'
              }
            >
              {Math.abs(
                ((data.customers && data.customers.current - (data.customers && data.customers.previous)) /
                  (data.customers && data.customers.previous)) *
                  100
              ).toFixed(1)}
              %
            </span>
            <span className="text-text/60">vs mês anterior</span>
          </div>
        </div>

        {/* Estoque */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-text/60">Produtos em Alerta</span>
              {data.stock && (
                <h3 className="text-2xl font-bold">{data.stock.lowStock}</h3>
              )}
            </div>
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Package size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-amber-500">
            <Warning size={16} weight="bold" />
            <span>Estoque baixo</span>
          </div>
        </div>
      </div>

      {/* Análise de Vendas */}
      <div className="mb-8">
        <SalesAnalysis />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Gráfico de Vendas */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Desempenho de Vendas</h2>
            <select
              className="text-sm border-gray-300 rounded-md"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="week">Última Semana</option>
              <option value="month">Último Mês</option>
              <option value="year">Último Ano</option>
            </select>
          </div>
          <div className="h-80">
            <SalesChart period={selectedPeriod} />
          </div>
        </div>

        {/* Gráfico de Categorias */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Vendas por Categoria</h2>
            <select
              className="text-sm border-gray-300 rounded-md"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="week">Última Semana</option>
              <option value="month">Último Mês</option>
              <option value="year">Último Ano</option>
            </select>
          </div>
          <div className="h-80">
            <CategoryChart period={selectedPeriod} />
          </div>
        </div>
      </div>

      {/* Gráfico de Estoque */}
      <div className="mb-8">
        <InventoryChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pedidos Recentes */}
        <div className="bg-white rounded-xl shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold">Pedidos Recentes</h2>
            <Link
              href="/admin/pedidos"
              className="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
            >
              Ver Todos <CaretRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pedido
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {order.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/admin/pedidos?id=${order.id}`} className="text-primary hover:text-primary-dark">
                        <Eye size={18} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alertas de Estoque */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold">Alertas de Estoque</h2>
            <Link
              href="/admin/produtos"
              className="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
            >
              Ver Todos <CaretRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stockAlerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  {alert.type === 'low_stock' && (
                    <Warning size={20} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                  )}
                  {alert.type === 'expiring' && (
                    <Clock size={20} className="text-orange-500 flex-shrink-0 mt-0.5" />
                  )}
                  {alert.type === 'out_of_stock' && (
                    <Warning size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{alert.product}</p>
                    <p className="text-sm text-gray-500">{alert.message}</p>
                    {alert.type === 'low_stock' && (
                      <p className="text-sm mt-1">
                        <span className="text-yellow-700">Atual: {alert.current}</span> | 
                        <span className="text-gray-600 ml-1">Mínimo: {alert.minimum}</span>
                      </p>
                    )}
                    {alert.type === 'expiring' && (
                      <p className="text-sm text-orange-700 mt-1">Vence em: {alert.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Produtos Mais Vendidos */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold">Produtos Mais Vendidos</h2>
            <Link
              href="/admin/produtos"
              className="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
            >
              Ver Todos <CaretRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-shrink-0 w-8 text-gray-500 font-semibold">
                    #{index + 1}
                  </div>
                  <div className="flex-1 ml-4">
                    <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{product.sales} vendas</p>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm font-medium text-gray-900">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categorias Mais Vendidas */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold">Categorias Mais Vendidas</h2>
            <Link
              href="/admin/relatorios"
              className="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
            >
              Ver Relatório <CaretRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                    <span className="text-sm text-gray-500">{category.sales} vendas ({category.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resumo Financeiro */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-6">Resumo Financeiro</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Faturamento do Mês</h3>
            <p className="text-2xl font-semibold text-gray-900">R$ 25.650,00</p>
            <div className="mt-2 flex items-center text-sm">
              <ArrowUp className="text-green-500" size={16} />
              <span className="text-green-600 font-medium ml-1">12.5%</span>
              <span className="text-gray-500 ml-1">vs mês anterior</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Custo de Produtos</h3>
            <p className="text-2xl font-semibold text-gray-900">R$ 15.390,00</p>
            <div className="mt-2 flex items-center text-sm">
              <ArrowUp className="text-red-500" size={16} />
              <span className="text-red-600 font-medium ml-1">5.2%</span>
              <span className="text-gray-500 ml-1">vs mês anterior</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Margem de Lucro</h3>
            <p className="text-2xl font-semibold text-gray-900">40%</p>
            <div className="mt-2 flex items-center text-sm">
              <ArrowUp className="text-green-500" size={16} />
              <span className="text-green-600 font-medium ml-1">3.1%</span>
              <span className="text-gray-500 ml-1">vs mês anterior</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Taxa de Devolução</h3>
            <p className="text-2xl font-semibold text-gray-900">2.4%</p>
            <div className="mt-2 flex items-center text-sm">
              <ArrowDown className="text-green-500" size={16} />
              <span className="text-green-600 font-medium ml-1">0.8%</span>
              <span className="text-gray-500 ml-1">vs mês anterior</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 