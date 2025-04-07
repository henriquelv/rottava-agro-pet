'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/AuthContext'
import { GearSix, MapPin, Phone, Clock, Truck } from 'phosphor-react'
import { storeConfig } from '@/config/store'

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
            <p className="text-gray-600 mb-4">
              {storeConfig.description}
            </p>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{storeConfig.address.street}, {storeConfig.address.number}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <Phone className="w-5 h-5 mr-2" />
              <a href={`tel:${storeConfig.contact.phone}`} className="hover:text-primary">
                {storeConfig.contact.phone}
              </a>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>Seg-Sex: {storeConfig.hours.weekdays}</span>
            </div>
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

          {/* Serviços */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <Truck className="w-5 h-5 mr-2" />
                <span>Entrega no mesmo dia</span>
              </li>
              <li>
                <Link href="/banho-e-tosa" className="text-gray-600 hover:text-primary">
                  Banho e Tosa Profissional
                </Link>
              </li>
              <li>
                <Link href="/consultas" className="text-gray-600 hover:text-primary">
                  Consultas Veterinárias
                </Link>
              </li>
              <li>
                <Link href="/fidelidade" className="text-gray-600 hover:text-primary">
                  Programa de Fidelidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Horário de Funcionamento */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Horário de Funcionamento</h3>
            <ul className="space-y-2">
              <li className="flex justify-between text-gray-600">
                <span>Segunda a Sexta:</span>
                <span>{storeConfig.hours.weekdays}</span>
              </li>
              <li className="flex justify-between text-gray-600">
                <span>Sábado:</span>
                <span>{storeConfig.hours.saturday}</span>
              </li>
              <li className="flex justify-between text-gray-600">
                <span>Domingo:</span>
                <span>{storeConfig.hours.sunday}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} {storeConfig.name}. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4">
            {isAdmin && (
              <Link href="/admin" className="text-gray-600 hover:text-primary">
                <GearSix className="w-5 h-5" />
              </Link>
            )}
            <a href={storeConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
              Facebook
            </a>
            <a href={storeConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 