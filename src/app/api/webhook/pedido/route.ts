import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cieloGateway } from '@/lib/cielo';
import { logError, logInfo } from '@/lib/logger';
import { CieloError } from '@/lib/cielo-error-handler';

// Mapeamento de estados de pagamento da Cielo para nossos estados internos
const CIELO_PAYMENT_STATUS_MAP = {
  '0': 'NotFinished',      // Não finalizado
  '1': 'Authorized',       // Autorizado
  '2': 'PaymentConfirmed', // Pagamento confirmado/capturado
  '3': 'Denied',           // Negado
  '10': 'Voided',          // Cancelado
  '11': 'Refunded',        // Reembolsado
  '12': 'Pending',         // Pendente
  '13': 'Aborted',         // Abortado
  '20': 'Scheduled',       // Agendado
};

// Função para validar a autenticação do webhook
function validateWebhookAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  
  // O formato esperado é "Bearer your-webhook-secret"
  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer') return false;
  
  // Verifica contra o segredo armazenado em variáveis de ambiente
  return token === process.env.WEBHOOK_SECRET;
}

export async function POST(request: NextRequest) {
  try {
    // Validar a autenticação do webhook
    if (!validateWebhookAuth(request)) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Extrair dados do corpo do webhook
    const webhookData = await request.json();
    logInfo('Webhook recebido:', webhookData);

    if (!webhookData.PaymentId) {
      return NextResponse.json(
        { error: 'PaymentId não fornecido' },
        { status: 400 }
      );
    }

    // Obter detalhes atualizados da transação da Cielo
    const transactionDetails = await cieloGateway.getTransaction(webhookData.PaymentId);
    
    // Obter o pedido associado a esta transação
    const pedido = await prisma.order.findFirst({
      where: {
        transacaoId: webhookData.PaymentId
      }
    });

    if (!pedido) {
      logError(`Pedido não encontrado para a transação ID: ${webhookData.PaymentId}`);
      return NextResponse.json(
        { error: 'Pedido não encontrado' },
        { status: 404 }
      );
    }

    // Mapear o status da Cielo para nosso status interno
    const statusPagamento = 
      CIELO_PAYMENT_STATUS_MAP[transactionDetails.Payment.Status.toString()] || 'Unknown';

    // Atualizar o status do pedido no banco de dados
    await prisma.order.update({
      where: { id: pedido.id },
      data: { 
        statusPagamento,
        updatedAt: new Date()
      }
    });

    // Processar ações adicionais com base no status
    await processarAcoesStatusPedido(pedido.id, statusPagamento);

    return NextResponse.json({
      success: true,
      message: `Status do pedido atualizado para: ${statusPagamento}`
    });
  } catch (error) {
    const errorMessage = error instanceof CieloError 
      ? `Erro Cielo: ${error.message}` 
      : `Erro ao processar webhook: ${error instanceof Error ? error.message : 'Erro desconhecido'}`;
    
    logError('Erro no webhook de pedido:', error);
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// Função para processar ações adicionais com base no status do pedido
async function processarAcoesStatusPedido(pedidoId: string, status: string) {
  try {
    // Obter detalhes completos do pedido
    const pedido = await prisma.order.findUnique({
      where: { id: pedidoId },
      include: {
        orderItems: {
          include: {
            product: true
          }
        },
        customer: true
      }
    });

    if (!pedido) {
      logError(`Pedido não encontrado para processamento de ações: ${pedidoId}`);
      return;
    }

    // Atualizar estoque com base no status
    if (status === 'PaymentConfirmed') {
      // Pagamento confirmado - processar pedido e atualizar estoque
      for (const item of pedido.orderItems) {
        // Criar movimentação de estoque
        await prisma.stockMovement.create({
          data: {
            productId: item.productId,
            type: 'SAIDA',
            quantity: item.quantity,
            reason: `Venda - Pedido ${pedido.id}`,
            notes: `Pagamento confirmado para o pedido ${pedido.id}`
          }
        });

        // Atualizar estoque do produto
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });
      }

      // Enviar e-mail de confirmação para o cliente
      await enviarEmailConfirmacaoPedido(pedido);
      
      logInfo(`Estoque atualizado e e-mail enviado para pedido ${pedidoId}`);
    } else if (status === 'Refunded' || status === 'Voided') {
      // Pedido cancelado ou reembolsado - reverter estoque
      for (const item of pedido.orderItems) {
        // Criar movimentação de estoque (devolução)
        await prisma.stockMovement.create({
          data: {
            productId: item.productId,
            type: 'ENTRADA',
            quantity: item.quantity,
            reason: `Devolução - Pedido ${pedido.id}`,
            notes: `Pedido ${status === 'Refunded' ? 'reembolsado' : 'cancelado'}`
          }
        });

        // Atualizar estoque do produto (devolver ao estoque)
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              increment: item.quantity
            }
          }
        });
      }

      // Enviar e-mail de cancelamento para o cliente
      await enviarEmailCancelamentoPedido(pedido, status);
      
      logInfo(`Estoque revertido e e-mail de cancelamento enviado para pedido ${pedidoId}`);
    }
  } catch (error) {
    logError('Erro ao processar ações de status de pedido:', error);
  }
}

// Funções para envio de e-mails (mock por enquanto)
async function enviarEmailConfirmacaoPedido(pedido: any) {
  // Implementar integração com serviço de e-mail
  logInfo(`[MOCK] E-mail de confirmação enviado para ${pedido.customer.email}`);
}

async function enviarEmailCancelamentoPedido(pedido: any, status: string) {
  // Implementar integração com serviço de e-mail
  logInfo(`[MOCK] E-mail de ${status === 'Refunded' ? 'reembolso' : 'cancelamento'} enviado para ${pedido.customer.email}`);
} 