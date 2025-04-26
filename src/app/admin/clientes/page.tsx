'use client'

import React, { useState } from 'react'
import {
  User,
  MagnifyingGlass,
  Funnel,
  Envelope,
  Phone,
  MapPin
} from 'phosphor-react'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  orders: number
  totalSpent: number
  lastOrder: string
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(49) 99999-9999',
    address: 'Rua das Flores, 123 - Centro',
    orders: 5,
    totalSpent: 450.00,
    lastOrder: '2024-03-15'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(49) 98888-8888',
    address: 'Av. Principal, 456 - Vila Nova',
    orders: 3,
    totalSpent: 280.00,
    lastOrder: '2024-03-10'
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    email: 'pedro@email.com',
    phone: '(49) 97777-7777',
    address: 'Rua do Comércio, 789 - Centro',
    orders: 1,
    totalSpent: 89.90,
    lastOrder: '2024-03-05'
  }
]

export default function AdminClientes() {
  const [searchTerm, setSearchTerm] = useState('')
  const [customers] = useState<Customer[]>(mockCustomers)

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gerenciamento de Clientes</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar cliente..."
            className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-600"
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Exportar
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600">Total de Clientes</h3>
          <p className="text-3xl font-bold text-gray-900">523</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600">Clientes Ativos</h3>
          <p className="text-3xl font-bold text-green-600">450</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600">Novos Clientes (30 dias)</h3>
          <p className="text-3xl font-bold text-blue-600">73</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pedidos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <User className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-text/60">ID: {customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Envelope className="text-text/40" size={16} />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="text-text/40" size={16} />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="text-text/40" size={16} />
                      <span>{customer.address}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {customer.orders} pedidos
                  </td>
                  <td className="px-6 py-4 text-sm">
                    R$ {customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(customer.lastOrder).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800">Editar</button>
                      <button className="text-red-600 hover:text-red-800">Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 