'use client'

import React, { useState } from 'react'
import {
  ShoppingCart,
  MagnifyingGlass,
  Funnel,
  Export,
  Printer,
  CaretDown,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  CurrencyCircleDollar
} from 'phosphor-react'
import { formatCurrency } from '@/utils/format'

interface Order {
  id: string
  customer: {
    name: string
    email: string
    phone?: string
  }
  items: {
    product: {
      id: string
      name: string
      price: number
    }
    quantity: number
  }[]
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'refunded'
  paymentMethod: string
  shipping: {
    address: string
    method: string
    status: 'pending' | 'shipped' | 'delivered'
    tracking?: string
  }
  subtotal: number
  shipping_cost: number
  discount?: number
  total: number
  createdAt: string
  updatedAt: string
}

export default function SalesPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '#12345',
      customer: {
        name: 'João Silva',
        email: 'joao@email.com',
        phone: '(11) 98765-4321'
      },
      items: [
        {
          product: {
            id: '1',
            name: 'Ração Golden Special',
            price: 189.90
          },
          quantity: 2
        }
      ],
      status: 'processing',
      paymentStatus: 'paid',
      paymentMethod: 'Cartão de Crédito',
      shipping: {
        address: 'Rua das Flores, 123',
        method: 'Sedex',
        status: 'pending'
      },
      subtotal: 379.80,
      shipping_cost: 25.00,
      total: 404.80,
      createdAt: '2024-02-10T10:00:00',
      updatedAt: '2024-02-10T10:00:00'
    }
  ])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('all')
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  })

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return Clock
      case 'processing':
        return Truck
      case 'completed':
        return CheckCircle
      case 'cancelled':
        return XCircle
      default:
        return Clock
    }
  }

  // Estatísticas
  const stats = [
    {
      title: 'Total de Vendas',
      value: formatCurrency(orders.reduce((acc, order) => acc + order.total, 0)),
      icon: CurrencyCircleDollar,
      color: 'blue'
    },
    {
      title: 'Pedidos',
      value: orders.length.toString(),
      icon: ShoppingCart,
      color: 'green'
    },
    {
      title: 'Ticket Médio',
      value: formatCurrency(
        orders.reduce((acc, order) => acc + order.total, 0) / orders.length || 0
      ),
      icon: CurrencyCircleDollar,
      color: 'purple'
    }
  ]

  // Ações em lote
  const bulkActions = [
    {
      label: 'Exportar',
      icon: Export,
      action: () => handleExport()
    },
    {
      label: 'Imprimir',
      icon: Printer,
      action: () => handlePrint()
    }
  ]

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vendas</h1>
        <p className="mt-1 text-sm text-gray-600">
          Gerencie os pedidos e vendas
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            purple: 'bg-purple-50 text-purple-600'
          }
          const iconColorClass = colorClasses[stat.color as keyof typeof colorClasses]

          return (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${iconColorClass}`}>
                  <Icon size={24} weight="fill" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
              <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
        {/* Busca */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <MagnifyingGlass
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar pedidos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Funnel className="text-gray-400" size={20} />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">Todos os status</option>
              <option value="pending">Pendentes</option>
              <option value="processing">Em processamento</option>
              <option value="completed">Concluídos</option>
              <option value="cancelled">Cancelados</option>
            </select>
          </div>

          <select
            value={selectedPaymentStatus}
            onChange={(e) => setSelectedPaymentStatus(e.target.value)}
            className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">Todos os pagamentos</option>
            <option value="pending">Pendentes</option>
            <option value="paid">Pagos</option>
            <option value="refunded">Reembolsados</option>
          </select>

          <div className="flex items-center gap-2">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-gray-400">até</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Ações em lote */}
        {selectedOrders.length > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-gray-600">
              {selectedOrders.length} selecionados
            </span>
            {bulkActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-50"
              >
                <action.icon size={18} />
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lista de Pedidos */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === orders.length}
                    onChange={() => {
                      if (selectedOrders.length === orders.length) {
                        setSelectedOrders([])
                      } else {
                        setSelectedOrders(orders.map(o => o.id))
                      }
                    }}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Pedido
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Pagamento
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Data
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => {
                const StatusIcon = getStatusIcon(order.status)

                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => {
                          if (selectedOrders.includes(order.id)) {
                            setSelectedOrders(selectedOrders.filter(id => id !== order.id))
                          } else {
                            setSelectedOrders([...selectedOrders, order.id])
                          }
                        }}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">
                        {order.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {order.customer.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.customer.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          getStatusColor(order.status)
                        }`}>
                          <StatusIcon size={14} />
                          <span>
                            {order.status === 'pending' ? 'Pendente' :
                             order.status === 'processing' ? 'Em processamento' :
                             order.status === 'completed' ? 'Concluído' :
                             'Cancelado'}
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.paymentStatus === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : order.paymentStatus === 'refunded'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.paymentStatus === 'paid' ? 'Pago' :
                           order.paymentStatus === 'refunded' ? 'Reembolsado' :
                           'Pendente'}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">
                          {order.paymentMethod}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {formatCurrency(order.total)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-900">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end">
                        <button className="text-gray-400 hover:text-gray-600">
                          <CaretDown size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 