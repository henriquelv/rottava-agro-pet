'use client'

import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import { WavyBackground } from '@/components/layout/WavyBackground'
import { 
  PawPrint, 
  Heart, 
  Truck, 
  Dog,
  Cat,
  Bird,
  Fish,
  Horse,
  ShoppingBag,
  MagnifyingGlass
} from 'phosphor-react'
import ProductGrid from '@/components/ProductGrid'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/produtos/busca?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <WavyBackground>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Rottava Agro Pet
              </h1>
              <p className="mt-6 text-lg leading-8 text-white/80">
                Tudo para o seu pet em um só lugar. Produtos de qualidade e com os melhores preços.
              </p>
              
              {/* Barra de Pesquisa */}
              <form onSubmit={handleSearch} className="mt-8 flex items-center justify-center gap-x-2">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar produtos..."
                    className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    <MagnifyingGlass size={24} />
                  </button>
                </div>
              </form>

              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/produtos"
                  className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 hover:scale-105"
                >
                  Ver produtos
                </a>
                <a href="/sobre" className="text-sm font-semibold leading-6 text-white hover:text-primary transition-colors">
                  Saiba mais <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Por que nos escolher */}
        <section className="bg-white/80 backdrop-blur-sm py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Por que escolher a Rottava Agropet?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <PawPrint className="text-primary" weight="fill" size={40} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Produtos de Qualidade</h3>
                <p className="text-text/70">Selecionamos os melhores produtos para seus pets, garantindo qualidade e segurança.</p>
              </div>
              <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Heart className="text-primary" weight="fill" size={40} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Atendimento Personalizado</h3>
                <p className="text-text/70">Nossa equipe está pronta para ajudar você a encontrar o melhor para seu pet.</p>
              </div>
              <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Truck className="text-primary" weight="fill" size={40} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Entrega Rápida</h3>
                <p className="text-text/70">Entregamos em toda a região com rapidez e segurança para sua comodidade.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categorias em Destaque */}
        <section className="bg-gray-50/80 backdrop-blur-sm py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Categorias em Destaque</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <a 
                href="/produtos/categoria/cao"
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Dog className="text-primary" weight="fill" size={40} />
                  </div>
                  <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">Cães</h3>
                </div>
              </a>
              <a 
                href="/produtos/categoria/gato"
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Cat className="text-primary" weight="fill" size={40} />
                  </div>
                  <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">Gatos</h3>
                </div>
              </a>
              <a 
                href="/produtos/categoria/ave"
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Bird className="text-primary" weight="fill" size={40} />
                  </div>
                  <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">Aves</h3>
                </div>
              </a>
              <a 
                href="/produtos/categoria/peixe"
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Fish className="text-primary" weight="fill" size={40} />
                  </div>
                  <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">Peixes</h3>
                </div>
              </a>
              <a 
                href="/produtos/categoria/cavalo"
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Horse className="text-primary" weight="fill" size={40} />
                  </div>
                  <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">Cavalos</h3>
                </div>
              </a>
              <a 
                href="/produtos/categoria/acessorios"
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <ShoppingBag className="text-primary" weight="fill" size={40} />
                  </div>
                  <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">Acessórios</h3>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="bg-white/80 backdrop-blur-sm py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">Produtos em Destaque</h2>
              <p className="text-lg leading-8 text-gray-600 mb-12">
                Confira nossa seleção dos produtos mais populares e bem avaliados.
              </p>
            </div>
            <div className="mx-auto max-w-2xl lg:max-w-7xl">
              <ProductGrid products={[]} />
            </div>
          </div>
        </section>
      </main>
    </WavyBackground>
  )
} 