import { NextResponse } from 'next/server';
import { PaymentService } from '@/services/paymentService';
import { logError, logInfo } from '@/lib/logger';

export async function POST(request: Request) {
  try {
    // Obtém os dados do corpo da requisição
    const requestData = await request.json();
    const { produtos, cliente, metodoPagamento, opcoes } = requestData;

    // Validações básicas
    if (!produtos || !Array.isArray(produtos) || produtos.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Produtos inválidos' },
        { status: 400 }
      );
    }

    if (!cliente || !cliente.nome || !cliente.email) {
      return NextResponse.json(
        { success: false, error: 'Dados do cliente incompletos' },
        { status: 400 }
      );
    }

    if (!metodoPagamento || !metodoPagamento.tipo) {
      return NextResponse.json(
        { success: false, error: 'Método de pagamento inválido' },
        { status: 400 }
      );
    }

    // Validações específicas por método de pagamento
    if (metodoPagamento.tipo === 'credito' || metodoPagamento.tipo === 'debito') {
      if (!metodoPagamento.numeroCartao || !metodoPagamento.titular || 
          !metodoPagamento.validade || !metodoPagamento.cvv) {
        return NextResponse.json(
          { success: false, error: 'Dados do cartão incompletos' },
          { status: 400 }
        );
      }
    } else if (metodoPagamento.tipo === 'boleto') {
      if (!metodoPagamento.dataVencimento) {
        return NextResponse.json(
          { success: false, error: 'Data de vencimento do boleto não informada' },
          { status: 400 }
        );
      }
    }

    logInfo('Recebida requisição de pagamento', {
      clienteEmail: cliente.email,
      metodoPagamento: metodoPagamento.tipo,
      qtdProdutos: produtos.length
    });

    // Processa o pagamento
    const paymentService = new PaymentService();
    const resultado = await paymentService.processarPagamento(
      produtos,
      cliente,
      metodoPagamento,
      opcoes
    );

    if (resultado.success) {
      return NextResponse.json(
        resultado,
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        resultado,
        { status: 400 }
      );
    }
  } catch (error) {
    logError('Erro ao processar requisição de pagamento', { error });
    
    return NextResponse.json(
      { success: false, error: 'Erro interno ao processar pagamento' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('paymentId');

    if (!paymentId) {
      return NextResponse.json(
        { success: false, error: 'PaymentId não informado' },
        { status: 400 }
      );
    }

    const paymentService = new PaymentService();
    const resultado = await paymentService.consultarPagamento(paymentId);

    if (resultado.success) {
      return NextResponse.json(resultado, { status: 200 });
    } else {
      return NextResponse.json(resultado, { status: 404 });
    }
  } catch (error) {
    logError('Erro ao consultar pagamento', { error });
    
    return NextResponse.json(
      { success: false, error: 'Erro interno ao consultar pagamento' },
      { status: 500 }
    );
  }
} 