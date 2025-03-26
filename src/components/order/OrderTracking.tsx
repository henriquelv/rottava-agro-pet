'use client'

import React from 'react'
import { Package, Truck, CheckCircle, Clock } from 'phosphor-react'

interface OrderStatus {
  step: number
  title: string
  description: string
  date: string
  completed: boolean
  current: boolean
}

interface OrderTrackingProps {
  orderId: string
  status: OrderStatus[]
}

export function OrderTracking({ orderId, status }: OrderTrackingProps) {
  const getStatusIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Package size={24} weight="fill" />
      case 1:
        return <Truck size={24} weight="fill" />
      case 2:
        return <CheckCircle size={24} weight="fill" />
      default:
        return <Clock size={24} weight="fill" />
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Rastreamento do Pedido</h3>
        <span className="text-text/60">Pedido #{orderId}</span>
      </div>

      <div className="relative">
        {/* Linha de progresso */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

        {/* Status steps */}
        <div className="space-y-8">
          {status.map((step, index) => (
            <div key={index} className="relative flex gap-4">
              {/* Ícone */}
              <div
                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                  step.completed
                    ? 'bg-primary text-white'
                    : step.current
                    ? 'bg-primary/10 text-primary'
                    : 'bg-background text-text/40'
                }`}
              >
                {getStatusIcon(index)}
              </div>

              {/* Conteúdo */}
              <div className="flex-1 pt-2">
                <h4 className="font-medium mb-1">{step.title}</h4>
                <p className="text-sm text-text/60 mb-2">{step.description}</p>
                <time className="text-sm text-text/40">{step.date}</time>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 