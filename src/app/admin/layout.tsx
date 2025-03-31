'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  House,
  ShoppingCart,
  Users,
  Tag,
  ChartLine,
  Gear,
  SignOut,
  List,
  X
} from 'phosphor-react'
import { useAuth } from '@/hooks/AuthContext'

const menuItems = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: House
  },
  {
    label: 'Pedidos',
    href: '/admin/pedidos',
    icon: ShoppingCart
  },
  {
    label: 'Usuários',
    href: '/admin/usuarios',
    icon: Users
  },
  {
    label: 'Produtos',
    href: '/admin/produtos',
    icon: Tag
  },
  {
    label: 'Relatórios',
    href: '/admin/relatorios',
    icon: ChartLine
  },
  {
    label: 'Configurações',
    href: '/admin/configuracoes',
    icon: Gear
  }
]

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { signOut } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link href="/admin/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-primary">
                Rottava Agro Pet
              </span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 -mr-2 lg:hidden"
            >
              <X size={24} />
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <button className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <SignOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`lg:pl-64 ${isSidebarOpen ? 'lg:pl-64' : 'lg:pl-0'}`}
      >
        {/* Mobile Header */}
        <div className="sticky top-0 z-40 flex items-center gap-4 px-4 py-3 bg-white border-b lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-600"
          >
            <List size={24} />
          </button>
          <h1 className="text-lg font-medium text-gray-900">
            Rottava Agro Pet
          </h1>
        </div>

        {/* Content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
} 