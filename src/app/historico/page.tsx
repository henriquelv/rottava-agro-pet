'use client';

import { useState, FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import { FaSearch } from 'react-icons/fa';
import PageTitle from '@/components/ui/PageTitle';
import PurchaseStatus from '@/components/PurchaseStatus';

interface Cliente {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
}

interface Produto {
  codigo: string;
  nome: string;
  quantidade: number;
  preco: number;
}

interface Compra {
  id: string;
  data: string;
  cliente: Cliente;
  produtos: Produto[];
  valorTotal: number;
  status: string;
  formaPagamento: string;
}

export default function HistoricoPage() {
  const [email, setEmail] = useState('');
  const [compras, setCompras] = useState<Compra[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  async function buscarHistorico(e: FormEvent) {
    e.preventDefault();
    
    if (!email) {
      toast.error('Por favor, insira seu email para buscar o histórico de compras.');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/compras/${encodeURIComponent(email)}`);
      
      if (response.ok) {
        const data = await response.json();
        setCompras(data);
        setHasSearched(true);
        
        if (data.length === 0) {
          toast.success('Busca concluída. Nenhuma compra encontrada para este email.');
        } else {
          toast.success(`Encontradas ${data.length} compras para este email.`);
        }
      } else {
        toast.error('Erro ao buscar o histórico de compras.');
      }
    } catch (error) {
      console.error('Erro ao buscar compras:', error);
      toast.error('Falha ao conectar com o servidor. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  }
  
  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  const formatarPreco = (preco: number) => {
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <main className="container mx-auto px-4 py-8 mt-16">
      <PageTitle>Histórico de Pedidos</PageTitle>
      
      <div className="max-w-lg mx-auto mb-8">
        <form onSubmit={buscarHistorico} className="flex items-center">
          <div className="relative flex-grow">
            <input
              type="email"
              placeholder="Digite seu email"
              className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white p-3 rounded-r-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-spin inline-block h-5 w-5 border-t-2 border-white rounded-full"></span>
            ) : (
              <>
                <FaSearch className="mr-2" />
                Buscar
              </>
            )}
          </button>
        </form>
      </div>

      {hasSearched && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {compras.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 text-left">Pedido</th>
                    <th className="py-3 px-4 text-left">Data</th>
                    <th className="py-3 px-4 text-left">Itens</th>
                    <th className="py-3 px-4 text-left">Total</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {compras.map((compra) => (
                    <tr key={compra.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4">#{compra.id}</td>
                      <td className="py-4 px-4">{formatarData(compra.data)}</td>
                      <td className="py-4 px-4">{compra.produtos.length} produto(s)</td>
                      <td className="py-4 px-4">{formatarPreco(compra.valorTotal)}</td>
                      <td className="py-4 px-4">
                        <PurchaseStatus status={compra.status} />
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => {
                            const detalhesCompra = document.getElementById(`detalhes-${compra.id}`);
                            if (detalhesCompra) {
                              detalhesCompra.classList.toggle('hidden');
                            }
                          }}
                          className="text-green-600 hover:text-green-800 font-medium"
                        >
                          Ver detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Detalhes dos pedidos (inicialmente ocultos) */}
              {compras.map((compra) => (
                <div key={`detalhes-${compra.id}`} id={`detalhes-${compra.id}`} className="hidden p-4 bg-gray-50 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-3">Detalhes do Pedido #{compra.id}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Produtos</h4>
                      <div className="space-y-3">
                        {compra.produtos.map((produto, index) => (
                          <div key={index} className="flex justify-between">
                            <div>
                              <p className="font-medium">{produto.nome}</p>
                              <p className="text-sm text-gray-600">Quantidade: {produto.quantidade}</p>
                            </div>
                            <p className="font-medium">{formatarPreco(produto.preco * produto.quantidade)}</p>
                          </div>
                        ))}
                        <div className="pt-2 border-t border-gray-200 flex justify-between font-semibold">
                          <p>Total</p>
                          <p>{formatarPreco(compra.valorTotal)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Informações de Entrega</h4>
                      <p><span className="font-medium">Nome:</span> {compra.cliente.nome}</p>
                      <p><span className="font-medium">Endereço:</span> {compra.cliente.endereco}</p>
                      {compra.cliente.bairro && (
                        <p>
                          <span className="font-medium">Bairro/Cidade:</span> {compra.cliente.bairro}, {compra.cliente.cidade} - {compra.cliente.estado}
                        </p>
                      )}
                      <p><span className="font-medium">Telefone:</span> {compra.cliente.telefone}</p>
                      <p><span className="font-medium">Forma de pagamento:</span> {compra.formaPagamento}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">Nenhuma compra encontrada para o email: {email}</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
} 