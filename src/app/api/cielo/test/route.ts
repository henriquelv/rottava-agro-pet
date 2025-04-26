import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { logError, logInfo } from '@/lib/logger';

const CIELO_API_URL = process.env.NODE_ENV !== 'production'
  ? 'https://apisandbox.cieloecommerce.cielo.com.br'
  : 'https://api.cieloecommerce.cielo.com.br';

const CIELO_QUERY_URL = process.env.NODE_ENV !== 'production'
  ? 'https://apiquerysandbox.cieloecommerce.cielo.com.br'
  : 'https://apiquery.cieloecommerce.cielo.com.br';

/**
 * Rota de teste para verificar a conexão com a API da Cielo
 * 
 * Esta rota testa a disponibilidade dos endpoints da Cielo e
 * retorna informações de status e configuração
 */
export async function GET(req: NextRequest) {
  try {
    // Registra a tentativa de teste da API da Cielo
    logInfo('Testando conexão com a API da Cielo', { 
      environment: process.env.NODE_ENV || 'development',
      method: 'GET'
    });

    // Verifica se as credenciais da Cielo estão configuradas
    const merchantId = process.env.CIELO_MERCHANT_ID;
    const merchantKey = process.env.CIELO_MERCHANT_KEY;

    if (!merchantId || !merchantKey) {
      return NextResponse.json({
        success: false,
        message: 'Credenciais da Cielo não configuradas',
        config: {
          apiUrl: CIELO_API_URL,
          queryUrl: CIELO_QUERY_URL,
          environment: process.env.NODE_ENV || 'development',
          credentials: {
            merchantId: merchantId ? 'Configurado' : 'Não configurado',
            merchantKey: merchantKey ? 'Configurado' : 'Não configurado'
          }
        }
      }, { status: 400 });
    }

    // Tenta realizar uma requisição simples para o endpoint de status
    const response = await axios.get(`${CIELO_QUERY_URL}/1/status`, {
      headers: {
        'MerchantId': merchantId,
        'MerchantKey': merchantKey,
        'Content-Type': 'application/json'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Conexão com a API da Cielo estabelecida com sucesso',
      apiStatus: response.data,
      config: {
        apiUrl: CIELO_API_URL,
        queryUrl: CIELO_QUERY_URL,
        environment: process.env.NODE_ENV || 'development',
        credentials: {
          merchantId: 'Configurado',
          merchantKey: 'Configurado'
        }
      }
    });
  } catch (error: any) {
    // Registra o erro no logger
    logError('Erro ao testar conexão com a API da Cielo', { 
      error: error.message, 
      stack: error.stack 
    });

    // Retorna resposta de erro com detalhes
    return NextResponse.json({
      success: false,
      message: 'Erro ao conectar com a API da Cielo',
      error: error.message,
      config: {
        apiUrl: CIELO_API_URL,
        queryUrl: CIELO_QUERY_URL,
        environment: process.env.NODE_ENV || 'development'
      }
    }, { status: 500 });
  }
} 