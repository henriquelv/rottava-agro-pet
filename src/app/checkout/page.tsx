'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { toast } from 'sonner'
import { CreditCard, MapPin, Package } from 'phosphor-react'

interface Endereco {
  cep: string
  rua: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  estado: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [endereco, setEndereco] = useState<Endereco>({
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Aqui você irá implementar a integração com o gateway de pagamento
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Pedido realizado com sucesso!')
      clearCart()
      router.push('/pedidos/sucesso')
    } catch (error) {
      toast.error('Erro ao processar pagamento')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Carrinho vazio
        </h1>
        <p className="text-gray-600 mb-8">
          Adicione produtos ao carrinho para continuar
        </p>
        <button
          onClick={() => router.push('/produtos')}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Ver Produtos
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Finalizar Compra
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulário de Endereço */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <MapPin size={24} className="text-primary" />
            <h2 className="text-lg font-medium text-gray-900">
              Endereço de Entrega
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cep" className="block text-sm font-medium text-gray-700">
                  CEP
                </label>
                <input
                  type="text"
                  id="cep"
                  value={endereco.cep}
                  onChange={(e) => setEndereco(prev => ({ ...prev, cep: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="numero" className="block text-sm font-medium text-gray-700">
                  Número
                </label>
                <input
                  type="text"
                  id="numero"
                  value={endereco.numero}
                  onChange={(e) => setEndereco(prev => ({ ...prev, numero: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="rua" className="block text-sm font-medium text-gray-700">
                Rua
              </label>
              <input
                type="text"
                id="rua"
                value={endereco.rua}
                onChange={(e) => setEndereco(prev => ({ ...prev, rua: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="complemento" className="block text-sm font-medium text-gray-700">
                Complemento
              </label>
              <input
                type="text"
                id="complemento"
                value={endereco.complemento}
                onChange={(e) => setEndereco(prev => ({ ...prev, complemento: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="bairro" className="block text-sm font-medium text-gray-700">
                  Bairro
                </label>
                <input
                  type="text"
                  id="bairro"
                  value={endereco.bairro}
                  onChange={(e) => setEndereco(prev => ({ ...prev, bairro: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">
                  Cidade
                </label>
                <input
                  type="text"
                  id="cidade"
                  value={endereco.cidade}
                  onChange={(e) => setEndereco(prev => ({ ...prev, cidade: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
                Estado
              </label>
              <input
                type="text"
                id="estado"
                value={endereco.estado}
                onChange={(e) => setEndereco(prev => ({ ...prev, estado: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
            </div>
          </form>
        </div>

        {/* Resumo do Pedido */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Package size={24} className="text-primary" />
            <h2 className="text-lg font-medium text-gray-900">
              Resumo do Pedido
            </h2>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{item.nome}</h3>
                    <p className="text-sm text-gray-500">
                      {item.quantidade} x R$ {(item.preco_promocional || item.preco).toFixed(2)}
                    </p>
                  </div>
                </div>
                <p className="font-medium text-gray-900">
                  R$ {((item.preco_promocional || item.preco) * item.quantidade).toFixed(2)}
                </p>
              </div>
            ))}

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-lg font-medium text-gray-900">
                <span>Total</span>
                <span>R$ {getTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CreditCard size={24} className="text-primary" />
            <h2 className="text-lg font-medium text-gray-900">
              Pagamento
            </h2>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-600 mb-4">
              Escolha a forma de pagamento
            </p>
            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pagamento"
                  value="cartao"
                  className="text-primary focus:ring-primary"
                  defaultChecked
                />
                <span>Cartão de Crédito</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pagamento"
                  value="pix"
                  className="text-primary focus:ring-primary"
                />
                <span>PIX</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pagamento"
                  value="boleto"
                  className="text-primary focus:ring-primary"
                />
                <span>Boleto Bancário</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Processando...' : 'Finalizar Compra'}
          </button>
        </div>
      </div>
    </div>
  )
} 