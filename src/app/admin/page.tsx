'use client'

import { useState, useEffect } from 'react'
import { 
  Package, 
  Tag, 
  Users, 
  ShoppingCart,
  TrendUp,
  TrendDown
} from 'phosphor-react'
import { formatPrice } from '@/utils/format'

interface DashboardStats {
  totalProdutos: number
  totalCategorias: number
  totalClientes: number
  totalVendas: number
  vendasHoje: number
  ticketMedio: number
  produtosMaisVendidos: Array<{
    id: number
    nome: string
    quantidade: number
    total: number
  }>
  categoriasMaisVendidas: Array<{
    categoria: string
    quantidade: number
    total: number
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProdutos: 0,
    totalCategorias: 0,
    totalClientes: 0,
    totalVendas: 0,
    vendasHoje: 0,
    ticketMedio: 0,
    produtosMaisVendidos: [],
    categoriasMaisVendidas: []
  })

  useEffect(() => {
    // Aqui você irá buscar as estatísticas da API
    const fetchStats = async () => {
      // Simulando dados
      setStats({
        totalProdutos: 150,
        totalCategorias: 8,
        totalClientes: 523,
        totalVendas: 1250,
        vendasHoje: 12500.90,
        ticketMedio: 125.50,
        produtosMaisVendidos: [
          {
            id: 1,
            nome: 'Ração Golden Special',
            quantidade: 45,
            total: 7155.50
          },
          {
            id: 2,
            nome: 'Coleira Antipulgas',
            quantidade: 32,
            total: 5280.00
          },
          {
            id: 3,
            nome: 'Areia Higiênica',
            quantidade: 28,
            total: 840.00
          }
        ],
        categoriasMaisVendidas: [
          {
            categoria: 'Rações',
            quantidade: 120,
            total: 19800.00
          },
          {
            categoria: 'Acessórios',
            quantidade: 85,
            total: 8500.00
          },
          {
            categoria: 'Higiene',
            quantidade: 65,
            total: 3250.00
          }
        ]
      })
    }

    fetchStats()
  }, [])

  const cards = [
    {
      title: 'Total de Produtos',
      value: stats.totalProdutos,
      icon: Package,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      title: 'Categorias',
      value: stats.totalCategorias,
      icon: Tag,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      title: 'Clientes',
      value: stats.totalClientes,
      icon: Users,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      title: 'Vendas Realizadas',
      value: stats.totalVendas,
      icon: ShoppingCart,
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <p className="text-gray-600">
          Bem-vindo ao painel administrativo da Rottava Agro Pet.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon
          
          return (
            <div
              key={card.title}
              className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${card.bg}`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {card.value}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Vendas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Vendas de Hoje
            </h2>
            <div className="flex items-center gap-2 text-green-600">
              <TrendUp size={20} />
              <span className="text-sm font-medium">+12%</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {formatPrice(stats.vendasHoje)}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Ticket médio: {formatPrice(stats.ticketMedio)}
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Produtos Mais Vendidos
            </h2>
          </div>
          <div className="space-y-4">
            {stats.produtosMaisVendidos.map((produto) => (
              <div
                key={produto.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-gray-800">{produto.nome}</p>
                  <p className="text-sm text-gray-600">
                    {produto.quantidade} unidades
                  </p>
                </div>
                <p className="font-medium text-gray-900">
                  {formatPrice(produto.total)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categorias */}
      <div className="p-6 bg-white rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Vendas por Categoria
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.categoriasMaisVendidas.map((categoria) => (
            <div
              key={categoria.categoria}
              className="p-4 bg-gray-50 rounded-lg"
            >
              <p className="font-medium text-gray-800">
                {categoria.categoria}
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {formatPrice(categoria.total)}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {categoria.quantidade} vendas
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 