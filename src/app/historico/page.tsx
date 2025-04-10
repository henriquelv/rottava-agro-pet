'use client';

import { useState, FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import PageTitle from '@/components/ui/PageTitle';

interface Produto {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
}

interface Compra {
  id: string;
  data: string;
  cliente: {
    nome: string;
    email: string;
    telefone: string;
  };
  produtos: Produto[];
  total: number;
}

export default function HistoricoPage() {
  const [email, setEmail] = useState('');
  const [compras, setCompras] = useState<Compra[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [buscaRealizada, setBuscaRealizada] = useState(false);
  
  async function buscarHistorico(e: FormEvent) {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Email inválido');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/compras/${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar histórico');
      }
      
      const data = await response.json();
      setCompras(data);
      setBuscaRealizada(true);
      
      if (data.length === 0) {
        toast.error('Nenhuma compra encontrada para este email');
      }
    } catch (err) {
      console.error('Erro:', err);
      setError('Erro ao buscar o histórico de compras');
      toast.error('Erro ao buscar histórico');
    } finally {
      setLoading(false);
    }
  }
  
  function formatarData(dataString: string) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <PageTitle>Histórico de Compras</PageTitle>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Consultar Compras</h2>
        
        <form onSubmit={buscarHistorico} className="mb-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email utilizado na compra</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="seu@email.com"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Buscando...' : 'Buscar Histórico'}
          </button>
        </form>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
      </div>
      
      {buscaRealizada && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Resultado da Busca</h2>
          
          {compras.length === 0 ? (
            <p className="text-gray-600">Nenhuma compra encontrada para o email informado.</p>
          ) : (
            <div className="space-y-6">
              {compras.map((compra) => (
                <div key={compra.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">Compra #{compra.id.substring(0, 8)}</h3>
                    <span className="text-sm text-gray-500">Data: {formatarData(compra.data)}</span>
                  </div>
                  
                  <div className="mb-3">
                    <p><strong>Cliente:</strong> {compra.cliente.nome}</p>
                    <p><strong>Email:</strong> {compra.cliente.email}</p>
                    <p><strong>Telefone:</strong> {compra.cliente.telefone}</p>
                  </div>
                  
                  <div className="mb-3">
                    <h4 className="font-medium mb-2">Produtos:</h4>
                    <ul className="list-disc pl-5">
                      {compra.produtos.map((produto) => (
                        <li key={produto.id} className="mb-1">
                          {produto.nome} - {produto.quantidade}x R$ {produto.preco.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="text-right font-bold">
                    Total: R$ {compra.total.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
} 