import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { CieloPaymentGateway, CieloTransactionRequest } from '@/lib/cielo';
import { logError, logInfo } from '@/lib/logger';

/**
 * Valida os dados do cartão de crédito
 */
function validateCreditCard(cardData: any) {
  if (!cardData) return { valid: false, message: 'Dados do cartão não fornecidos' };
  
  if (!cardData.cardNumber || cardData.cardNumber.length < 13) {
    return { valid: false, message: 'Número do cartão inválido' };
  }
  
  if (!cardData.holder) {
    return { valid: false, message: 'Nome do titular não fornecido' };
  }
  
  if (!cardData.expirationDate || !/^\d{2}\/\d{2}$/.test(cardData.expirationDate)) {
    return { valid: false, message: 'Data de expiração inválida. Use o formato MM/AA' };
  }
  
  if (!cardData.securityCode || cardData.securityCode.length < 3) {
    return { valid: false, message: 'Código de segurança inválido' };
  }
  
  if (!cardData.brand) {
    return { valid: false, message: 'Bandeira do cartão não fornecida' };
  }
  
  return { valid: true };
}

/**
 * Processa pagamentos usando a API da Cielo
 * 
 * Tipos de pagamento suportados:
 * - CreditCard: cartão de crédito
 * - DebitCard: cartão de débito
 * - Boleto: boleto bancário
 * - Pix: pagamento via PIX
 */
export async function POST(req: NextRequest) {
  try {
    // Obtém os dados do pagamento da requisição
    const paymentData = await req.json();
    
    // Valida se os dados básicos estão presentes
    if (!paymentData.customer || !paymentData.payment || !paymentData.payment.type) {
      return NextResponse.json({
        success: false,
        message: 'Dados de pagamento inválidos ou incompletos'
      }, { status: 400 });
    }
    
    // Gera um ID único para o pedido
    const merchantOrderId = paymentData.merchantOrderId || uuidv4();
    
    // Prepara a requisição para a Cielo de acordo com o tipo de pagamento
    const transaction: CieloTransactionRequest = {
      MerchantOrderId: merchantOrderId,
      Customer: {
        Name: paymentData.customer.name
      },
      Payment: {
        Type: paymentData.payment.type,
        Amount: paymentData.payment.amount
      } as any
    };

    // Adiciona dados adicionais do cliente, se fornecidos
    if (paymentData.customer.email) {
      transaction.Customer.Email = paymentData.customer.email;
    }
    
    if (paymentData.customer.identity) {
      transaction.Customer.Identity = paymentData.customer.identity;
      transaction.Customer.IdentityType = paymentData.customer.identityType || 'CPF';
    }
    
    if (paymentData.customer.address) {
      transaction.Customer.Address = paymentData.customer.address;
    }
    
    // Configura os detalhes específicos de acordo com o tipo de pagamento
    const paymentType = paymentData.payment.type;
    
    // Processa pagamento por cartão de crédito
    if (paymentType === 'CreditCard') {
      // Valida os dados do cartão
      const validation = validateCreditCard(paymentData.payment.creditCard);
      if (!validation.valid) {
        return NextResponse.json({
          success: false,
          message: validation.message
        }, { status: 400 });
      }
      
      // Configura os dados do cartão de crédito
      const { creditCard } = paymentData.payment;
      (transaction.Payment as any).Installments = paymentData.payment.installments || 1;
      (transaction.Payment as any).Capture = paymentData.payment.capture !== false; // Capturar automaticamente por padrão
      (transaction.Payment as any).CreditCard = {
        CardNumber: creditCard.cardNumber,
        Holder: creditCard.holder,
        ExpirationDate: creditCard.expirationDate.replace('/', ''),
        SecurityCode: creditCard.securityCode,
        Brand: creditCard.brand,
        SaveCard: creditCard.saveCard || false
      };
    } 
    // Processa pagamento por cartão de débito
    else if (paymentType === 'DebitCard') {
      // Valida os dados do cartão
      const validation = validateCreditCard(paymentData.payment.debitCard);
      if (!validation.valid) {
        return NextResponse.json({
          success: false,
          message: validation.message
        }, { status: 400 });
      }
      
      // Configuração necessária para débito: URL de retorno
      if (!paymentData.payment.returnUrl) {
        return NextResponse.json({
          success: false,
          message: 'URL de retorno é obrigatória para pagamento com cartão de débito'
        }, { status: 400 });
      }
      
      // Configura os dados do cartão de débito
      const { debitCard } = paymentData.payment;
      (transaction.Payment as any).ReturnUrl = paymentData.payment.returnUrl;
      (transaction.Payment as any).DebitCard = {
        CardNumber: debitCard.cardNumber,
        Holder: debitCard.holder,
        ExpirationDate: debitCard.expirationDate.replace('/', ''),
        SecurityCode: debitCard.securityCode,
        Brand: debitCard.brand
      };
    } 
    // Processa pagamento por boleto
    else if (paymentType === 'Boleto') {
      // Configura os dados do boleto
      (transaction.Payment as any).Provider = paymentData.payment.provider || 'Bradesco2';
      (transaction.Payment as any).Address = paymentData.payment.address || '';
      (transaction.Payment as any).BoletoNumber = paymentData.payment.boletoNumber || '';
      (transaction.Payment as any).Assignor = paymentData.payment.assignor || 'Rottava Agro Pet';
      (transaction.Payment as any).Demonstrative = paymentData.payment.demonstrative || 'Pagamento Rottava Agro Pet';
      
      // Data de vencimento (obrigatória) - padrão: 5 dias a partir de hoje
      const defaultDueDate = new Date();
      defaultDueDate.setDate(defaultDueDate.getDate() + 5);
      const formattedDueDate = paymentData.payment.expirationDate || 
        `${defaultDueDate.getFullYear()}-${String(defaultDueDate.getMonth() + 1).padStart(2, '0')}-${String(defaultDueDate.getDate()).padStart(2, '0')}`;
      
      (transaction.Payment as any).ExpirationDate = formattedDueDate;
      (transaction.Payment as any).Identification = paymentData.payment.identification || merchantOrderId;
      (transaction.Payment as any).Instructions = paymentData.payment.instructions || 'Não receber após o vencimento';
    } 
    // Processa pagamento por PIX
    else if (paymentType === 'Pix') {
      // Configura o tempo de expiração do QR Code (minutos) - padrão: 60 minutos
      (transaction.Payment as any).QrCodeExpiration = paymentData.payment.qrCodeExpiration || 60;
    } 
    else {
      return NextResponse.json({
        success: false,
        message: `Tipo de pagamento '${paymentType}' não suportado`
      }, { status: 400 });
    }
    
    // Cria uma instância do gateway de pagamento da Cielo
    const cieloGateway = new CieloPaymentGateway();
    
    // Registra a tentativa de criação da transação
    logInfo('Iniciando processamento de pagamento Cielo', {
      merchantOrderId,
      paymentType,
      amount: paymentData.payment.amount
    });
    
    // Envia a transação para a Cielo
    const response = await cieloGateway.createTransaction(transaction);
    
    // Registra o sucesso na criação da transação
    logInfo('Pagamento processado com sucesso', {
      merchantOrderId,
      paymentId: response.Payment.PaymentId,
      status: response.Payment.Status
    });
    
    // Retorna a resposta da Cielo
    return NextResponse.json({
      success: true,
      message: 'Pagamento processado com sucesso',
      paymentId: response.Payment.PaymentId,
      transaction: response
    });
  } catch (error: any) {
    // Registra o erro no logger
    logError('Erro ao processar pagamento', { 
      error: error.message, 
      stack: error.stack 
    });
    
    // Retorna resposta de erro
    return NextResponse.json({
      success: false,
      message: 'Erro ao processar pagamento',
      error: error.message
    }, { status: 500 });
  }
} 