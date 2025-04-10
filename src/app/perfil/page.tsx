'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { Loader2, LogOut, Package, User, Clock, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-hot-toast'

interface Compra {
  id: string
  data: string
  produtos: Array<{
    id: string
    nome: string
    quantidade: number
    preco: number
    subtotal: number
  }>
  total: number
  status: string
}

export default function PerfilPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [compras, setCompras] = useState<Compra[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Redirecionar para login se não estiver autenticado
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/perfil')
    }

    // Buscar histórico de compras do usuário
    if (status === 'authenticated' && session?.user?.email) {
      fetchCompras(session.user.email)
    }
  }, [status, session, router])

  const fetchCompras = async (email: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/compras/${email}`)
      
      if (!response.ok) {
        throw new Error('Falha ao carregar histórico de compras')
      }
      
      const data = await response.json()
      setCompras(data)
    } catch (error) {
      console.error('Erro ao buscar compras:', error)
      toast.error('Não foi possível carregar seu histórico de compras')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null // Redirecionando pelo useEffect, não precisamos renderizar nada
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10 text-gray-800">Meu Perfil</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Menu lateral */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 bg-green-50 border-b border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="bg-green-600 text-white rounded-full p-3">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">{session?.user?.name}</p>
                  <p className="text-sm text-gray-500">{session?.user?.email}</p>
                </div>
              </div>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <Link href="/perfil" className="flex items-center p-3 rounded-lg text-gray-800 bg-green-50 font-medium">
                    <User className="h-5 w-5 mr-3 text-green-600" />
                    Meus Dados
                  </Link>
                </li>
                <li>
                  <Link href="/perfil/pedidos" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    <Package className="h-5 w-5 mr-3 text-gray-500" />
                    Meus Pedidos
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sair da Conta
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 pb-4 border-b border-gray-100">Informações Pessoais</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <div className="p-3 bg-gray-50 rounded-lg text-gray-800">
                  {session?.user?.name}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="p-3 bg-gray-50 rounded-lg text-gray-800">
                  {session?.user?.email}
                </div>
              </div>
            </div>
          </div>

          {/* Histórico de Compras */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold mb-4 pb-4 border-b border-gray-100 flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2 text-green-600" />
              Histórico de Compras
            </h2>
            
            {isLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="w-6 h-6 animate-spin text-green-600" />
              </div>
            ) : compras.length > 0 ? (
              <div className="space-y-6">
                {compras.map((compra) => (
                  <div key={compra.id} className="border border-gray-100 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 flex justify-between items-center border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {new Date(compra.data).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          compra.status === 'concluido' ? 'bg-green-100 text-green-800' :
                          compra.status === 'processando' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {compra.status === 'concluido' ? 'Concluído' :
                           compra.status === 'processando' ? 'Processando' :
                           compra.status}
                        </span>
                        <span className="font-bold text-green-700">
                          R$ {compra.total.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Itens do pedido</h3>
                      <ul className="space-y-3">
                        {compra.produtos.map((produto) => (
                          <li key={produto.id} className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                              <span className="text-gray-800 font-medium">{produto.quantidade}x</span>
                              <span className="ml-2 text-gray-700">{produto.nome}</span>
                            </div>
                            <span className="text-gray-600">
                              R$ {produto.subtotal.toFixed(2).replace('.', ',')}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="bg-gray-50 inline-flex rounded-full p-3 mb-4">
                  <ShoppingCart className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhuma compra encontrada</h3>
                <p className="text-gray-500 mb-6">Você ainda não realizou nenhuma compra em nossa loja.</p>
                <Link href="/" className="inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition-colors">
                  Ver produtos
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 