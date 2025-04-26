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

export default function AdminPedidos() {
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gerenciamento de Pedidos</h1>
        <div className="flex gap-4">
          <select className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-600">
            <option value="all">Todos os pedidos</option>
            <option value="pending">Pendentes</option>
            <option value="processing">Em processamento</option>
            <option value="shipped">Enviados</option>
            <option value="delivered">Entregues</option>
            <option value="cancelled">Cancelados</option>
          </select>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Exportar
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Aqui virá a lista de pedidos */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 