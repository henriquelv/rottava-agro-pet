'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const products = [
  {
    id: 1,
    name: 'Ração Premium',
    price: 'R$ 159,90',
    image: '/products/racao.jpg',
  },
  {
    id: 2,
    name: 'Coleira Antipulgas',
    price: 'R$ 45,90',
    image: '/products/coleira.jpg',
  },
  {
    id: 3,
    name: 'Brinquedo para Cães',
    price: 'R$ 29,90',
    image: '/products/brinquedo.jpg',
  },
  {
    id: 4,
    name: 'Shampoo Pet',
    price: 'R$ 25,90',
    image: '/products/shampoo.jpg',
  },
]

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    )
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full max-w-6xl mx-auto py-12">
      <h2 className="text-2xl font-bold text-text mb-8 text-center">Produtos em Destaque</h2>
      
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full flex-shrink-0 px-4"
            >
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="relative h-64 mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <h3 className="text-lg font-semibold text-text mb-2">{product.name}</h3>
                <p className="text-primary font-bold">{product.price}</p>
                <button className="btn-primary w-full mt-4">
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
        >
          <ChevronLeftIcon className="h-6 w-6 text-text" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
        >
          <ChevronRightIcon className="h-6 w-6 text-text" />
        </button>
      </div>
    </div>
  )
} 