'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import { SearchBar } from '@/components/search/SearchBar'
import { 
  ShoppingCart, 
  User, 
  List, 
  X, 
  GearSix, 
  Heart,
  MapPin,
  Phone,
  Clock,
  CaretDown
} from 'phosphor-react'
import { storeConfig } from '@/config/store'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const isAdmin = user?.email === 'admin@rottavaagropet.com.br'

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        {/* Barra Superior */}
        <div className="bg-primary text-white py-2">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <a href={`tel:${storeConfig.contact.phone}`} className="text-sm hover:underline">
                  {storeConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">Seg-Sex: {storeConfig.hours.weekdays}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Header Principal */}
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Rottava Agro Pet"
                width={120}
                height={48}
                className="h-12 w-auto"
              />
            </Link>

            {/* Menu Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <div className="relative group">
                <button className="flex items-center gap-1 text-text hover:text-primary transition-colors">
                  Produtos
                  <CaretDown size={16} />
                </button>
                <div className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                  <Link href="/produtos/categoria/cao" className="block px-4 py-2 text-sm hover:bg-gray-50">
                    Cães
                  </Link>
                  <Link href="/produtos/categoria/gato" className="block px-4 py-2 text-sm hover:bg-gray-50">
                    Gatos
                  </Link>
                  <Link href="/produtos/categoria/ave" className="block px-4 py-2 text-sm hover:bg-gray-50">
                    Aves
                  </Link>
                  <Link href="/produtos/categoria/peixe" className="block px-4 py-2 text-sm hover:bg-gray-50">
                    Peixes
                  </Link>
                  <Link href="/produtos/categoria/cavalo" className="block px-4 py-2 text-sm hover:bg-gray-50">
                    Cavalos
                  </Link>
                  <Link href="/produtos/categoria/acessorios" className="block px-4 py-2 text-sm hover:bg-gray-50">
                    Acessórios
                  </Link>
                </div>
              </div>
              <Link
                href="/banho-e-tosa"
                className="text-text hover:text-primary transition-colors"
              >
                Banho e Tosa
              </Link>
              <Link
                href="/servicos"
                className="text-text hover:text-primary transition-colors"
              >
                Serviços
              </Link>
              <Link
                href="/blog"
                className="text-text hover:text-primary transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/admin/dashboard"
                className="text-text hover:text-primary transition-colors"
              >
                Administração
              </Link>
            </nav>

            {/* Busca e Ações */}
            <div className="hidden md:flex items-center space-x-4">
              <SearchBar className="w-64" />

              {isAuthenticated && (
                <Link
                  href="/favoritos"
                  className="p-2 text-text hover:text-primary transition-colors"
                >
                  <Heart size={24} />
                </Link>
              )}

              <Link
                href="/carrinho"
                className="p-2 text-text hover:text-primary transition-colors relative"
              >
                <ShoppingCart size={24} />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>

              {isAuthenticated ? (
                <div className="relative">
                  <button 
                    className="flex items-center gap-2 p-2 text-text hover:text-primary transition-colors"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <User size={24} />
                    <span className="text-sm">{user?.name}</span>
                    <CaretDown size={16} className={isUserMenuOpen ? "rotate-180 transition-transform" : "transition-transform"} />
                  </button>
                  {isUserMenuOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                      onMouseLeave={() => setIsUserMenuOpen(false)}
                    >
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium text-text">{user?.name}</p>
                        <p className="text-xs text-text/60">{user?.email}</p>
                      </div>
                      <Link
                        href="/perfil"
                        className="block px-4 py-2 text-sm text-text hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Minha Conta
                      </Link>
                      <Link
                        href="/pedidos"
                        className="block px-4 py-2 text-sm text-text hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Meus Pedidos
                      </Link>
                      <Link
                        href="/favoritos"
                        className="block px-4 py-2 text-sm text-text hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Favoritos
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                      >
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 p-2 text-text hover:text-primary transition-colors"
                >
                  <User size={24} />
                  <span className="text-sm">Entrar</span>
                </Link>
              )}
            </div>

            {/* Menu Mobile */}
            <button
              className="md:hidden p-2 text-text hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>

        {/* Menu Mobile Expandido */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container py-4">
              <SearchBar className="mb-4" />
              <nav className="space-y-4">
                <div>
                  <button
                    className="flex items-center justify-between w-full text-text"
                    onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                  >
                    <span>Produtos</span>
                    <CaretDown size={16} className={isSubmenuOpen ? "rotate-180" : ""} />
                  </button>
                  {isSubmenuOpen && (
                    <div className="mt-2 ml-4 space-y-2">
                      <Link href="/produtos/categoria/cao" className="block text-sm text-text/80">
                        Cães
                      </Link>
                      <Link href="/produtos/categoria/gato" className="block text-sm text-text/80">
                        Gatos
                      </Link>
                      <Link href="/produtos/categoria/ave" className="block text-sm text-text/80">
                        Aves
                      </Link>
                      <Link href="/produtos/categoria/peixe" className="block text-sm text-text/80">
                        Peixes
                      </Link>
                      <Link href="/produtos/categoria/cavalo" className="block text-sm text-text/80">
                        Cavalos
                      </Link>
                      <Link href="/produtos/categoria/acessorios" className="block text-sm text-text/80">
                        Acessórios
                      </Link>
                    </div>
                  )}
                </div>
                <Link href="/banho-e-tosa" className="block text-text">
                  Banho e Tosa
                </Link>
                <Link href="/servicos" className="block text-text">
                  Serviços
                </Link>
                <Link href="/blog" className="block text-text">
                  Blog
                </Link>
                <Link href="/sobre" className="block text-text">
                  Sobre Nós
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>
      <div className="h-24" /> {/* Espaçador para compensar o header fixo */}
    </div>
  )
}