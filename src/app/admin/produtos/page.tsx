'use client'

import React, { useState, useEffect } from 'react'
import {
  Plus,
  Pencil,
  Trash,
  Package,
  MagnifyingGlass,
  Funnel,
  ArrowUp,
  ArrowDown,
  Export,
  UploadSimple,
  Barcode,
  Tag,
  Archive,
  Truck,
  QrCode
} from 'phosphor-react'
import { ProductForm } from '@/components/admin/ProductForm'
import { formatCurrency } from '@/utils/format'
import { products as initialProducts } from '@/data/products'
import { Product, StockMovement } from '@/types/product'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/utils/format'

interface Product {
  id: string
  name: string
  slug: string
  codigo: string
  description: string
  descricao_detalhada: string
  price: number
  compareAtPrice?: number
  images: {
    url: string
    alt: string
  }[]
  category: string
  brand: string
  rating: number
  reviewCount: number
  tags: string[]
  stock: number
  minStock: number
  status: string
}

interface StockMovement {
  id: string
  productId: string
  type: 'in' | 'out'
  quantity: number
  reason?: string
  createdAt: string
}

type SortField = 'name' | 'price' | 'category' | 'stock'
type SortDirection = 'asc' | 'desc'

export default function AdminProdutos() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gerenciamento de Produtos</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Adicionar Produto
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Aqui virá a lista de produtos */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 