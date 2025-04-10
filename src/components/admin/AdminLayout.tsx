import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  ArchiveIcon,
  HomeIcon,
  UsersIcon,
  CubeIcon,
  TagIcon,
  ChartBarIcon,
  CogIcon,
  ShoppingCartIcon,
  MenuIcon,
  XIcon,
  LogoutIcon
} from '@heroicons/react/outline';
import { toast, Toaster } from 'react-hot-toast';

interface AuthUser {
  email: string;
  isAdmin: boolean;
  name: string;
  timestamp: string;
}

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verificar autenticação
    const checkAuth = () => {
      try {
        const authData = localStorage.getItem('admin_auth');
        if (!authData) {
          router.push('/admin/login');
          return;
        }

        const user = JSON.parse(authData) as AuthUser;

        // Verificar se o token é válido (exemplo simples: expiração de 24h)
        const tokenTimestamp = new Date(user.timestamp).getTime();
        const currentTime = new Date().getTime();
        const oneDayInMs = 24 * 60 * 60 * 1000;

        if (currentTime - tokenTimestamp > oneDayInMs) {
          // Token expirado
          localStorage.removeItem('admin_auth');
          router.push('/admin/login');
          return;
        }

        setUser(user);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    toast.success('Logout realizado com sucesso!');
    setTimeout(() => {
      router.push('/admin/login');
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
    { name: 'Produtos', href: '/admin/produtos', icon: CubeIcon },
    { name: 'Categorias', href: '/admin/categorias', icon: TagIcon },
    { name: 'Marcas', href: '/admin/marcas', icon: ArchiveIcon },
    { name: 'Estoque', href: '/admin/estoque', icon: ArchiveIcon },
    { name: 'Pedidos', href: '/admin/pedidos', icon: ShoppingCartIcon },
    { name: 'Clientes', href: '/admin/clientes', icon: UsersIcon },
    { name: 'Relatórios', href: '/admin/relatorios', icon: ChartBarIcon },
    { name: 'Configurações', href: '/admin/configuracoes', icon: CogIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      {/* Sidebar para mobile */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} role="dialog">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Fechar menu</span>
              <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="text-xl font-bold text-gray-900">Rottava Admin</h1>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={`${
                      router.pathname === item.href
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                  >
                    <item.icon
                      className={`${
                        router.pathname === item.href ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
                      } mr-4 flex-shrink-0 h-6 w-6`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500 text-white">
                    {user?.name.charAt(0) || 'A'}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-700">{user?.name || 'Administrador'}</p>
                  <button 
                    onClick={handleLogout}
                    className="text-sm font-medium text-gray-500 group-hover:text-gray-700 flex items-center"
                  >
                    <LogoutIcon className="mr-1 h-4 w-4" /> Sair
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
      </div>

      {/* Sidebar para desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-gray-900">Rottava Admin</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={`${
                      router.pathname === item.href
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <item.icon
                      className={`${
                        router.pathname === item.href ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
                      } mr-3 flex-shrink-0 h-6 w-6`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <div className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-gray-500 text-white">
                    {user?.name.charAt(0) || 'A'}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user?.name || 'Administrador'}</p>
                  <button 
                    onClick={handleLogout}
                    className="text-xs font-medium text-gray-500 group-hover:text-gray-700 flex items-center"
                  >
                    <LogoutIcon className="mr-1 h-4 w-4" /> Sair
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="lg:pl-64 flex flex-col">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Abrir sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 