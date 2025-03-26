'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import { SearchBar } from '@/components/search/SearchBar'
import { ShoppingCart, User, List, X, GearSix } from 'phosphor-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const isAdmin = user?.email === 'henrique.vmoreno@gmail.com'

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
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
            <Link
              href="/produtos"
              className="text-text hover:text-primary transition-colors"
            >
              Produtos
            </Link>
            <Link
              href="/banho-e-tosa"
              className="text-text hover:text-primary transition-colors"
            >
              Banho e Tosa
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
              href="/carrinho"
              className="p-2 text-text hover:text-primary transition-colors"
            >
              <ShoppingCart size={24} />
            </Link>

            <Link
              href="/suporte"
              className="p-2 text-text hover:text-primary transition-colors"
            >
              Suporte
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="p-2 text-text hover:text-primary transition-colors">
                  <User size={24} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-text">{user?.name}</p>
                    <p className="text-xs text-text/60">{user?.email}</p>
                  </div>
                  {isAdmin && (
                    <Link
                      href="/admin/dashboard"
                      className="block px-4 py-2 text-sm text-primary hover:bg-gray-50"
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
                  >
                    Minha Conta
                  </Link>
                  <Link
                    href="/pedidos"
                    className="block px-4 py-2 text-sm text-text hover:bg-gray-50"
                  >
                    Meus Pedidos
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    Sair
                  </button>
                </div>
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

            <Link
              href="/produtos"
              className="block px-3 py-2 text-base font-medium text-text hover:text-primary"
            >
              Produtos
            </Link>
            <Link
              href="/banho-e-tosa"
              className="block px-3 py-2 text-base font-medium text-text hover:text-primary"
            >
              Banho e Tosa
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

      {/* Botão de Admin na parte principal do menu (ao lado do login) */}
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
    </header>
  )
} 