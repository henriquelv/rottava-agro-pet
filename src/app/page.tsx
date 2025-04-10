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
import { SEO } from '@/components/SEO'
import { Footer } from '@/components/layout/Footer'
import { HeroCarousel } from '@/components/home/HeroCarousel'
import CategoryList from '@/components/CategoryList'
import { ProductShowcase } from '@/components/home/ProductShowcase'
import { Testimonials } from '@/components/home/Testimonials'
import { Newsletter } from '@/components/home/Newsletter'
import { storeConfig } from '@/config/store'

export default function HomePage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/produtos/busca?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <>
      <SEO 
        title="Início"
        description={storeConfig.description}
      />
      
      <div className="min-h-screen bg-white text-gray-800">
        <Header />

        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Categorias em destaque */}
        <CategoryList />

        {/* Produtos por categoria */}
        <section className="max-w-7xl mx-auto px-4 py-12 space-y-12">
          <ProductShowcase 
            title="Rações para Cães"
            category="cao"
            subcategory="racao"
          />
          
          <ProductShowcase 
            title="Rações para Gatos"
            category="gato"
            subcategory="racao"
          />
          
          <ProductShowcase 
            title="Acessórios"
            category="acessorios"
          />
        </section>

        {/* Depoimentos */}
        <Testimonials />

        {/* Newsletter */}
        <Newsletter />

        <Footer />
      </div>
    </>
  )
} 