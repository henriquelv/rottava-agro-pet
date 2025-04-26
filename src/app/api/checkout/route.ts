import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { cieloGateway } from '@/lib/cielo';
import { logError, logInfo } from '@/lib/logger';
import { CieloError } from '@/lib/cielo-error-handler';
import { prisma } from '@/lib/prisma';

/**
 * Processa o checkout de um pedido
 * 
 * @route POST /api/checkout
 */
export async function POST(req: NextRequest) {
  try {
    // Obtém os dados do pedido da requisição
    const data = await req.json();
    
    // Valida os dados do pedido
    if (!data.cliente || !data.produtos || !data.valorTotal || !data.formaPagamento) {
      return NextResponse.json({
        success: false,
        message: 'Dados incompletos para o pedido'
      }, { status: 400 });
    }
    
    // Gera um ID único para o pedido
    const orderId = uuidv4();
    
    try {
      // Criar o cliente no banco de dados (ou recuperar se já existir)
      const cliente = await prisma.user.upsert({
        where: { email: data.cliente.email },
        update: {
          name: data.cliente.nome,
          // Outros campos para atualizar
        },
        create: {
          id: uuidv4(),
          name: data.cliente.nome,
          email: data.cliente.email,
          password: '', // Cliente criado via checkout não tem senha
          role: 'user',
        },
      });
      
      // Cria o pedido no banco de dados
      const pedido = await prisma.order.create({
        data: {
          id: orderId,
          customerId: cliente.id,
          total: data.valorTotal,
          status: 'pending',
          OrderItem: {
            create: data.produtos.map((produto: any) => ({
              id: uuidv4(),
              productId: produto.codigo,
              quantity: produto.quantidade,
              price: produto.preco
            }))
          }
        }
      });
      
      // Determina o tipo de pagamento a ser processado
      const tipoPagamento = data.formaPagamento.tipo;
      let paymentResponse;
      
      if (tipoPagamento === 'cartao_credito') {
        // Processa pagamento com cartão de crédito
        const valorEmCentavos = Math.round(data.valorTotal * 100);
        
        const cieloTransaction = {
          MerchantOrderId: orderId,
          Customer: {
            Name: data.cliente.nome,
            Email: data.cliente.email,
            Identity: data.cliente.cpf.replace(/\D/g, ''),
            IdentityType: 'CPF',
            Address: {
              Street: data.cliente.endereco,
              Number: data.cliente.numero || 'S/N',
              Complement: data.cliente.complemento || '',
              ZipCode: data.cliente.cep.replace(/\D/g, ''),
              City: data.cliente.cidade,
              State: data.cliente.estado,
              Country: 'BRA',
              District: data.cliente.bairro,
            }
          },
          Payment: {
            Type: 'CreditCard',
            Amount: valorEmCentavos,
            Installments: data.formaPagamento.parcelas || 1,
            SoftDescriptor: 'RottavaAgroPet',
            CreditCard: {
              CardNumber: data.formaPagamento.numero.replace(/\s/g, ''),
              Holder: data.formaPagamento.nome,
              ExpirationDate: data.formaPagamento.validade.replace('/', ''),
              SecurityCode: data.formaPagamento.cvv,
              Brand: data.formaPagamento.bandeira || detectarBandeira(data.formaPagamento.numero),
              SaveCard: false,
            },
            Capture: true
          }
        };
        
        paymentResponse = await cieloGateway.createTransaction(cieloTransaction);
        
        // Atualiza o pedido com os dados da transação
        await prisma.order.update({
          where: { id: orderId },
          data: {
            // Em um banco real, teríamos mais campos específicos para armazenar os dados da transação
            // Por ora, apenas atualizamos o status com base na resposta da Cielo
            status: paymentResponse.Payment.Status === 1 || 
                  paymentResponse.Payment.Status === 2 ? 'processing' : 'pending'
          }
        });
        
      } else if (tipoPagamento === 'boleto') {
        // Processamento de boleto (simulado)
        paymentResponse = {
          MerchantOrderId: orderId,
          Customer: {
            Name: data.cliente.nome
          },
          Payment: {
            Type: 'Boleto',
            Amount: Math.round(data.valorTotal * 100),
            Status: 1,
            PaymentId: uuidv4(),
            Url: 'https://sandbox.cieloecommerce.cielo.com.br/boleto/simulacao.pdf',
            BarCodeNumber: '12345678901234567890123456789012345678901234',
            DigitableLine: '12345.67890 12345.678901 12345.678901 1 12345678901234'
          }
        };
        
      } else if (tipoPagamento === 'pix') {
        // Processamento de PIX (simulado)
        paymentResponse = {
          MerchantOrderId: orderId,
          Customer: {
            Name: data.cliente.nome
          },
          Payment: {
            Type: 'Pix',
            Amount: Math.round(data.valorTotal * 100),
            Status: 1,
            PaymentId: uuidv4(),
            QrCodeBase64Image: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
            QrCodeString: '00020126580014BR.GOV.BCB.PIX0136c3f63f17-13df-4a77-a473-d849368adb5452040000530398654040.005802BR5925EMPRESA ROTTAVA AGRO PET6009SAO PAULO61080540900062070503***6304E2CA'
          }
        };
      }
      
      // Log da transação bem-sucedida
      logInfo('Pedido processado com sucesso', {
        orderId,
        clienteId: cliente.id,
        valorTotal: data.valorTotal,
        tipoPagamento
      });
      
      // Retorna resposta com dados da transação
      return NextResponse.json({
        success: true,
        pedidoId: orderId,
        pagamento: {
          tipo: tipoPagamento,
          status: paymentResponse.Payment.Status,
          ...processarRespostaPagamento(paymentResponse, tipoPagamento)
        }
      });
      
    } catch (error) {
      // Caso ocorra um erro na criação do pedido ou processamento do pagamento
      logError('Erro ao processar pedido', {
        error,
        dados: { orderId, ...data }
      });
      
      let mensagemErro = 'Erro ao processar o pedido';
      let statusCode = 500;
      
      if (error instanceof CieloError) {
        mensagemErro = error.message;
        statusCode = 400;
      }
      
      return NextResponse.json({
        success: false,
        message: mensagemErro
      }, { status: statusCode });
    }
    
  } catch (error) {
    // Erro ao processar a requisição
    logError('Erro ao processar requisição de checkout', { error });
    
    return NextResponse.json({
      success: false,
      message: 'Erro interno do servidor'
    }, { status: 500 });
  }
}

/**
 * Detecta a bandeira do cartão com base nos primeiros dígitos
 */
function detectarBandeira(numeroCartao: string): string {
  const numero = numeroCartao.replace(/\s/g, '');
  
  // Visa começa com 4
  if (/^4/.test(numero)) {
    return 'Visa';
  }
  
  // Mastercard começa com 51-55 ou 22-27
  if (/^5[1-5]/.test(numero) || /^2[2-7]/.test(numero)) {
    return 'Master';
  }
  
  // American Express começa com 34 ou 37
  if (/^3[47]/.test(numero)) {
    return 'Amex';
  }
  
  // Elo (vários padrões)
  if (/^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^504175|^506(699|7[0-6][0-9]|77[0-8])|^509[0-9]{3}|^627780|^63(6297|6368|6369)|^65(0[0-9]{2}|[1-9][0-9]{3})|^6507[0-9]{2}|^6509[0-9]{2}|^6516[5-7][0-9]|^6550[0-9]{2}/.test(numero)) {
    return 'Elo';
  }
  
  // Hipercard
  if (/^606282|^3841[0-5]/.test(numero)) {
    return 'Hipercard';
  }
  
  // Diners
  if (/^3(?:0[0-5]|[68][0-9])[0-9]{11}/.test(numero)) {
    return 'Diners';
  }
  
  // Caso não identifique
  return 'Visa';
}

/**
 * Processa a resposta da API de pagamento para retornar apenas dados relevantes
 */
function processarRespostaPagamento(resposta: any, tipo: string): any {
  if (tipo === 'cartao_credito') {
    return {
      tid: resposta.Payment.Tid,
      autorizacao: resposta.Payment.AuthorizationCode,
      mensagem: resposta.Payment.ReturnMessage,
      bandeira: resposta.Payment.CreditCard?.Brand
    };
  } else if (tipo === 'boleto') {
    return {
      urlBoleto: resposta.Payment.Url,
      linhaDigitavel: resposta.Payment.DigitableLine,
      codigoBarras: resposta.Payment.BarCodeNumber
    };
  } else if (tipo === 'pix') {
    return {
      qrCode: resposta.Payment.QrCodeString,
      qrCodeImagem: resposta.Payment.QrCodeBase64Image
    };
  }
  
  return {};
} 