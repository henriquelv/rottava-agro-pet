'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Link from 'next/link'
import Image from 'next/image'

interface OrderItem {
  id: string
  quantity: number
  price: number
  variant: {
    name: string
    product: {
      name: string
      images: { url: string; alt: string }[]
    }
  }
}

interface Order {
  id: string
  status: string
  total: number
  createdAt: string
  items: OrderItem[]
}

export default function OrdersPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/user/orders')
        if (response.ok) {
          const data = await response.json()
          setOrders(data)
        }
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error)
      } finally {
        setIsLoadingOrders(false)
      }
    }

    if (isAuthenticated) {
      fetchOrders()
    }
  }, [isAuthenticated])

  if (isLoading || isLoadingOrders) {
    return (
      <>
        <Header />
        <main className="container pt-24">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        </main>
      </>
    )
  }

  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmado':
        return 'bg-blue-100 text-blue-800'
      case 'enviado':
        return 'bg-purple-100 text-purple-800'
      case 'entregue':
        return 'bg-green-100 text-green-800'
      case 'cancelado':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <>
      <Header />
      <main className="container pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-text mb-8">Meus Pedidos</h1>

          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm text-text/60">
                          Pedido #{order.id.slice(-6)}
                        </p>
                        <p className="text-sm text-text/60">
                          Realizado em {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 py-4 border-t"
                        >
                          <div className="relative w-20 h-20 flex-shrink-0">
                            <Image
                              src={item.variant.product.images[0].url}
                              alt={item.variant.product.images[0].alt}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-text">
                              {item.variant.product.name}
                            </h3>
                            <p className="text-sm text-text/60">
                              {item.variant.name}
                            </p>
                            <p className="text-sm text-text/60">
                              Quantidade: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-text">
                              R$ {item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-text">Total</p>
                        <p className="font-medium text-text">
                          R$ {order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-text/60 mb-4">
                Você ainda não fez nenhum pedido
              </p>
              <Link
                href="/pet-shop"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
              >
                Começar a Comprar
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  )
} 