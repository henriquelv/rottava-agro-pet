'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { toast } from 'sonner'
import { CreditCard, MapPin, Package } from 'phosphor-react'
import { cieloGateway } from '@/lib/cielo'

interface Endereco {
  cep: string
  rua: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  estado: string
}

interface Cliente {
  nome: string
  email: string
  telefone: string
  endereco: Endereco
}

interface DadosCartao {
  numero: string
  titular: string
  validade: string
  cvv: string
  bandeira: string
}

interface CartItem {
  id: string
  nome: string
  preco: number
  preco_promocional?: number
  quantidade: number
  imagem: string
}

// Estendendo a interface para acomodar os campos adicionais retornados pela API da Cielo
interface ExtendedCieloResponse {
  Payment?: {
    PaymentId: string
    Status: number
    ReturnMessage?: string
    QrCodeBase64?: string
    QrCodeString?: string
    Url?: string
    BoletoNumber?: string
    [key: string]: any
  }
  [key: string]: any
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [metodoPagamento, setMetodoPagamento] = useState('cartao')
  const [endereco, setEndereco] = useState<Endereco>({
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: ''
  })
  const [cliente, setCliente] = useState({
    nome: '',
    email: '',
    telefone: ''
  })
  const [cartao, setCartao] = useState<DadosCartao>({
    numero: '',
    titular: '',
    validade: '',
    cvv: '',
    bandeira: 'Master'
  })

  const processarPagamentoCartao = async () => {
    try {
      const orderId = `ORD-${Date.now()}`;
      const total = getTotal();

      const cieloCustomer = {
        Name: cliente.nome,
        Email: cliente.email,
        Identity: '',
        IdentityType: 'CPF',
        Address: {
          Street: endereco.rua,
          Number: endereco.numero,
          Complement: endereco.complemento || '',
          ZipCode: endereco.cep.replace(/[^0-9]/g, ''),
          City: endereco.cidade,
          State: endereco.estado,
          Country: 'BRA'
        }
      };
      
      const resposta = await cieloGateway.createCreditCardPayment(
        orderId,
        cieloCustomer,
        total,
        {
          cardNumber: cartao.numero.replace(/[^0-9]/g, ''),
          holder: cartao.titular,
          expirationDate: cartao.validade.replace(/[^0-9]/g, ''),
          securityCode: cartao.cvv,
          brand: cartao.bandeira
        },
        1, // parcelas
        true // capturar automaticamente
      ) as ExtendedCieloResponse;

      if (resposta.Payment?.Status === 2) { // 2 = Pagamento confirmado, conforme API Cielo
        // Salvar pedido no banco de dados        
        await salvarPedido(orderId, total, 'cartao_credito', resposta.Payment.PaymentId);
        return true;
      } else {
        toast.error(`Erro no pagamento: ${resposta.Payment?.ReturnMessage || 'Verifique os dados do cartão'}`);
        return false;
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      throw error;
    }
  }

  const processarPagamentoDebito = async () => {
    try {
      const orderId = `ORD-${Date.now()}`;
      const total = getTotal();

      const cieloCustomer = {
        Name: cliente.nome,
        Email: cliente.email,
        Identity: '',
        IdentityType: 'CPF',
        Address: {
          Street: endereco.rua,
          Number: endereco.numero,
          Complement: endereco.complemento || '',
          ZipCode: endereco.cep.replace(/[^0-9]/g, ''),
          City: endereco.cidade,
          State: endereco.estado,
          Country: 'BRA'
        }
      };
      
      // Considerando que a API da Cielo tem um método específico para débito
      // Se não existir, adapte de acordo com a documentação
      const resposta = await cieloGateway.createDebitCardPayment(
        orderId,
        cieloCustomer,
        total,
        {
          cardNumber: cartao.numero.replace(/[^0-9]/g, ''),
          holder: cartao.titular,
          expirationDate: cartao.validade.replace(/[^0-9]/g, ''),
          securityCode: cartao.cvv,
          brand: cartao.bandeira
        }
      ) as ExtendedCieloResponse;

      if (resposta.Payment?.Status === 2) {
        await salvarPedido(orderId, total, 'cartao_debito', resposta.Payment.PaymentId);
        
        // Se o pagamento com débito exigir autenticação, armazenar URL para redirecionamento
        if (resposta.Payment.AuthenticationUrl) {
          localStorage.setItem('debitoAuthUrl', resposta.Payment.AuthenticationUrl);
        }
        
        return true;
      } else {
        toast.error(`Erro no pagamento: ${resposta.Payment?.ReturnMessage || 'Verifique os dados do cartão'}`);
        return false;
      }
    } catch (error) {
      console.error('Erro ao processar pagamento com débito:', error);
      throw error;
    }
  }

  const processarPagamentoPix = async () => {
    try {
      const orderId = `ORD-${Date.now()}`;
      const total = getTotal();

      const cieloCustomer = {
        Name: cliente.nome,
        Email: cliente.email,
        Identity: '',
        IdentityType: 'CPF',
        Address: {
          Street: endereco.rua,
          Number: endereco.numero,
          Complement: endereco.complemento || '',
          ZipCode: endereco.cep.replace(/[^0-9]/g, ''),
          City: endereco.cidade,
          State: endereco.estado,
          Country: 'BRA'
        }
      };
      
      const resposta = await cieloGateway.createPixPayment(
        orderId,
        cieloCustomer,
        total,
        60 // expiração em minutos
      ) as ExtendedCieloResponse;

      if (resposta.Payment) {
        // Salvar pedido no banco de dados
        await salvarPedido(orderId, total, 'pix', resposta.Payment.PaymentId);
        
        // Armazenar o QR Code para mostrar na página de sucesso
        localStorage.setItem('pixQrCode', resposta.Payment.QrCodeBase64 || '');
        localStorage.setItem('pixQrCodeString', resposta.Payment.QrCodeString || '');
        return true;
      } else {
        toast.error('Erro ao gerar PIX');
        return false;
      }
    } catch (error) {
      console.error('Erro ao processar pagamento PIX:', error);
      throw error;
    }
  }

  const processarPagamentoBoleto = async () => {
    try {
      const orderId = `ORD-${Date.now()}`;
      const total = getTotal();

      // Calcula data de vencimento para 3 dias úteis
      const dataVencimento = new Date();
      dataVencimento.setDate(dataVencimento.getDate() + 3);
      const dataFormatada = dataVencimento.toISOString().split('T')[0]; // formato YYYY-MM-DD

      const cieloCustomer = {
        Name: cliente.nome,
        Email: cliente.email,
        Identity: '',
        IdentityType: 'CPF',
        Address: {
          Street: endereco.rua,
          Number: endereco.numero,
          Complement: endereco.complemento || '',
          ZipCode: endereco.cep.replace(/[^0-9]/g, ''),
          City: endereco.cidade,
          State: endereco.estado,
          Country: 'BRA'
        }
      };
      
      const resposta = await cieloGateway.createBoletoPayment(
        orderId,
        cieloCustomer,
        total,
        {
          expirationDate: dataFormatada,
          instructions: 'Não receber após o vencimento',
          demonstrative: 'Compra Rottava Agro Pet'
        }
      ) as ExtendedCieloResponse;

      if (resposta.Payment) {
        // Salvar pedido no banco de dados
        await salvarPedido(orderId, total, 'boleto', resposta.Payment.PaymentId);
        
        // Armazenar URL do boleto para mostrar na página de sucesso
        localStorage.setItem('boletoUrl', resposta.Payment.Url || '');
        localStorage.setItem('boletoNumber', resposta.Payment.BoletoNumber || '');
        return true;
      } else {
        toast.error('Erro ao gerar boleto');
        return false;
      }
    } catch (error) {
      console.error('Erro ao processar boleto:', error);
      throw error;
    }
  }

  const salvarPedido = async (orderId: string, total: number, tipoPagamento: string, paymentId: string) => {
    try {
      const pedido = {
        orderId,
        cliente: {
          nome: cliente.nome,
          email: cliente.email,
          telefone: cliente.telefone,
          endereco
        },
        produtos: items.map((item: CartItem) => ({
          id: item.id,
          nome: item.nome,
          quantidade: item.quantidade,
          preco: item.preco_promocional || item.preco
        })),
        total,
        tipoPagamento,
        paymentId,
        status: tipoPagamento === 'cartao_credito' || tipoPagamento === 'cartao_debito' ? 'confirmado' : 'pendente',
        data: new Date().toISOString()
      };

      const response = await fetch('/api/pedidos/publico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar pedido');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
      throw error;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar os campos obrigatórios
    if (!cliente.nome || !cliente.email || !cliente.telefone) {
      toast.error('Preencha os dados de contato');
      return;
    }

    // Validar o endereço
    if (!endereco.cep || !endereco.rua || !endereco.numero || !endereco.bairro || !endereco.cidade || !endereco.estado) {
      toast.error('Preencha o endereço completo');
      return;
    }

    // Validar cartão se for pagamento por cartão de crédito ou débito
    if (metodoPagamento === 'cartao_credito' || metodoPagamento === 'cartao_debito') {
      if (!cartao.numero || !cartao.titular || !cartao.validade || !cartao.cvv) {
        toast.error('Preencha os dados do cartão');
        return;
      }
    }

    setLoading(true);

    try {
      let success = false;
      
      switch (metodoPagamento) {
        case 'cartao_credito':
          success = await processarPagamentoCartao();
          break;
        case 'cartao_debito':
          success = await processarPagamentoDebito();
          break;
        case 'pix':
          success = await processarPagamentoPix();
          break;
        case 'boleto':
          success = await processarPagamentoBoleto();
          break;
        default:
          toast.error('Método de pagamento inválido');
          return;
      }

      if (success) {
        toast.success('Pedido realizado com sucesso!');
        clearCart();
        router.push(`/pedidos/sucesso?metodo=${metodoPagamento}`);
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      toast.error('Erro ao processar pagamento');
    } finally {
      setLoading(false);
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

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Dados do Cliente e Endereço */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <MapPin size={24} className="text-primary" />
            <h2 className="text-lg font-medium text-gray-900">
              Dados do Cliente
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome Completo
              </label>
              <input
                type="text"
                id="nome"
                value={cliente.nome}
                onChange={(e) => setCliente(prev => ({ ...prev, nome: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={cliente.email}
                  onChange={(e) => setCliente(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  value={cliente.telefone}
                  onChange={(e) => setCliente(prev => ({ ...prev, telefone: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-8">
            <MapPin size={24} className="text-primary" />
            <h2 className="text-lg font-medium text-gray-900">
              Endereço de Entrega
            </h2>
          </div>

          <div className="space-y-4">
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
          </div>
        </div>

        {/* Resumo do Pedido e Pagamento */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Package size={24} className="text-primary" />
            <h2 className="text-lg font-medium text-gray-900">
              Resumo do Pedido
            </h2>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            {items.map((item: CartItem) => (
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
                  value="cartao_credito"
                  className="text-primary focus:ring-primary"
                  checked={metodoPagamento === 'cartao_credito'}
                  onChange={() => setMetodoPagamento('cartao_credito')}
                />
                <span>Cartão de Crédito</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pagamento"
                  value="cartao_debito"
                  className="text-primary focus:ring-primary"
                  checked={metodoPagamento === 'cartao_debito'}
                  onChange={() => setMetodoPagamento('cartao_debito')}
                />
                <span>Cartão de Débito</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pagamento"
                  value="pix"
                  className="text-primary focus:ring-primary"
                  checked={metodoPagamento === 'pix'}
                  onChange={() => setMetodoPagamento('pix')}
                />
                <span>PIX</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pagamento"
                  value="boleto"
                  className="text-primary focus:ring-primary"
                  checked={metodoPagamento === 'boleto'}
                  onChange={() => setMetodoPagamento('boleto')}
                />
                <span>Boleto Bancário</span>
              </label>
            </div>
            
            {(metodoPagamento === 'cartao_credito' || metodoPagamento === 'cartao_debito') && (
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                    Número do Cartão
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={cartao.numero}
                    onChange={(e) => setCartao(prev => ({ ...prev, numero: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    placeholder="0000 0000 0000 0000"
                    required={metodoPagamento === 'cartao_credito' || metodoPagamento === 'cartao_debito'}
                  />
                </div>
                
                <div>
                  <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700">
                    Nome no Cartão
                  </label>
                  <input
                    type="text"
                    id="cardHolder"
                    value={cartao.titular}
                    onChange={(e) => setCartao(prev => ({ ...prev, titular: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    placeholder="NOME COMO ESTÁ NO CARTÃO"
                    required={metodoPagamento === 'cartao_credito' || metodoPagamento === 'cartao_debito'}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">
                      Validade (MM/AA)
                    </label>
                    <input
                      type="text"
                      id="cardExpiry"
                      value={cartao.validade}
                      onChange={(e) => setCartao(prev => ({ ...prev, validade: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      placeholder="MM/AA"
                      required={metodoPagamento === 'cartao_credito' || metodoPagamento === 'cartao_debito'}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cardCvv"
                      value={cartao.cvv}
                      onChange={(e) => setCartao(prev => ({ ...prev, cvv: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      placeholder="123"
                      required={metodoPagamento === 'cartao_credito' || metodoPagamento === 'cartao_debito'}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="cardBrand" className="block text-sm font-medium text-gray-700">
                    Bandeira
                  </label>
                  <select
                    id="cardBrand"
                    value={cartao.bandeira}
                    onChange={(e) => setCartao(prev => ({ ...prev, bandeira: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    required={metodoPagamento === 'cartao_credito' || metodoPagamento === 'cartao_debito'}
                  >
                    <option value="Master">Mastercard</option>
                    <option value="Visa">Visa</option>
                    <option value="Amex">American Express</option>
                    <option value="Elo">Elo</option>
                    <option value="Hipercard">Hipercard</option>
                  </select>
                </div>
              </div>
            )}

            {metodoPagamento === 'pix' && (
              <div className="mt-6">
                <p className="text-sm text-gray-600">
                  Você receberá um QR Code para pagamento na próxima tela.
                  O pagamento deve ser realizado em até 60 minutos.
                </p>
              </div>
            )}

            {metodoPagamento === 'boleto' && (
              <div className="mt-6">
                <p className="text-sm text-gray-600">
                  Você receberá um boleto para pagamento na próxima tela.
                  O pagamento deve ser realizado até a data de vencimento.
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Processando...' : 'Finalizar Compra'}
          </button>
        </div>
      </form>
    </div>
  )
} 