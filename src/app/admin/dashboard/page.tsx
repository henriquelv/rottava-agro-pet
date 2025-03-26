'use client'

import React, { useState } from 'react'
import {
  ChartLineUp,
  ShoppingCart,
  Package,
  Money,
  Users,
  ArrowUp,
  ArrowDown,
  Warning
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SalesChart type="vendas" />
        <SalesChart type="faturamento" />
      </div>

      {/* Gráfico de Estoque */}
      <div className="mb-8">
        <InventoryChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Categorias */}
        <div className="lg:col-span-1">
          <CategoryChart />
        </div>

        {/* Produtos e Estoque */}
        <div className="lg:col-span-2 space-y-6">
          {/* Produtos Mais Vendidos */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Produtos Mais Vendidos</h2>
            <div className="space-y-4">
              {data.topProducts && data.topProducts.map((produto) => (
                <div key={produto.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{produto.name}</h4>
                    <span className="text-sm text-text/60">
                      {produto.quantity} vendas
                    </span>
                  </div>
                  <span className="font-medium">
                    {formatCurrency(produto.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Alertas de Estoque */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Alertas de Estoque</h2>
            <div className="space-y-4">
              {data.stockAlerts && data.stockAlerts.map((produto) => (
                <div key={produto.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{produto.name}</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-text/60">
                        Quantidade: <strong>{produto.quantity}</strong>
                      </span>
                      <span className="text-text/60">
                        Mínimo: <strong>{produto.minQuantity}</strong>
                      </span>
                    </div>
                  </div>
                  <span className="text-amber-500 font-medium">
                    Repor Estoque
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gestão Financeira */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-6">Gestão Financeira</h2>
        <FinancialManagement />
      </div>
    </div>
  )
} 