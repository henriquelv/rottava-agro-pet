'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import { Address } from '@/types/user'

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('info')
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [newAddress, setNewAddress] = useState({
    street: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    state: '',
    zipCode: '',
  })

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="container pt-24">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        </main>
      </>
    )
  }

  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/user/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAddress),
      })

      if (!response.ok) {
        throw new Error('Erro ao adicionar endereço')
      }

      const address = await response.json()
      setAddresses([...addresses, address])
      setIsAddingAddress(false)
      setNewAddress({
        street: '',
        number: '',
        complement: '',
        district: '',
        city: '',
        state: '',
        zipCode: '',
      })
    } catch (error) {
      console.error('Erro ao adicionar endereço:', error)
    }
  }

  return (
    <>
      <Header />
      <main className="container pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-text mb-8">Minha Conta</h1>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b">
              <nav className="flex">
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'info'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-text/60 hover:text-text'
                  }`}
                  onClick={() => setActiveTab('info')}
                >
                  Informações Pessoais
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'addresses'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-text/60 hover:text-text'
                  }`}
                  onClick={() => setActiveTab('addresses')}
                >
                  Endereços
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'orders'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-text/60 hover:text-text'
                  }`}
                  onClick={() => setActiveTab('orders')}
                >
                  Pedidos
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'info' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      Nome
                    </label>
                    <p className="text-text/80">{user?.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      Email
                    </label>
                    <p className="text-text/80">{user?.email}</p>
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="border rounded-lg p-4 space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">
                            {address.street}, {address.number}
                          </p>
                          {address.complement && (
                            <p className="text-sm text-text/60">
                              {address.complement}
                            </p>
                          )}
                          <p className="text-sm">
                            {address.district} - {address.city}/{address.state}
                          </p>
                          <p className="text-sm">CEP: {address.zipCode}</p>
                        </div>
                        <div className="space-x-2">
                          <button className="text-sm text-primary hover:text-primary-dark">
                            Editar
                          </button>
                          <button className="text-sm text-red-600 hover:text-red-700">
                            Excluir
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isAddingAddress ? (
                    <form onSubmit={handleAddAddress} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-text mb-1">
                            Rua
                          </label>
                          <input
                            type="text"
                            required
                            value={newAddress.street}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, street: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text mb-1">
                            Número
                          </label>
                          <input
                            type="text"
                            required
                            value={newAddress.number}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, number: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text mb-1">
                          Complemento
                        </label>
                        <input
                          type="text"
                          value={newAddress.complement}
                          onChange={(e) =>
                            setNewAddress({ ...newAddress, complement: e.target.value })
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-text mb-1">
                            Bairro
                          </label>
                          <input
                            type="text"
                            required
                            value={newAddress.district}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, district: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text mb-1">
                            Cidade
                          </label>
                          <input
                            type="text"
                            required
                            value={newAddress.city}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, city: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-text mb-1">
                            Estado
                          </label>
                          <input
                            type="text"
                            required
                            value={newAddress.state}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, state: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text mb-1">
                            CEP
                          </label>
                          <input
                            type="text"
                            required
                            value={newAddress.zipCode}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, zipCode: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingAddress(false)}
                          className="px-4 py-2 text-sm font-medium text-text/60 hover:text-text"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg"
                        >
                          Salvar Endereço
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button
                      onClick={() => setIsAddingAddress(true)}
                      className="w-full py-2 text-sm font-medium text-primary hover:text-primary-dark border-2 border-dashed border-primary/20 hover:border-primary/40 rounded-lg"
                    >
                      + Adicionar Novo Endereço
                    </button>
                  )}
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="text-center py-8 text-text/60">
                  <p>Você ainda não tem pedidos</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
} 