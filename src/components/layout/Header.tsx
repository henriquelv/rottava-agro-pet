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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const isAdmin = user?.email === 'henrique.vmoreno@gmail.com'

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        {/* Barra Superior */}
        <div className="bg-primary text-white py-1">
          <div className="container flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>Rottava, SC</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone size={16} />
                <span>(49) 99999-9999</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>Seg a Sáb: 8h às 18h</span>
              </div>
              <Link href="/sobre" className="hover:text-white/80">
                Sobre Nós
              </Link>
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
                  <Link href="/produtos/racao" className="block px-4 py-2 text-sm hover:bg-gray-50">
                    Ração
                  </Link>
                  <Link href="/produtos/acessorios" className="block px-4 py-2 text-sm hover:bg-gray-50">
                    Acessórios
                  </Link>
                  <Link href="/produtos/medicamentos" className="block px-4 py-2 text-sm hover:bg-gray-50">
                    Medicamentos
                  </Link>
                  <Link href="/produtos/higiene" className="block px-4 py-2 text-sm hover:bg-gray-50">
                    Higiene
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
                href="/contato"
                className="text-text hover:text-primary transition-colors"
              >
                Contato
              </Link>
            </nav>

            {/* Busca e Ações */}
            <div className="hidden md:flex items-center space-x-4">
              <SearchBar className="w-64" />

              <Link
                href="/favoritos"
                className="p-2 text-text hover:text-primary transition-colors"
              >
                <Heart size={24} />
              </Link>

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
                      {isAdmin && (
                        <Link
                          href="/admin/dashboard"
                          className="block px-4 py-2 text-sm text-primary hover:bg-gray-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <div className="flex items-center gap-2">
                            <GearSix size={16} />
                            Administração
                          </div>
                        </Link>
                      )}
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
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
                >
                  Entrar
                </Link>
              )}
            </div>

            {/* Menu Mobile */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-text hover:text-primary transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <List size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <SearchBar className="mb-4" />

              <button
                onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-text hover:text-primary"
              >
                Produtos
                <CaretDown size={16} className={isSubmenuOpen ? 'rotate-180' : ''} />
              </button>
              {isSubmenuOpen && (
                <div className="pl-4 space-y-1">
                  <Link href="/produtos/racao" className="block px-3 py-2 text-sm text-text hover:text-primary">
                    Ração
                  </Link>
                  <Link href="/produtos/acessorios" className="block px-3 py-2 text-sm text-text hover:text-primary">
                    Acessórios
                  </Link>
                  <Link href="/produtos/medicamentos" className="block px-3 py-2 text-sm text-text hover:text-primary">
                    Medicamentos
                  </Link>
                  <Link href="/produtos/higiene" className="block px-3 py-2 text-sm text-text hover:text-primary">
                    Higiene
                  </Link>
                </div>
              )}

              <Link
                href="/banho-e-tosa"
                className="block px-3 py-2 text-base font-medium text-text hover:text-primary"
              >
                Banho e Tosa
              </Link>
              <Link
                href="/servicos"
                className="block px-3 py-2 text-base font-medium text-text hover:text-primary"
              >
                Serviços
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 text-base font-medium text-text hover:text-primary"
              >
                Blog
              </Link>
              <Link
                href="/contato"
                className="block px-3 py-2 text-base font-medium text-text hover:text-primary"
              >
                Contato
              </Link>

              <div className="border-t border-gray-200 pt-4 pb-3">
                {isAuthenticated ? (
                  <>
                    <div className="px-3">
                      <p className="text-base font-medium text-text">{user?.name}</p>
                      <p className="text-sm text-text/60">{user?.email}</p>
                    </div>
                    {isAdmin && (
                      <Link
                        href="/admin/dashboard"
                        className="block px-3 py-2 text-base font-medium text-primary hover:text-primary-dark"
                      >
                        <div className="flex items-center gap-2">
                          <GearSix size={16} />
                          Administração
                        </div>
                      </Link>
                    )}
                    <Link
                      href="/perfil"
                      className="block px-3 py-2 text-base font-medium text-text hover:text-primary"
                    >
                      Minha Conta
                    </Link>
                    <Link
                      href="/pedidos"
                      className="block px-3 py-2 text-base font-medium text-text hover:text-primary"
                    >
                      Meus Pedidos
                    </Link>
                    <Link
                      href="/favoritos"
                      className="block px-3 py-2 text-base font-medium text-text hover:text-primary"
                    >
                      Favoritos
                    </Link>
                    <button
                      onClick={() => logout()}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-50"
                    >
                      Sair
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-base font-medium text-primary hover:text-primary-dark"
                  >
                    Entrar
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Botão de Admin Fixo */}
      {isAuthenticated && isAdmin && (
        <div className="hidden md:block fixed bottom-8 right-8">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-colors"
          >
            <GearSix size={20} />
            <span>Administração</span>
          </Link>
        </div>
      )}
    </div>
  )
} 