'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/CartContext'
import { formatCurrency } from '@/utils/format'
import { CreditCard, Bank, Barcode, Truck, ShieldCheck, Check } from 'phosphor-react'
import Link from 'next/link'
import Image from 'next/image'

interface CheckoutFormData {
  name: string
  email: string
  cpf: string
  phone: string
  address: {
    cep: string
    street: string
    number: string
    complement: string
    district: string
    city: string
    state: string
  }
  paymentMethod: 'credit' | 'pix' | 'boleto'
  cardInfo: {
    number: string
    name: string
    expiry: string
    cvv: string
    installments: number
  }
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState<'cart' | 'address' | 'payment' | 'confirmation'>('cart')
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    address: {
      cep: '',
      street: '',
      number: '',
      complement: '',
      district: '',
      city: '',
      state: ''
    },
    paymentMethod: 'credit',
    cardInfo: {
      number: '',
      name: '',
      expiry: '',
      cvv: '',
      installments: 1
    }
  })

  useEffect(() => {
    if (items.length === 0 && step === 'cart') {
      router.push('/carrinho')
    }
  }, [items, router, step])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      if (parent === 'address') {
        setFormData(prev => ({
          ...prev,
          address: {
            ...prev.address,
            [child]: value
          }
        }))
      } else if (parent === 'cardInfo') {
        setFormData(prev => ({
          ...prev,
          cardInfo: {
            ...prev.cardInfo,
            [child]: value
          }
        }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '')
    
    if (cep.length !== 8) return
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()
      
      if (!data.erro) {
        setFormData(prev => ({
          ...prev,
          address: {
            ...prev.address,
            street: data.logradouro,
            district: data.bairro,
            city: data.localidade,
            state: data.uf
          }
        }))
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 'cart') {
      setStep('address')
      return
    }
    
    if (step === 'address') {
      setStep('payment')
      return
    }
    
    if (step === 'payment') {
      setIsSubmitting(true)
      
      try {
        // Simulação de processamento de pagamento
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Limpar carrinho e ir para confirmação
        clearCart()
        setStep('confirmation')
      } catch (error) {
        console.error('Erro ao processar pagamento:', error)
        alert('Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const getDeliveryFee = () => {
    // Cálculo simplificado de frete
    return total > 200 ? 0 : 15.90
  }

  const getFinalTotal = () => {
    return total + getDeliveryFee()
  }

  if (step === 'confirmation') {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} weight="bold" className="text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Pedido realizado com sucesso!</h1>
          <p className="text-text/60 mb-8">
            Seu pedido foi confirmado e será processado em breve. Você receberá um e-mail com os detalhes da sua compra.
          </p>
          
          <div className="bg-background rounded-xl p-6 mb-8">
            <h2 className="font-semibold mb-4">Resumo do pedido</h2>
            <div className="flex justify-between mb-2">
              <span>Número do pedido:</span>
              <span className="font-medium">{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Data:</span>
              <span className="font-medium">{new Date().toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Valor total:</span>
              <span className="font-medium">{formatCurrency(getFinalTotal())}</span>
            </div>
            <div className="flex justify-between">
              <span>Forma de pagamento:</span>
              <span className="font-medium">
                {formData.paymentMethod === 'credit' && 'Cartão de crédito'}
                {formData.paymentMethod === 'pix' && 'PIX'}
                {formData.paymentMethod === 'boleto' && 'Boleto bancário'}
              </span>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Link 
              href="/"
              className="px-6 py-3 bg-background text-text rounded-lg hover:bg-gray-200 transition-colors"
            >
              Voltar para a loja
            </Link>
            <Link 
              href="/pedidos"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Acompanhar pedido
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Finalizar compra</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {/* Etapas do checkout */}
          <div className="flex mb-8">
            <div className={`flex-1 text-center ${step === 'cart' ? 'text-primary font-medium' : ''}`}>
              <div className={`w-8 h-8 rounded-full ${step === 'cart' ? 'bg-primary text-white' : 'bg-gray-200 text-text/60'} flex items-center justify-center mx-auto mb-2`}>
                1
              </div>
              Carrinho
            </div>
            <div className={`flex-1 text-center ${step === 'address' ? 'text-primary font-medium' : ''}`}>
              <div className={`w-8 h-8 rounded-full ${step === 'address' ? 'bg-primary text-white' : 'bg-gray-200 text-text/60'} flex items-center justify-center mx-auto mb-2`}>
                2
              </div>
              Endereço
            </div>
            <div className={`flex-1 text-center ${step === 'payment' ? 'text-primary font-medium' : ''}`}>
              <div className={`w-8 h-8 rounded-full ${step === 'payment' ? 'bg-primary text-white' : 'bg-gray-200 text-text/60'} flex items-center justify-center mx-auto mb-2`}>
                3
              </div>
              Pagamento
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {step === 'cart' && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Itens do pedido</h2>
                
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="py-4 flex gap-4">
                      <div className="w-16 h-16 bg-background rounded-lg overflow-hidden relative flex-shrink-0">
                        {item.tipo === 'produto' && (
                          <Image
                            src={item.imagem}
                            alt={item.nome}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.nome}</h3>
                        <p className="text-sm text-text/60">
                          {item.tipo === 'produto' && `Variante: ${item.variante}`}
                        </p>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm">Qtd: {item.tipo === 'produto' ? item.quantidade : 1}</span>
                          <span className="font-medium">{formatCurrency(item.preco)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Frete</span>
                    <span>{getDeliveryFee() === 0 ? 'Grátis' : formatCurrency(getDeliveryFee())}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                    <span>Total</span>
                    <span>{formatCurrency(getFinalTotal())}</span>
                  </div>
                </div>
              </div>
            )}
            
            {step === 'address' && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Informações de entrega</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Nome completo</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Telefone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">CPF</label>
                    <input
                      type="text"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">CEP</label>
                    <input
                      type="text"
                      name="address.cep"
                      value={formData.address.cep}
                      onChange={handleInputChange}
                      onBlur={handleCepBlur}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Endereço</label>
                    <input
                      type="text"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Número</label>
                    <input
                      type="text"
                      name="address.number"
                      value={formData.address.number}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Complemento</label>
                    <input
                      type="text"
                      name="address.complement"
                      value={formData.address.complement}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Bairro</label>
                    <input
                      type="text"
                      name="address.district"
                      value={formData.address.district}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Cidade</label>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Estado</label>
                    <input
                      type="text"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {step === 'payment' && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Forma de pagamento</h2>
                
                <div className="space-y-4 mb-6">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-background transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit"
                      checked={formData.paymentMethod === 'credit'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <CreditCard size={24} className="text-primary mr-3" />
                    <div>
                      <span className="font-medium">Cartão de crédito</span>
                      <p className="text-sm text-text/60">Pague em até 12x com juros</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-background transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pix"
                      checked={formData.paymentMethod === 'pix'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <Bank size={24} className="text-primary mr-3" />
                    <div>
                      <span className="font-medium">PIX</span>
                      <p className="text-sm text-text/60">Pagamento instantâneo com 5% de desconto</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-background transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="boleto"
                      checked={formData.paymentMethod === 'boleto'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <Barcode size={24} className="text-primary mr-3" />
                    <div>
                      <span className="font-medium">Boleto bancário</span>
                      <p className="text-sm text-text/60">O pedido será enviado após a confirmação do pagamento</p>
                    </div>
                  </label>
                </div>
                
                {formData.paymentMethod === 'credit' && (
                  <div className="border-t pt-6 mt-6">
                    <h3 className="font-medium mb-4">Dados do cartão</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Número do cartão</label>
                        <input
                          type="text"
                          name="cardInfo.number"
                          value={formData.cardInfo?.number || ''}
                          onChange={handleInputChange}
                          placeholder="0000 0000 0000 0000"
                          required={formData.paymentMethod === 'credit'}
                          className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Nome no cartão</label>
                        <input
                          type="text"
                          name="cardInfo.name"
                          value={formData.cardInfo?.name || ''}
                          onChange={handleInputChange}
                          required={formData.paymentMethod === 'credit'}
                          className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Validade</label>
                        <input
                          type="text"
                          name="cardInfo.expiry"
                          value={formData.cardInfo?.expiry || ''}
                          onChange={handleInputChange}
                          placeholder="MM/AA"
                          required={formData.paymentMethod === 'credit'}
                          className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">CVV</label>
                        <input
                          type="text"
                          name="cardInfo.cvv"
                          value={formData.cardInfo?.cvv || ''}
                          onChange={handleInputChange}
                          placeholder="123"
                          required={formData.paymentMethod === 'credit'}
                          className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Parcelas</label>
                        <select
                          name="cardInfo.installments"
                          value={formData.cardInfo?.installments || 1}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                        >
                          <option value={1}>1x de {formatCurrency(getFinalTotal())}</option>
                          <option value={2}>2x de {formatCurrency(getFinalTotal() / 2)}</option>
                          <option value={3}>3x de {formatCurrency(getFinalTotal() / 3)}</option>
                          <option value={4}>4x de {formatCurrency(getFinalTotal() / 4)}</option>
                          <option value={5}>5x de {formatCurrency(getFinalTotal() / 5)}</option>
                          <option value={6}>6x de {formatCurrency(getFinalTotal() / 6)}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-8 flex justify-between">
              {step !== 'cart' ? (
                <button
                  type="button"
                  onClick={() => setStep(step === 'payment' ? 'address' : 'cart')}
                  className="px-6 py-3 bg-background text-text rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Voltar
                </button>
              ) : (
                <Link
                  href="/carrinho"
                  className="px-6 py-3 bg-background text-text rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Voltar ao carrinho
                </Link>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processando...
                  </span>
                ) : step === 'payment' ? (
                  'Finalizar compra'
                ) : (
                  'Continuar'
                )}
              </button>
            </div>
          </form>
        </div>
        
        <div className="lg:w-96">
          <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Resumo do pedido</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'itens'})</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete</span>
                <span>{getDeliveryFee() === 0 ? 'Grátis' : formatCurrency(getDeliveryFee())}</span>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatCurrency(getFinalTotal())}</span>
              </div>
              {getDeliveryFee() === 0 && (
                <p className="text-green-600 text-sm mt-2">
                  Você economizou {formatCurrency(15.90)} em frete!
                </p>
              )}
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-text/60">
                <Truck size={18} />
                <span>Entrega em até 7 dias úteis</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text/60">
                <ShieldCheck size={18} />
                <span>Compra 100% segura</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 