import { NextRequest, NextResponse } from 'next/server';
import { CieloPaymentGateway } from '@/lib/cielo';
import { logError, logInfo } from '@/lib/logger';

/**
 * Verifica o status de uma transação com a Cielo
 * 
 * Esta rota permite consultar o status atual de uma transação através
 * do ID de pagamento (paymentId) ou ID do pedido (merchantOrderId)
 */
export async function GET(req: NextRequest) {
  try {
    // Obtém os parâmetros da URL
    const searchParams = req.nextUrl.searchParams;
    const paymentId = searchParams.get('paymentId');
    const merchantOrderId = searchParams.get('merchantOrderId');
    
    // Verifica se pelo menos um dos parâmetros foi fornecido
    if (!paymentId && !merchantOrderId) {
      return NextResponse.json({
        success: false,
        message: 'É necessário fornecer paymentId ou merchantOrderId para consultar o status'
      }, { status: 400 });
    }
    
    // Cria uma instância do gateway de pagamento da Cielo
    const cieloGateway = new CieloPaymentGateway();
    
    let transaction;
    
    // Consulta pelo Payment ID, se fornecido
    if (paymentId) {
      logInfo('Consultando transação Cielo pelo PaymentId', { paymentId });
      transaction = await cieloGateway.getTransaction(paymentId);
    } 
    // Caso contrário, consulta pelo Merchant Order ID
    else if (merchantOrderId) {
      logInfo('Consultando transação Cielo pelo MerchantOrderId', { merchantOrderId });
      transaction = await cieloGateway.getTransactionByMerchantOrderId(merchantOrderId);
    }
    
    // Retorna os detalhes da transação
    return NextResponse.json({
      success: true,
      message: 'Consulta realizada com sucesso',
      transaction
    });
  } catch (error: any) {
    // Registra o erro no logger
    logError('Erro ao consultar status de transação', { 
      error: error.message, 
      stack: error.stack 
    });
    
    // Retorna resposta de erro
    return NextResponse.json({
      success: false,
      message: 'Erro ao consultar status de transação',
      error: error.message
    }, { status: 500 });
  }
} 