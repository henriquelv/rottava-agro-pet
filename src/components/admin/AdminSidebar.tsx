'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import {
  ChartLine,
  Package,
  Users,
  Calendar,
  Newspaper,
  SignOut,
  House
} from 'phosphor-react'

const menuItems = [
  { icon: ChartLine, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Package, label: 'Produtos', href: '/admin/produtos' },
  { icon: Users, label: 'Clientes', href: '/admin/clientes' },
  { icon: Calendar, label: 'Agenda', href: '/admin/agenda' },
  { icon: Newspaper, label: 'Blog', href: '/admin/blog' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-full bg-white border-r">
      <div className="p-6">
        <h1 className="text-xl font-bold">Rottava Agropet</h1>
        <p className="text-sm text-text/60">Painel Administrativo</p>
      </div>

      <nav className="px-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-text/60 hover:bg-primary/5'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2 text-text/60 hover:text-text hover:bg-primary/5 rounded-lg transition-colors w-full mb-2"
        >
          <House size={20} />
          <span>Voltar ao site</span>
        </Link>
        <button
          onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
          className="flex items-center gap-3 px-4 py-2 text-text/60 hover:text-text hover:bg-primary/5 rounded-lg transition-colors w-full"
        >
          <SignOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  )
} 