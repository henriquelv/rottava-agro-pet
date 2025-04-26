'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ArrowLeft, CreditCard, QrCode, Barcode } from 'phosphor-react';

export default function PedidoSucessoPage() {
  const searchParams = useSearchParams();
  const metodo = searchParams.get('metodo') || 'cartao_credito';
  const [pixQrCode, setPixQrCode] = useState<string>('');
  const [pixQrCodeString, setPixQrCodeString] = useState<string>('');
  const [boletoUrl, setBoletoUrl] = useState<string>('');
  const [boletoNumber, setBoletoNumber] = useState<string>('');
  const [debitoAuthUrl, setDebitoAuthUrl] = useState<string>('');

  useEffect(() => {
    // Recuperar dados armazenados para cada método de pagamento
    if (metodo === 'pix') {
      const storedQrCode = localStorage.getItem('pixQrCode') || '';
      const storedQrCodeString = localStorage.getItem('pixQrCodeString') || '';
      setPixQrCode(storedQrCode);
      setPixQrCodeString(storedQrCodeString);
    } else if (metodo === 'boleto') {
      const storedBoletoUrl = localStorage.getItem('boletoUrl') || '';
      const storedBoletoNumber = localStorage.getItem('boletoNumber') || '';
      setBoletoUrl(storedBoletoUrl);
      setBoletoNumber(storedBoletoNumber);
    } else if (metodo === 'cartao_debito') {
      const storedDebitoAuthUrl = localStorage.getItem('debitoAuthUrl') || '';
      setDebitoAuthUrl(storedDebitoAuthUrl);
      
      // Se tiver URL de autenticação e ainda não tiver sido usado, redirecionar automaticamente
      if (storedDebitoAuthUrl && !sessionStorage.getItem('debitoAuthRedirected')) {
        sessionStorage.setItem('debitoAuthRedirected', 'true');
        window.location.href = storedDebitoAuthUrl;
      }
    }
  }, [metodo]);
  
  const limparDadosSensiveisLocais = () => {
    // Ao sair da página, limpar dados sensíveis
    localStorage.removeItem('pixQrCode');
    localStorage.removeItem('pixQrCodeString');
    localStorage.removeItem('boletoUrl');
    localStorage.removeItem('boletoNumber');
    localStorage.removeItem('debitoAuthUrl');
    sessionStorage.removeItem('debitoAuthRedirected');
  };

  // Limpar dados ao desmontar o componente
  useEffect(() => {
    return () => {
      limparDadosSensiveisLocais();
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center text-center mb-10">
          <CheckCircle size={64} weight="fill" className="text-primary mb-4" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Pedido realizado com sucesso!
          </h1>
          <p className="text-gray-600 mt-2">
            Obrigado por sua compra. Você receberá atualizações por email.
          </p>
        </div>

        {metodo === 'cartao_credito' && (
          <div className="bg-green-50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <CreditCard size={32} className="text-primary" />
              <h2 className="text-xl font-semibold">Pagamento com Cartão de Crédito</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Seu pagamento foi aprovado! O pedido está sendo processado e você receberá atualizações por email.
            </p>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Status:</strong> Pagamento confirmado
              </p>
            </div>
          </div>
        )}

        {metodo === 'cartao_debito' && (
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <CreditCard size={32} className="text-primary" />
              <h2 className="text-xl font-semibold">Pagamento com Cartão de Débito</h2>
            </div>
            
            {debitoAuthUrl ? (
              <div className="space-y-4">
                <p className="text-gray-700">
                  Para finalizar seu pagamento, você precisa autenticar a transação no site do seu banco.
                </p>
                
                <div className="bg-white p-4 rounded-lg mb-4">
                  <div className="flex flex-col items-center">
                    <a 
                      href={debitoAuthUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors mb-4"
                    >
                      Autenticar Pagamento
                    </a>
                    <p className="text-sm text-gray-600 text-center">
                      Clique no botão acima para ser redirecionado para a página de autenticação do seu banco.
                    </p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-sm text-gray-700">
                    <strong>Importante:</strong> Após completar a autenticação, você será redirecionado de volta para nossa loja.
                    Não feche esta janela durante o processo de autenticação.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-700 mb-4">
                  Seu pedido foi processado. Aguarde a confirmação do pagamento, que será enviada por email.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Status:</strong> Em processamento
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {metodo === 'pix' && (
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <QrCode size={32} className="text-primary" />
              <h2 className="text-xl font-semibold">Pagamento via PIX</h2>
            </div>

            <div className="bg-white p-6 rounded-lg mb-6">
              <div className="flex flex-col items-center">
                {pixQrCode ? (
                  <>
                    <p className="text-gray-700 mb-4 text-center">
                      Escaneie o QR Code abaixo ou copie o código PIX para realizar o pagamento:
                    </p>
                    <div className="mb-4">
                      <img 
                        src={`data:image/png;base64,${pixQrCode}`} 
                        alt="QR Code PIX" 
                        className="w-48 h-48 mx-auto"
                      />
                    </div>
                    {pixQrCodeString && (
                      <div className="w-full">
                        <p className="text-sm text-gray-600 mb-2">Código PIX:</p>
                        <div className="relative">
                          <div className="p-3 bg-gray-100 text-xs text-gray-800 rounded overflow-auto max-h-24 break-all">
                            {pixQrCodeString}
                          </div>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(pixQrCodeString);
                              alert('Código PIX copiado!');
                            }}
                            className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs"
                          >
                            Copiar
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-gray-700 mb-4 text-center">
                    Você receberá o código PIX por email para realizar o pagamento.
                  </p>
                )}
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-700">
                <strong>Importante:</strong> O pagamento deve ser feito em até 60 minutos. 
                Após o pagamento, seu pedido será processado automaticamente.
              </p>
            </div>
          </div>
        )}

        {metodo === 'boleto' && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Barcode size={32} className="text-primary" />
              <h2 className="text-xl font-semibold">Pagamento via Boleto</h2>
            </div>

            <div className="bg-white p-6 rounded-lg mb-6">
              {boletoUrl ? (
                <>
                  <p className="text-gray-700 mb-4 text-center">
                    Seu boleto foi gerado com sucesso. Clique no botão abaixo para visualizá-lo:
                  </p>
                  
                  <div className="flex flex-col items-center">
                    <a 
                      href={boletoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors mb-4"
                    >
                      Visualizar Boleto
                    </a>
                    
                    {boletoNumber && (
                      <div className="text-sm text-gray-600 text-center">
                        <p className="font-medium">Número do Boleto:</p>
                        <p className="font-mono">{boletoNumber}</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-gray-700 mb-4 text-center">
                  Você receberá o boleto por email para realizar o pagamento.
                </p>
              )}
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-700">
                <strong>Importante:</strong> O pagamento deve ser feito até a data de vencimento indicada no boleto.
                Após a confirmação do pagamento (1-3 dias úteis), seu pedido será processado.
              </p>
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">O que acontece agora?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">1</span>
              </div>
              <h4 className="font-semibold text-gray-800">Confirmação</h4>
              <p className="text-sm text-gray-600">
                Você receberá um email com os detalhes do seu pedido.
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">2</span>
              </div>
              <h4 className="font-semibold text-gray-800">Processamento</h4>
              <p className="text-sm text-gray-600">
                Seu pedido será preparado para envio.
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">3</span>
              </div>
              <h4 className="font-semibold text-gray-800">Entrega</h4>
              <p className="text-sm text-gray-600">
                Seus produtos serão entregues no endereço informado.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <Link
            href="/"
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors w-full sm:w-auto justify-center"
            onClick={limparDadosSensiveisLocais}
          >
            <ArrowLeft size={20} />
            <span>Voltar para a loja</span>
          </Link>
          
          <Link
            href="/pedidos/historico"
            className="flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary-light transition-colors w-full sm:w-auto justify-center"
            onClick={limparDadosSensiveisLocais}
          >
            <span>Ver meus pedidos</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 