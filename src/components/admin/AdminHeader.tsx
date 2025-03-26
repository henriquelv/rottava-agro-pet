'use client'

import { useState } from 'react'
import { Bell, Gear, User } from 'phosphor-react'

interface AdminHeaderProps {
  user?: {
    name?: string
    email?: string
    image?: string
  }
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="bg-white border-b px-6 py-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Painel Administrativo</h1>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-text/60 hover:text-text rounded-full">
            <Bell size={20} />
          </button>
          <button className="p-2 text-text/60 hover:text-text rounded-full">
            <Gear size={20} />
          </button>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User size={18} />
              </div>
              <span className="text-sm font-medium">{user?.name || 'Administrador'}</span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium">{user?.name || 'Administrador'}</p>
                  <p className="text-xs text-text/60">{user?.email || 'admin@exemplo.com'}</p>
                </div>
                <a
                  href="/admin/perfil"
                  className="block px-4 py-2 text-sm text-text hover:bg-gray-50"
                >
                  Meu Perfil
                </a>
                <a
                  href="/admin/configuracoes"
                  className="block px-4 py-2 text-sm text-text hover:bg-gray-50"
                >
                  Configurações
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 