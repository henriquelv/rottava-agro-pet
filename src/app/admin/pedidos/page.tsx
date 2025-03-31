'use client'

import React, { useState, useEffect } from 'react'
import {
  MagnifyingGlass,
  Funnel,
  Export,
  Tag,
  Truck,
  ArrowUp,
  ArrowDown,
  Eye,
  Printer,
  Warning,
  Clock,
  CheckCircle,
  X,
} from 'phosphor-react'
import Link from 'next/link'
import { formatCurrency } from '@/utils/format'

interface Order {
  id: string
  number: string
  customer: {
    name: string
    email: string
    phone: string
  }
  date: string
  total: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded'
  payment: {
    method: string
    status: string
  }
  shipping: {
    method: string
    tracking: string
    status: string
    address: {
      street: string
      number: string
      complement?: string
      neighborhood: string
      city: string
      state: string
      zipcode: string
    }
  }
  items: {
    id: string
    product: string
    quantity: number
    price: number
    total: number
  }[]
}

const mockOrders: Order[] = [
  {
    id: '1',
    number: 'PED-00001',
    customer: {
      name: 'João Silva',
      email: 'joao@example.com',
      phone: '(49) 99999-1111'
    },
    date: '2024-02-25T14:30:00',
    total: 259.9,
    status: 'pending',
    payment: {
      method: 'Cartão de Crédito',
      status: 'authorized'
    },
    shipping: {
      method: 'Entrega Padrão',
      tracking: '',
      status: 'waiting',
      address: {
        street: 'Rua das Flores',
        number: '123',
        neighborhood: 'Centro',
        city: 'Chapecó',
        state: 'SC',
        zipcode: '89801-001'
      }
    },
    items: [
      {
        id: '1',
        product: 'Ração Golden Special Adultos - 15kg',
        quantity: 1,
        price: 179.9,
        total: 179.9
      },
      {
        id: '2',
        product: 'Coleira para Cães Grandes',
        quantity: 2,
        price: 39.9,
        total: 79.8
      }
    ]
  },
  {
    id: '2',
    number: 'PED-00002',
    customer: {
      name: 'Maria Santos',
      email: 'maria@example.com',
      phone: '(49) 98888-2222'
    },
    date: '2024-02-25T10:15:00',
    total: 189.9,
    status: 'processing',
    payment: {
      method: 'PIX',
      status: 'paid'
    },
    shipping: {
      method: 'Entrega Expressa',
      tracking: 'BR1234567890',
      status: 'shipped',
      address: {
        street: 'Av. Principal',
        number: '555',
        complement: 'Apto 302',
        neighborhood: 'Jardim Europa',
        city: 'Chapecó',
        state: 'SC',
        zipcode: '89802-002'
      }
    },
    items: [
      {
        id: '3',
        product: 'Ração Premier Formula Gatos - 10kg',
        quantity: 1,
        price: 159.9,
        total: 159.9
      },
      {
        id: '4',
        product: 'Brinquedo para Gatos',
        quantity: 2,
        price: 15,
        total: 30
      }
    ]
  },
  {
    id: '3',
    number: 'PED-00003',
    customer: {
      name: 'Pedro Oliveira',
      email: 'pedro@example.com',
      phone: '(49) 97777-3333'
    },
    date: '2024-02-24T16:45:00',
    total: 459.9,
    status: 'completed',
    payment: {
      method: 'Boleto',
      status: 'paid'
    },
    shipping: {
      method: 'Retirada na Loja',
      tracking: '',
      status: 'delivered',
      address: {
        street: 'Av. Central',
        number: '789',
        neighborhood: 'Centro',
        city: 'Chapecó',
        state: 'SC',
        zipcode: '89801-003'
      }
    },
    items: [
      {
        id: '5',
        product: 'Ração Royal Canin - 15kg',
        quantity: 1,
        price: 259.9,
        total: 259.9
      },
      {
        id: '6',
        product: 'Kit Petiscos Premium',
        quantity: 2,
        price: 49.9,
        total: 99.8
      },
      {
        id: '7',
        product: 'Cama para Cachorro Grande',
        quantity: 1,
        price: 99.9,
        total: 99.9
      }
    ]
  },
  {
    id: '4',
    number: 'PED-00004',
    customer: {
      name: 'Ana Souza',
      email: 'ana@example.com',
      phone: '(49) 96666-4444'
    },
    date: '2024-02-24T09:30:00',
    total: 129.8,
    status: 'cancelled',
    payment: {
      method: 'Cartão de Crédito',
      status: 'refunded'
    },
    shipping: {
      method: 'Entrega Padrão',
      tracking: '',
      status: 'cancelled',
      address: {
        street: 'Rua das Palmeiras',
        number: '456',
        neighborhood: 'Jardim América',
        city: 'Chapecó',
        state: 'SC',
        zipcode: '89802-004'
      }
    },
    items: [
      {
        id: '8',
        product: 'Shampoo Pet Premium',
        quantity: 2,
        price: 34.9,
        total: 69.8
      },
      {
        id: '9',
        product: 'Escova para Pelos Longos',
        quantity: 1,
        price: 29.9,
        total: 29.9
      },
      {
        id: '10',
        product: 'Anti-pulgas',
        quantity: 1,
        price: 29.9,
        total: 29.9
      }
    ]
  },
  {
    id: '5',
    number: 'PED-00005',
    customer: {
      name: 'Carlos Ferreira',
      email: 'carlos@example.com',
      phone: '(49) 95555-5555'
    },
    date: '2024-02-23T13:15:00',
    total: 319.7,
    status: 'refunded',
    payment: {
      method: 'PIX',
      status: 'refunded'
    },
    shipping: {
      method: 'Entrega Expressa',
      tracking: 'BR0987654321',
      status: 'returned',
      address: {
        street: 'Rua dos Pássaros',
        number: '888',
        complement: 'Casa 2',
        neighborhood: 'Boa Vista',
        city: 'Chapecó',
        state: 'SC',
        zipcode: '89801-005'
      }
    },
    items: [
      {
        id: '11',
        product: 'Ração Hills Science Diet - 12kg',
        quantity: 1,
        price: 269.9,
        total: 269.9
      },
      {
        id: '12',
        product: 'Suplemento Vitamínico',
        quantity: 1,
        price: 49.8,
        total: 49.8
      }
    ]
  }
];

type SortField = 'date' | 'total' | 'status' | 'number'
type SortDirection = 'asc' | 'desc'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showModal, setShowModal] = useState(false)

  // Função auxiliar para formatação de data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  // Função para obter cor do status
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
      case 'refunded':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Função para obter texto do status
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
      case 'refunded':
        return 'Reembolsado'
      default:
        return 'Desconhecido'
    }
  }

  // Filtragem de pedidos
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  // Ordenação de pedidos
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1
    
    switch (sortField) {
      case 'date':
        return direction * (new Date(a.date).getTime() - new Date(b.date).getTime())
      case 'total':
        return direction * (a.total - b.total)
      case 'status':
        return direction * a.status.localeCompare(b.status)
      case 'number':
        return direction * a.number.localeCompare(b.number)
      default:
        return 0
    }
  })

  // Alternar ordenação
  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Função para simular atualização de status
  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus } 
          : order
      )
    )
    setShowModal(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Gerenciamento de Pedidos</h1>
          <p className="text-text/60">
            Visualize e gerencie todos os pedidos da loja
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-4 sm:mt-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlass size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5"
              placeholder="Buscar pedidos..."
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5"
          >
            <option value="all">Todos os status</option>
            <option value="pending">Pendentes</option>
            <option value="processing">Em processamento</option>
            <option value="completed">Concluídos</option>
            <option value="cancelled">Cancelados</option>
            <option value="refunded">Reembolsados</option>
          </select>
          
          <button
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-white bg-primary rounded-lg hover:bg-primary/90"
          >
            <Export size={18} />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Tabela de Pedidos */}
      <div className="bg-white overflow-hidden shadow-sm rounded-lg mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort('number')}
                >
                  <div className="flex items-center gap-1">
                    Pedido
                    {sortField === 'number' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort('date')}
                >
                  <div className="flex items-center gap-1">
                    Data
                    {sortField === 'date' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort('total')}
                >
                  <div className="flex items-center gap-1">
                    Total
                    {sortField === 'total' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort('status')}
                >
                  <div className="flex items-center gap-1">
                    Status
                    {sortField === 'status' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedOrders.length > 0 ? (
                sortedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{order.customer.name}</span>
                        <span className="text-xs">{order.customer.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order)
                            setShowModal(true)
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Eye size={18} />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Printer size={18} />
                        </button>
                        <button className="text-primary hover:text-primary/80">
                          <Truck size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    Nenhum pedido encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalhes do Pedido */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                Detalhes do Pedido {selectedOrder.number}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Informações do Cliente</h4>
                  <p className="text-sm mb-1"><span className="font-medium">Nome:</span> {selectedOrder.customer.name}</p>
                  <p className="text-sm mb-1"><span className="font-medium">Email:</span> {selectedOrder.customer.email}</p>
                  <p className="text-sm"><span className="font-medium">Telefone:</span> {selectedOrder.customer.phone}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Informações do Pedido</h4>
                  <p className="text-sm mb-1"><span className="font-medium">Data:</span> {formatDate(selectedOrder.date)}</p>
                  <p className="text-sm mb-1"><span className="font-medium">Total:</span> {formatCurrency(selectedOrder.total)}</p>
                  <p className="text-sm">
                    <span className="font-medium">Status:</span> 
                    <span className={`ml-1 px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusText(selectedOrder.status)}
                    </span>
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Endereço de Entrega</h4>
                  <p className="text-sm mb-1">
                    {selectedOrder.shipping.address.street}, {selectedOrder.shipping.address.number}
                    {selectedOrder.shipping.address.complement && `, ${selectedOrder.shipping.address.complement}`}
                  </p>
                  <p className="text-sm mb-1">{selectedOrder.shipping.address.neighborhood}</p>
                  <p className="text-sm mb-1">{selectedOrder.shipping.address.city} - {selectedOrder.shipping.address.state}</p>
                  <p className="text-sm">CEP: {selectedOrder.shipping.address.zipcode}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Itens do Pedido</h4>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-100">
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produto</th>
                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Qtd</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Preço</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.product}</td>
                          <td className="px-4 py-3 text-sm text-gray-500 text-center">{item.quantity}</td>
                          <td className="px-4 py-3 text-sm text-gray-500 text-right">{formatCurrency(item.price)}</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{formatCurrency(item.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50">
                        <td colSpan={3} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">Total do Pedido</td>
                        <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">{formatCurrency(selectedOrder.total)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Fechar
                </button>
                
                {selectedOrder.status === 'pending' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'processing')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Processar Pedido
                  </button>
                )}
                
                {selectedOrder.status === 'processing' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'completed')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Marcar como Concluído
                  </button>
                )}
                
                {(selectedOrder.status === 'pending' || selectedOrder.status === 'processing') && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Cancelar Pedido
                  </button>
                )}
                
                <button
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  Imprimir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 