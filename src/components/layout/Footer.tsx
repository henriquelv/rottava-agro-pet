'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/AuthContext'
import { GearSix } from 'phosphor-react'

export function Footer() {
  const { user } = useAuth()
  const isAdmin = user?.email === 'admin@rottavaagropet.com.br'

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sobre */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre Nós</h3>
            <p className="text-gray-600">
              A Rottava Agro Pet é sua loja completa de produtos para animais de estimação e agrícolas.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/produtos" className="text-gray-600 hover:text-primary">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/banho-e-tosa" className="text-gray-600 hover:text-primary">
                  Banho e Tosa
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-600 hover:text-primary">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Rua Principal, 123</li>
              <li>Cidade - Estado</li>
              <li>CEP: 00000-000</li>
              <li>Tel: (00) 0000-0000</li>
              <li>Email: contato@rottavaagropet.com.br</li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary">
                Facebook
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                Instagram
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Linha inferior com copyright e botão de admin */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              © {new Date().getFullYear()} Rottava Agro Pet. Todos os direitos reservados.
            </p>
            {isAdmin && (
              <Link 
                href="/admin/dashboard"
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <GearSix size={20} />
                Administração
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
} 