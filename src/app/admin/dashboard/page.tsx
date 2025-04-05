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
import { formatPrice } from '@/utils/format'

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
    try {
      await exportDashboardReport(format)
    } catch (error) {
      console.error('Erro ao exportar relatório:', error)
    }
  }

  // Dados reais de vendas e estatísticas
  const stats = [
    {
      title: 'Total de Vendas',
      value: formatPrice(25650),
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
      value: formatPrice(156.30),
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
      total: formatPrice(259.90)
    },
    {
      id: 'PED-00144',
      customer: 'Maria Santos',
      date: '2024-02-25',
      status: 'processing',
      total: formatPrice(189.90)
    },
    {
      id: 'PED-00143',
      customer: 'Pedro Oliveira',
      date: '2024-02-24',
      status: 'completed',
      total: formatPrice(459.90)
    },
    {
      id: 'PED-00142',
      customer: 'Ana Souza',
      date: '2024-02-24',
      status: 'cancelled',
      total: formatPrice(129.80)
    },
    {
      id: 'PED-00141',
      customer: 'Carlos Ferreira',
      date: '2024-02-23',
      status: 'completed',
      total: formatPrice(319.70)
    }
  ]

  // Produtos mais vendidos
  const topProducts = [
    {
      name: 'Ração Golden Special Adultos - 15kg',
      sales: 156,
      revenue: formatPrice(12480)
    },
    {
      name: 'Ração Premier Formula Cães - 15kg',
      sales: 98,
      revenue: formatPrice(9800)
    },
    {
      name: 'Ração Farmina N&D Cães - 10kg',
      sales: 67,
      revenue: formatPrice(8375)
    },
    {
      name: 'Ração Hills Science Diet Gatos - 7,5kg',
      sales: 52,
      revenue: formatPrice(7540)
    },
    {
      name: 'Antipulgas e Carrapatos Bravecto',
      sales: 48,
      revenue: formatPrice(7200)
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
        return 'Em Processamento'
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Warning size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-text mb-2">Erro ao carregar dados</h2>
          <p className="text-text/60 mb-4">{error.message}</p>
          <button
            onClick={refreshData}
            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text">Dashboard</h1>
        <div className="flex gap-4">
          <DashboardFilters
            period={selectedPeriod}
            category={selectedCategory}
            search={searchTerm}
            onPeriodChange={setSelectedPeriod}
            onCategoryChange={setSelectedCategory}
            onSearchChange={setSearchTerm}
          />
          <ExportReport onExport={handleExport} />
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <Link
            key={index}
            href={stat.link}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon size={24} className={`text-${stat.color}-600`} />
              </div>
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUp size={16} className="inline ml-1" /> : <ArrowDown size={16} className="inline ml-1" />}
              </span>
            </div>
            <h3 className="text-sm text-text/60 mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-text">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-text mb-4">Vendas</h2>
          <SalesChart />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-text mb-4">Categorias</h2>
          <CategoryChart />
        </div>
      </div>

      {/* Alertas e Pedidos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-text mb-4">Alertas de Estoque</h2>
          <div className="space-y-4">
            {stockAlerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <Warning size={24} className="text-yellow-500 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-text">{alert.product}</h3>
                  <p className="text-sm text-text/60">{alert.message}</p>
                  {alert.type === 'low_stock' && (
                    <p className="text-sm text-text/60">
                      Estoque atual: {alert.current} | Mínimo: {alert.minimum}
                    </p>
                  )}
                  {alert.type === 'expiring' && (
                    <p className="text-sm text-text/60">
                      Data de vencimento: {new Date(alert.date).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-text mb-4">Pedidos Recentes</h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-text">Pedido {order.id}</h3>
                  <p className="text-sm text-text/60">{order.customer}</p>
                  <p className="text-sm text-text/60">
                    {new Date(order.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                  <p className="font-medium text-text mt-1">{order.total}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Produtos e Categorias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-text mb-4">Produtos Mais Vendidos</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-text">{product.name}</h3>
                  <p className="text-sm text-text/60">{product.sales} vendas</p>
                </div>
                <p className="font-medium text-text">{product.revenue}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-text mb-4">Categorias Mais Vendidas</h2>
          <div className="space-y-4">
            {topCategories.map((category, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-text">{category.name}</h3>
                  <p className="text-sm text-text/60">{category.sales} vendas</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 