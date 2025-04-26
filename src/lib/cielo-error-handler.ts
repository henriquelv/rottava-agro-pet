import { logError } from './logger';

/**
 * Classe de erro personalizada para erros da API da Cielo
 */
export class CieloError extends Error {
  statusCode: number;
  cieloResponse: any;

  constructor(message: string, statusCode: number = 500, cieloResponse: any = null) {
    super(message);
    this.name = 'CieloError';
    this.statusCode = statusCode;
    this.cieloResponse = cieloResponse;
  }
}

/**
 * Função para lidar com erros da API da Cielo
 * @param error Erro capturado
 * @param context Contexto adicional para o log de erro
 */
export function handleCieloError(error: any, context: any = {}): never {
  if (error instanceof CieloError) {
    logError('Erro na API da Cielo', {
      message: error.message,
      statusCode: error.statusCode,
      cieloResponse: error.cieloResponse,
      ...context
    });
    throw error;
  }

  // Erro de rede ou outro erro não relacionado diretamente à resposta da API
  logError('Erro ao comunicar com a API da Cielo', {
    message: error.message,
    ...context
  });
  
  throw new CieloError(
    `Erro na comunicação com a Cielo: ${error.message}`,
    500
  );
}

/**
 * Função para executar uma operação com retry em caso de falha
 * @param operation Função a ser executada
 * @param maxRetries Número máximo de tentativas
 * @param delay Delay inicial entre tentativas (ms)
 * @param backoffFactor Fator de multiplicação para o delay a cada nova tentativa
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000,
  backoffFactor: number = 2
): Promise<T> {
  let lastError: any;
  let currentDelay = delay;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      // Não fazer retry em erros específicos que sabemos que não vão ser resolvidos com retentativas
      if (error instanceof CieloError) {
        // Não tentar novamente para erros de autenticação, dados inválidos, etc.
        if ([401, 403, 400, 422].includes(error.statusCode)) {
          throw error;
        }
      }
      
      // Se não for a última tentativa, aguardar antes de tentar novamente
      if (attempt < maxRetries) {
        logError(`Tentativa ${attempt} falhou, tentando novamente em ${currentDelay}ms`, {
          error: lastError.message
        });
        
        await new Promise(resolve => setTimeout(resolve, currentDelay));
        currentDelay *= backoffFactor; // Aumenta o delay para a próxima tentativa
      }
    }
  }

  // Se chegou aqui, todas as tentativas falharam
  logError(`Falha após ${maxRetries} tentativas`, {
    error: lastError.message
  });
  
  throw lastError;
} 