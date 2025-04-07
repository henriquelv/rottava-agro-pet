'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { 
  House,
  Package,
  Tag,
  Users,
  ChartLine,
  SignOut,
  List
} from 'phosphor-react'
import { useAuth } from '@/hooks/AuthContext'

const menuItems = [
  {
    label: 'Dashboard',
    icon: House,
    href: '/admin'
  },
  {
    label: 'Produtos',
    icon: Package,
    href: '/admin/produtos'
  },
  {
    label: 'Categorias',
    icon: Tag,
    href: '/admin/categorias'
  },
  {
    label: 'Clientes',
    icon: Users,
    href: '/admin/clientes'
  },
  {
    label: 'Relatórios',
    icon: ChartLine,
    href: '/admin/relatorios'
  }
]

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuth()

  useEffect(() => {
    // Verificar autenticação
    if (!user || user.email !== 'admin@rottavaagropet.com.br') {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r">
          <div className="flex items-center justify-between mb-8 px-2">
            <Link href="/" className="text-xl font-bold text-primary">
              Rottava Admin
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden"
            >
              <List size={24} />
            </button>
          </div>
          
          <ul className="space-y-2 font-medium">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${
                      isActive ? 'text-primary bg-primary/5' : 'text-gray-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" weight={isActive ? 'fill' : 'regular'} />
                    <span className="ml-3">{item.label}</span>
                  </Link>
                </li>
              )
            })}

            <li>
              <button
                onClick={logout}
                className="flex items-center w-full p-2 text-gray-600 rounded-lg hover:bg-gray-100 group"
              >
                <SignOut className="w-5 h-5" />
                <span className="ml-3">Sair</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Content */}
      <div className={`p-4 ${isSidebarOpen ? 'md:ml-64' : ''}`}>
        <div className="p-4 rounded-lg bg-white min-h-[calc(100vh-2rem)]">
          {children}
        </div>
      </div>

      {/* Toggle Sidebar Button (Mobile) */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className={`fixed bottom-4 right-4 md:hidden z-50 p-2 bg-primary text-white rounded-full shadow-lg ${
          isSidebarOpen ? 'hidden' : ''
        }`}
      >
        <List size={24} />
      </button>
    </div>
  )
} 