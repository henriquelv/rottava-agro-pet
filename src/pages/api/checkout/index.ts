import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { cieloGateway } from '@/lib/cielo';
import { logError, logInfo } from '@/lib/logger';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const {
      cliente,
      produtos,
      valorTotal,
      formaPagamento,
    } = req.body;

    if (!cliente || !produtos || !valorTotal || !formaPagamento) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    // Gera um ID único para o pedido
    const orderId = uuidv4();
    
    // Configura os dados para a API de pagamento
    if (formaPagamento.tipo === 'cartao_credito') {
      try {
        // Prepara dados para a Cielo
        const valorEmCentavos = Math.round(valorTotal * 100);
        
        const cieloTransaction = {
          MerchantOrderId: orderId,
          Customer: {
            Name: cliente.nome,
            Email: cliente.email,
            Identity: cliente.cpf.replace(/\D/g, ''), // Remove caracteres não numéricos
            IdentityType: 'CPF',
            Address: {
              Street: cliente.endereco,
              Number: 'S/N', // Em alguns casos não temos o número
              Complement: '',
              ZipCode: cliente.cep.replace(/\D/g, ''),
              City: cliente.cidade,
              State: cliente.estado,
              Country: 'BRA',
              District: cliente.bairro,
            }
          },
          Payment: {
            Type: 'CreditCard',
            Amount: valorEmCentavos,
            Installments: formaPagamento.parcelas || 1,
            SoftDescriptor: 'RottavaAgroPet',
            CreditCard: {
              CardNumber: formaPagamento.numero?.replace(/\s/g, '') || '',
              Holder: formaPagamento.nome || '',
              ExpirationDate: formaPagamento.validade?.replace('/', '') || '',
              SecurityCode: formaPagamento.cvv || '',
              Brand: formaPagamento.bandeira || 'Visa', // Idealmente deve ser detectado
              SaveCard: false,
            },
            Capture: true
          }
        };

        // Integração com Cielo
        logInfo('Iniciando transação com Cielo', { orderId });
        
        const transactionResult = await cieloGateway.createTransaction(cieloTransaction);
        
        const success = transactionResult.Payment.Status === 1 || 
                       transactionResult.Payment.Status === 2;
                       
        // Salva os dados do pedido no banco de dados
        await salvarPedido({
          id: orderId,
          data: new Date().toISOString(),
          cliente,
          produtos,
          valorTotal,
          status: success ? 'confirmado' : 'pendente',
          formaPagamento: formaPagamento.tipo,
          transactionId: transactionResult.Payment.PaymentId,
          transactionStatus: transactionResult.Payment.Status
        });

        return res.status(200).json({
          success,
          orderId,
          transactionId: transactionResult.Payment.PaymentId,
          status: transactionResult.Payment.Status,
          message: transactionResult.Payment.ReturnMessage
        });
        
      } catch (error) {
        logError('Erro ao processar pagamento com cartão', { error });
        return res.status(500).json({ 
          error: 'Erro ao processar pagamento com cartão',
          message: error instanceof Error ? error.message : 'Erro desconhecido'
        });
      }
    } 
    else if (formaPagamento.tipo === 'boleto') {
      // Para boleto, apenas registramos o pedido como pendente
      await salvarPedido({
        id: orderId,
        data: new Date().toISOString(),
        cliente,
        produtos,
        valorTotal,
        status: 'pendente',
        formaPagamento: formaPagamento.tipo
      });

      return res.status(200).json({
        success: true,
        orderId,
        message: 'Pedido registrado com sucesso. O boleto será enviado por email.'
      });
    }
    else if (formaPagamento.tipo === 'pix') {
      // Para PIX, registramos o pedido como pendente
      await salvarPedido({
        id: orderId,
        data: new Date().toISOString(),
        cliente,
        produtos,
        valorTotal,
        status: 'pendente',
        formaPagamento: formaPagamento.tipo
      });

      return res.status(200).json({
        success: true,
        orderId,
        message: 'Pedido registrado com sucesso. O código PIX será enviado por email.'
      });
    }
    else {
      return res.status(400).json({ error: 'Forma de pagamento não suportada' });
    }
  } catch (error) {
    logError('Erro ao processar checkout', { error });
    return res.status(500).json({ 
      error: 'Erro ao processar checkout',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}

// Função para salvar o pedido no banco de dados ou arquivo JSON
async function salvarPedido(pedido: any) {
  try {
    // Aqui você implementaria a lógica para salvar no banco de dados
    // Por enquanto, apenas logamos o pedido
    logInfo('Pedido salvo com sucesso', { orderId: pedido.id });
    
    // Simula o salvamento em um banco de dados
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return true;
  } catch (error) {
    logError('Erro ao salvar pedido', { error, orderId: pedido.id });
    throw error;
  }
} 