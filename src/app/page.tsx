'use client'

import React from 'react'
import Header from '@/components/layout/Header'
import ProductCarousel from '@/components/ui/ProductCarousel'
import { WavyBackground } from '@/components/layout/WavyBackground'

export default function Home() {
  return (
    <WavyBackground>
      <Header />
      <div className="pt-20">
        {/* Banner Principal */}
        <section className="relative h-[600px]">
          <div className="container h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Bem-vindo à Rottava Agropet
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Sua loja completa em produtos para pets e agropecuária. 
                Encontre tudo o que você precisa para seus animais de estimação e sua produção.
              </p>
              <div className="flex gap-4">
                <a 
                  href="/produtos" 
                  className="px-6 py-3 bg-white text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-colors"
                >
                  Ver Produtos
                </a>
                <a 
                  href="/banho-e-tosa" 
                  className="px-6 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors"
                >
                  Banho e Tosa
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Carrossel de Produtos */}
        <div className="bg-white py-12">
          <ProductCarousel />
        </div>
      </div>
    </WavyBackground>
  )
} 