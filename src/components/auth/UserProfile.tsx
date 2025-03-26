'use client'

import React, { useState } from 'react'
import {
  User,
  Bell,
  BookmarkSimple,
  Clock,
  SignOut,
  CaretDown
} from 'phosphor-react'
import { useAuth } from '@/hooks/AuthContext'
import { useToast } from '@/hooks/ToastContext'
import Image from 'next/image'
import Link from 'next/link'

export default function UserProfile() {
  const { user, signOut } = useAuth()
  const { showToast } = useToast()
  const [isOpen, setIsOpen] = useState(false)

  if (!user) return null

  const handleSignOut = async () => {
    try {
      await signOut()
      showToast('Logout realizado com sucesso!', 'success')
    } catch (error) {
      showToast('Erro ao fazer logout. Tente novamente.', 'error')
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none"
      >
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.name}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="text-primary" size={20} />
          </div>
        )}
        <span className="text-sm font-medium">{user.name}</span>
        <CaretDown
          size={16}
          className={`text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
          {/* Cabeçalho */}
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>

          {/* Links */}
          <nav className="py-2">
            <Link
              href="/perfil/favoritos"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <BookmarkSimple size={20} />
              <span>Artigos Favoritos</span>
            </Link>

            <Link
              href="/perfil/historico"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Clock size={20} />
              <span>Histórico de Leitura</span>
            </Link>

            <Link
              href="/perfil/notificacoes"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Bell size={20} />
              <span>Notificações</span>
            </Link>
          </nav>

          {/* Preferências */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              Preferências
            </p>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={user.preferences.newsletter}
                  onChange={() => {
                    // Implementar atualização de preferências
                  }}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Receber newsletter
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={user.preferences.notifications.comments}
                  onChange={() => {
                    // Implementar atualização de preferências
                  }}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Notificar comentários
                </span>
              </label>
            </div>
          </div>

          {/* Logout */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
            >
              <SignOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 