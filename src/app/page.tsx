'use client'

import React from 'react'
import Header from '@/components/layout/Header'
import ProductCarousel from '@/components/ui/ProductCarousel'

export default function Home() {
  return (
    <>
      <Header />
      <div className="pt-20">
        {/* Banner Principal */}
        <section className="relative h-[600px] bg-gray-100">
          <div className="container h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
                Bem-vindo à Rottava Agropet
              </h1>
              <p className="text-lg md:text-xl text-text/80 mb-8">
                Sua loja completa em produtos para pets e agropecuária. 
                Encontre tudo o que você precisa para seus animais de estimação e sua produção.
              </p>
              <div className="flex gap-4">
                <a href="/produtos" className="btn-primary">
                  Produtos
                </a>
                <a href="/banho-e-tosa" className="btn-primary">
                  Banho e Tosa
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Carrossel de Produtos */}
        <ProductCarousel />
      </div>
    </>
  )
} 