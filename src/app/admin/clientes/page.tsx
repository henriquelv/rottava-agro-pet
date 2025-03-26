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

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [customers] = useState<Customer[]>(mockCustomers)

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Clientes</h1>
        <p className="text-text/60">
          Gerencie os clientes e visualize suas informações
        </p>
      </div>

      {/* Busca */}
      <div className="relative">
        <MagnifyingGlass
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text/40"
          size={20}
        />
        <input
          type="text"
          placeholder="Buscar clientes por nome, email ou telefone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary/20 transition-shadow"
        />
      </div>

      {/* Lista de Clientes */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background">
                <th className="px-6 py-3 text-left text-sm font-medium text-text/60">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-text/60">
                  Contato
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-text/60">
                  Endereço
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-text/60">
                  Pedidos
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-text/60">
                  Total Gasto
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-text/60">
                  Último Pedido
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 