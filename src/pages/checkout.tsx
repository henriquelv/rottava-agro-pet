import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { FaCreditCard, FaBarcode, FaQrcode } from 'react-icons/fa';

interface Cliente {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

interface FormaPagamento {
  tipo: 'cartao_credito' | 'boleto' | 'pix';
  parcelas?: number;
  numero?: string;
  nome?: string;
  validade?: string;
  cvv?: string;
  bandeira?: string;
}

const estadosBrasileiros = [
  { sigla: 'AC', nome: 'Acre' },
  { sigla: 'AL', nome: 'Alagoas' },
  { sigla: 'AP', nome: 'Amapá' },
  { sigla: 'AM', nome: 'Amazonas' },
  { sigla: 'BA', nome: 'Bahia' },
  { sigla: 'CE', nome: 'Ceará' },
  { sigla: 'DF', nome: 'Distrito Federal' },
  { sigla: 'ES', nome: 'Espírito Santo' },
  { sigla: 'GO', nome: 'Goiás' },
  { sigla: 'MA', nome: 'Maranhão' },
  { sigla: 'MT', nome: 'Mato Grosso' },
  { sigla: 'MS', nome: 'Mato Grosso do Sul' },
  { sigla: 'MG', nome: 'Minas Gerais' },
  { sigla: 'PA', nome: 'Pará' },
  { sigla: 'PB', nome: 'Paraíba' },
  { sigla: 'PR', nome: 'Paraná' },
  { sigla: 'PE', nome: 'Pernambuco' },
  { sigla: 'PI', nome: 'Piauí' },
  { sigla: 'RJ', nome: 'Rio de Janeiro' },
  { sigla: 'RN', nome: 'Rio Grande do Norte' },
  { sigla: 'RS', nome: 'Rio Grande do Sul' },
  { sigla: 'RO', nome: 'Rondônia' },
  { sigla: 'RR', nome: 'Roraima' },
  { sigla: 'SC', nome: 'Santa Catarina' },
  { sigla: 'SP', nome: 'São Paulo' },
  { sigla: 'SE', nome: 'Sergipe' },
  { sigla: 'TO', nome: 'Tocantins' }
];

const CheckoutPage: NextPage = () => {
  const router = useRouter();
  const { cart, total, clearCart } = useCart();
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>({ tipo: 'cartao_credito', parcelas: 1 });
  const [isProcessing, setIsProcessing] = useState(false);
  const [cliente, setCliente] = useState<Cliente>({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    endereco: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: ''
  });

  useEffect(() => {
    if (cart.length === 0) {
      toast.error('Seu carrinho está vazio');
      router.push('/cart');
    }
  }, [cart, router]);

  const handleClienteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCliente(prev => ({ ...prev, [name]: value }));
  };

  const handlePagamentoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'tipo') {
      // Reset forma de pagamento quando o tipo muda
      if (value === 'cartao_credito') {
        setFormaPagamento({ tipo: value as FormaPagamento['tipo'], parcelas: 1 });
      } else {
        setFormaPagamento({ tipo: value as FormaPagamento['tipo'] });
      }
    } else {
      setFormaPagamento(prev => ({ ...prev, [name]: value }));
    }
  };

  const calcularValorParcela = () => {
    const parcelas = formaPagamento.parcelas || 1;
    return total / parcelas;
  };

  const buscarCep = async () => {
    if (cliente.cep.length !== 8) {
      toast.error('CEP inválido');
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cliente.cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        toast.error('CEP não encontrado');
        return;
      }

      setCliente(prev => ({
        ...prev,
        endereco: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf
      }));

      toast.success('CEP encontrado!');
    } catch (error) {
      toast.error('Erro ao buscar CEP');
    }
  };

  const validarFormulario = (): boolean => {
    // Validação básica
    if (!cliente.nome || !cliente.email || !cliente.telefone || !cliente.cpf || 
        !cliente.endereco || !cliente.cidade || !cliente.estado || !cliente.cep) {
      toast.error('Preencha todos os campos obrigatórios');
      return false;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cliente.email)) {
      toast.error('Email inválido');
      return false;
    }

    // Validação de CPF
    if (cliente.cpf.length !== 11 && cliente.cpf.length !== 14) {
      toast.error('CPF inválido');
      return false;
    }

    // Validação de cartão de crédito
    if (formaPagamento.tipo === 'cartao_credito') {
      if (!formaPagamento.numero || !formaPagamento.nome || !formaPagamento.validade || !formaPagamento.cvv) {
        toast.error('Preencha todos os dados do cartão');
        return false;
      }

      // Validar número do cartão (simplificado)
      if (formaPagamento.numero.replace(/\s/g, '').length < 13) {
        toast.error('Número de cartão inválido');
        return false;
      }

      // Validar data de validade
      const validadeRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
      if (!validadeRegex.test(formaPagamento.validade)) {
        toast.error('Data de validade inválida. Use o formato MM/AA');
        return false;
      }

      // Validar CVV
      if (formaPagamento.cvv.length < 3) {
        toast.error('CVV inválido');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Preparar dados para API
      const orderData = {
        cliente: cliente,
        produtos: cart.map(item => ({
          codigo: item.codigo,
          nome: item.nome,
          quantidade: item.quantidade,
          preco: item.preco
        })),
        valorTotal: total,
        formaPagamento: formaPagamento,
        status: 'pendente'
      };

      // Enviar para API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Erro ao processar pagamento');
      }

      const data = await response.json();

      // Limpar carrinho após confirmação
      clearCart();

      // Redirecionar para página de confirmação
      router.push(`/confirmation?order=${data.orderId}`);
      
      toast.success('Pedido realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
      toast.error('Erro ao processar seu pagamento. Por favor, tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatarPreco = (preco: number) => {
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <Layout>
      <Head>
        <title>Finalizar Compra | Rottava Agro Pet</title>
        <meta name="description" content="Finalize sua compra na Rottava Agro Pet" />
      </Head>

      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold text-center mb-8">Finalizar Compra</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário de checkout */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Informações Pessoais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="nome" className="block text-gray-700 mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={cliente.nome}
                    onChange={handleClienteChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={cliente.email}
                    onChange={handleClienteChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="telefone" className="block text-gray-700 mb-1">Telefone *</label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={cliente.telefone}
                    onChange={handleClienteChange}
                    placeholder="(XX) XXXXX-XXXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cpf" className="block text-gray-700 mb-1">CPF *</label>
                  <input
                    type="text"
                    id="cpf"
                    name="cpf"
                    value={cliente.cpf}
                    onChange={handleClienteChange}
                    placeholder="XXX.XXX.XXX-XX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Endereço de Entrega</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex gap-2">
                  <div className="flex-grow">
                    <label htmlFor="cep" className="block text-gray-700 mb-1">CEP *</label>
                    <input
                      type="text"
                      id="cep"
                      name="cep"
                      value={cliente.cep}
                      onChange={handleClienteChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={buscarCep}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Buscar
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="endereco" className="block text-gray-700 mb-1">Endereço *</label>
                  <input
                    type="text"
                    id="endereco"
                    name="endereco"
                    value={cliente.endereco}
                    onChange={handleClienteChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="bairro" className="block text-gray-700 mb-1">Bairro</label>
                  <input
                    type="text"
                    id="bairro"
                    name="bairro"
                    value={cliente.bairro}
                    onChange={handleClienteChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="cidade" className="block text-gray-700 mb-1">Cidade *</label>
                  <input
                    type="text"
                    id="cidade"
                    name="cidade"
                    value={cliente.cidade}
                    onChange={handleClienteChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="estado" className="block text-gray-700 mb-1">Estado *</label>
                  <select
                    id="estado"
                    name="estado"
                    value={cliente.estado}
                    onChange={handleClienteChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Selecione um estado</option>
                    {estadosBrasileiros.map(estado => (
                      <option key={estado.sigla} value={estado.sigla}>
                        {estado.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Forma de Pagamento</h2>
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="cartao_credito"
                      name="tipo"
                      value="cartao_credito"
                      checked={formaPagamento.tipo === 'cartao_credito'}
                      onChange={handlePagamentoChange}
                      className="w-4 h-4 text-green-600"
                    />
                    <label htmlFor="cartao_credito" className="flex items-center gap-2 cursor-pointer">
                      <FaCreditCard className="text-green-600" />
                      <span>Cartão de Crédito</span>
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="boleto"
                      name="tipo"
                      value="boleto"
                      checked={formaPagamento.tipo === 'boleto'}
                      onChange={handlePagamentoChange}
                      className="w-4 h-4 text-green-600"
                    />
                    <label htmlFor="boleto" className="flex items-center gap-2 cursor-pointer">
                      <FaBarcode className="text-green-600" />
                      <span>Boleto Bancário</span>
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="pix"
                      name="tipo"
                      value="pix"
                      checked={formaPagamento.tipo === 'pix'}
                      onChange={handlePagamentoChange}
                      className="w-4 h-4 text-green-600"
                    />
                    <label htmlFor="pix" className="flex items-center gap-2 cursor-pointer">
                      <FaQrcode className="text-green-600" />
                      <span>PIX</span>
                    </label>
                  </div>
                </div>

                {formaPagamento.tipo === 'cartao_credito' && (
                  <div className="mt-4 border border-gray-200 rounded-md p-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="numero" className="block text-gray-700 mb-1">Número do Cartão *</label>
                        <input
                          type="text"
                          id="numero"
                          name="numero"
                          value={formaPagamento.numero || ''}
                          onChange={handlePagamentoChange}
                          placeholder="0000 0000 0000 0000"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="nome" className="block text-gray-700 mb-1">Nome no Cartão *</label>
                        <input
                          type="text"
                          id="nome_cartao"
                          name="nome"
                          value={formaPagamento.nome || ''}
                          onChange={handlePagamentoChange}
                          placeholder="Como está no cartão"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="validade" className="block text-gray-700 mb-1">Validade *</label>
                        <input
                          type="text"
                          id="validade"
                          name="validade"
                          value={formaPagamento.validade || ''}
                          onChange={handlePagamentoChange}
                          placeholder="MM/AA"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-gray-700 mb-1">CVV *</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formaPagamento.cvv || ''}
                          onChange={handlePagamentoChange}
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label htmlFor="parcelas" className="block text-gray-700 mb-1">Parcelas *</label>
                      <select
                        id="parcelas"
                        name="parcelas"
                        value={formaPagamento.parcelas || 1}
                        onChange={handlePagamentoChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        {[...Array(12)].map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}x de {formatarPreco(total / (i + 1))} {i === 0 ? '(à vista)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {formaPagamento.tipo === 'boleto' && (
                  <div className="mt-4 border border-gray-200 rounded-md p-4 bg-gray-50">
                    <p className="text-gray-700">
                      Você pagará {formatarPreco(total)} via boleto bancário. Após a confirmação do pedido, você receberá o boleto para pagamento.
                    </p>
                    <p className="text-gray-700 mt-2">
                      O prazo de entrega começa a contar após a confirmação do pagamento.
                    </p>
                  </div>
                )}

                {formaPagamento.tipo === 'pix' && (
                  <div className="mt-4 border border-gray-200 rounded-md p-4 bg-gray-50">
                    <p className="text-gray-700">
                      Você pagará {formatarPreco(total)} via PIX. Após a confirmação do pedido, você receberá um código PIX para pagamento.
                    </p>
                    <p className="text-gray-700 mt-2">
                      O pagamento é processado imediatamente e seu pedido será enviado mais rapidamente.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin inline-block h-5 w-5 border-t-2 border-white rounded-full mr-2"></span>
                      Processando...
                    </span>
                  ) : (
                    `Finalizar Pedido - ${formatarPreco(total)}`
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Resumo do pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Resumo do Pedido</h2>
              
              <div className="mb-6">
                <div className="max-h-80 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.codigo} className="flex items-center py-2 border-b border-gray-100">
                      <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden relative flex-shrink-0">
                        {item.imagem && (
                          <img
                            src={item.imagem}
                            alt={item.nome}
                            className="object-cover w-full h-full"
                            onError={(e) => {
                              e.currentTarget.src = '/images/placeholder.jpg';
                            }}
                          />
                        )}
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="text-gray-800 font-medium">{item.nome}</h3>
                        <p className="text-gray-600 text-sm">Qtd: {item.quantidade}</p>
                        <p className="text-gray-800 font-medium">{formatarPreco(item.preco * item.quantidade)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>{formatarPreco(total)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Frete:</span>
                  <span>Grátis</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-3 border-t border-gray-200">
                  <span>Total:</span>
                  <span className="text-green-700">{formatarPreco(total)}</span>
                </div>
                {formaPagamento.tipo === 'cartao_credito' && formaPagamento.parcelas && formaPagamento.parcelas > 1 && (
                  <div className="text-gray-600 text-sm">
                    ou {formaPagamento.parcelas}x de {formatarPreco(calcularValorParcela())}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage; 