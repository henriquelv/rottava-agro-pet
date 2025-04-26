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

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <a href="/admin/produtos" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Produtos</h2>
          <p className="text-gray-600">Gerenciar produtos do catálogo</p>
        </a>
        <a href="/admin/categorias" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Categorias</h2>
          <p className="text-gray-600">Gerenciar categorias de produtos</p>
        </a>
        <a href="/admin/pedidos" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Pedidos</h2>
          <p className="text-gray-600">Visualizar e gerenciar pedidos</p>
        </a>
        <a href="/admin/estoque" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Estoque</h2>
          <p className="text-gray-600">Controle de estoque</p>
        </a>
        <a href="/admin/clientes" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Clientes</h2>
          <p className="text-gray-600">Gerenciar clientes</p>
        </a>
      </div>
    </div>
  );
} 