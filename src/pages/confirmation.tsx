import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import Layout from '../components/Layout';
import { FaCheckCircle, FaTruck, FaFileInvoice, FaHome } from 'react-icons/fa';

interface ConfirmationProps {
  orderId: string;
}

interface PedidoStatus {
  loading: boolean;
  error: string | null;
  data: {
    id: string;
    data: string;
    status: string;
    valorTotal: number;
    formaPagamento: string;
  } | null;
}

const ConfirmationPage: NextPage = () => {
  const router = useRouter();
  const { order } = router.query;
  const [pedido, setPedido] = useState<PedidoStatus>({
    loading: true,
    error: null,
    data: null
  });

  useEffect(() => {
    if (order) {
      // Aqui em um caso real, faríamos uma chamada para a API para buscar detalhes do pedido
      // Por enquanto, simulamos um pedido com dados ficticios
      setTimeout(() => {
        setPedido({
          loading: false,
          error: null,
          data: {
            id: order as string,
            data: new Date().toISOString(),
            status: 'confirmado',
            valorTotal: 299.90,
            formaPagamento: 'cartao_credito'
          }
        });
      }, 1000);
    }
  }, [order]);

  const formatarPreco = (preco: number) => {
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (!order) {
    return (
      <Layout>
        <Head>
          <title>Pedido não encontrado | Rottava Agro Pet</title>
        </Head>
        <div className="container mx-auto px-4 py-12 mt-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Pedido não encontrado</h1>
            <p className="text-gray-600 mb-8">
              Não foi possível encontrar o pedido solicitado. Por favor, verifique o link ou entre em contato conosco.
            </p>
            <Link href="/" className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors">
              Voltar para a loja
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Pedido Confirmado | Rottava Agro Pet</title>
        <meta name="description" content="Seu pedido foi confirmado com sucesso" />
      </Head>

      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          {pedido.loading ? (
            <div className="flex flex-col items-center justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
              <p className="text-gray-600">Carregando informações do pedido...</p>
            </div>
          ) : pedido.error ? (
            <div className="text-center text-red-600 p-8">
              <p className="text-xl font-semibold mb-4">Erro ao carregar o pedido</p>
              <p>{pedido.error}</p>
              <Link href="/" className="inline-block mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
                Voltar para a loja
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <FaCheckCircle className="text-green-600 text-6xl mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Pedido Confirmado!</h1>
                <p className="text-gray-600">
                  Seu pedido #{pedido.data?.id} foi recebido com sucesso.
                </p>
              </div>

              <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Detalhes do Pedido</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">
                      <strong>Número do Pedido:</strong> #{pedido.data?.id}
                    </p>
                    <p className="text-gray-600">
                      <strong>Data do Pedido:</strong> {formatarData(pedido.data?.data || '')}
                    </p>
                    <p className="text-gray-600">
                      <strong>Status:</strong> <span className="text-green-600 font-semibold">Confirmado</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">
                      <strong>Forma de Pagamento:</strong> {pedido.data?.formaPagamento === 'cartao_credito' ? 'Cartão de Crédito' : 
                                                           pedido.data?.formaPagamento === 'boleto' ? 'Boleto Bancário' : 'PIX'}
                    </p>
                    <p className="text-gray-600">
                      <strong>Valor Total:</strong> {formatarPreco(pedido.data?.valorTotal || 0)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">O que acontece agora?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4">
                    <FaFileInvoice className="text-green-600 text-3xl mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-800 mb-2">Processamento</h3>
                    <p className="text-gray-600 text-sm">Seu pedido está sendo processado e preparado para envio.</p>
                  </div>
                  <div className="text-center p-4">
                    <FaTruck className="text-green-600 text-3xl mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-800 mb-2">Envio</h3>
                    <p className="text-gray-600 text-sm">Você receberá um email com os detalhes do envio e rastreamento.</p>
                  </div>
                  <div className="text-center p-4">
                    <FaHome className="text-green-600 text-3xl mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-800 mb-2">Entrega</h3>
                    <p className="text-gray-600 text-sm">Seus produtos serão entregues no endereço informado.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                <Link href="/" className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors text-center">
                  Voltar para a loja
                </Link>
                <Link href="/history" className="w-full sm:w-auto border border-green-600 text-green-600 px-6 py-3 rounded-md hover:bg-green-50 transition-colors text-center">
                  Ver meus pedidos
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ConfirmationPage; 