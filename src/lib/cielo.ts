import axios from 'axios';
import { logError, logInfo } from './logger';

// Configuração da API da Cielo
const config = {
  merchantId: process.env.CIELO_MERCHANT_ID || '',
  merchantKey: process.env.CIELO_MERCHANT_KEY || '',
  sandbox: process.env.NODE_ENV !== 'production',
  apiUrl: process.env.NODE_ENV !== 'production'
    ? 'https://apisandbox.cieloecommerce.cielo.com.br'
    : 'https://api.cieloecommerce.cielo.com.br',
  apiQueryUrl: process.env.NODE_ENV !== 'production'
    ? 'https://apiquerysandbox.cieloecommerce.cielo.com.br'
    : 'https://apiquery.cieloecommerce.cielo.com.br',
};

// Tipos e interfaces
export interface CieloCustomer {
  Name: string;
  Email?: string;
  BirthDate?: string;
  Identity?: string;
  IdentityType?: string;
  Address?: {
    Street: string;
    Number: string;
    Complement?: string;
    ZipCode: string;
    City: string;
    State: string;
    Country: string;
    District?: string;
  };
  DeliveryAddress?: {
    Street: string;
    Number: string;
    Complement?: string;
    ZipCode: string;
    City: string;
    State: string;
    Country: string;
    District?: string;
  };
}

export interface CieloCreditCardPayment {
  Type: 'CreditCard';
  Amount: number;
  Installments?: number;
  SoftDescriptor?: string;
  Capture?: boolean;
  CreditCard: {
    CardNumber: string;
    Holder: string;
    ExpirationDate: string;
    SecurityCode: string;
    Brand: string;
    SaveCard?: boolean;
    CardToken?: string;
  };
}

export interface CieloDebitCardPayment {
  Type: 'DebitCard';
  Amount: number;
  ReturnUrl: string;
  DebitCard: {
    CardNumber: string;
    Holder: string;
    ExpirationDate: string;
    SecurityCode: string;
    Brand: string;
  };
}

export interface CieloBoletoPayment {
  Type: 'Boleto';
  Amount: number;
  Provider: string;
  Address: string;
  BoletoNumber: string;
  Assignor: string;
  Demonstrative: string;
  ExpirationDate: string;
  Identification: string;
  Instructions: string;
}

export interface CieloPixPayment {
  Type: 'Pix';
  Amount: number;
  QrCodeExpiration: number; // Tempo em minutos
}

export type CieloPayment = CieloCreditCardPayment | CieloDebitCardPayment | CieloBoletoPayment | CieloPixPayment;

export interface CieloTransactionRequest {
  MerchantOrderId: string;
  Customer: CieloCustomer;
  Payment: CieloPayment;
}

export interface CieloTransactionResponse {
  MerchantOrderId: string;
  Customer: CieloCustomer;
  Payment: {
    ServiceTaxAmount: number;
    Installments: number;
    Interest: string;
    Capture: boolean;
    Authenticate: boolean;
    Recurrent: boolean;
    CreditCard: {
      CardNumber: string;
      Holder: string;
      ExpirationDate: string;
      SaveCard: boolean;
      Brand: string;
    };
    Tid: string;
    ProofOfSale: string;
    AuthorizationCode: string;
    SoftDescriptor: string;
    Provider: string;
    PaymentId: string;
    Type: string;
    Amount: number;
    ReceivedDate: string;
    CapturedAmount: number;
    CapturedDate: string;
    Currency: string;
    Country: string;
    ReturnCode: string;
    ReturnMessage: string;
    Status: number;
    Links: Array<{
      Method: string;
      Rel: string;
      Href: string;
    }>;
    ExtraDataCollection: any[];
    ExpirationDate: string;
    Url: string;
    Number: string;
    BarCodeNumber: string;
    DigitableLine: string;
    Address: string;
    QrCodeBase64Image?: string;
    QrCodeString?: string;
  };
}

/**
 * Classe para integração com a API da Cielo
 */
export class CieloPaymentGateway {
  private merchantId: string;
  private merchantKey: string;
  private apiUrl: string;
  private apiQueryUrl: string;

  constructor() {
    this.merchantId = config.merchantId;
    this.merchantKey = config.merchantKey;
    this.apiUrl = config.apiUrl;
    this.apiQueryUrl = config.apiQueryUrl;
  }

  /**
   * Cria uma transação na Cielo
   */
  async createTransaction(transaction: CieloTransactionRequest): Promise<CieloTransactionResponse> {
    try {
      logInfo('Iniciando transação Cielo', { merchantOrderId: transaction.MerchantOrderId });

      const response = await axios.post(`${this.apiUrl}/1/sales`, transaction, {
        headers: this.getHeaders(),
      });

      logInfo('Transação Cielo criada com sucesso', {
        merchantOrderId: transaction.MerchantOrderId,
        paymentId: response.data.Payment.PaymentId,
      });

      return response.data;
    } catch (error) {
      logError('Erro ao criar transação Cielo', { error, transaction });
      throw this.handleApiError(error);
    }
  }

  /**
   * Captura uma transação de cartão de crédito
   */
  async captureTransaction(paymentId: string, amount?: number): Promise<CieloTransactionResponse> {
    try {
      const url = `${this.apiUrl}/1/sales/${paymentId}/capture`;
      const data = amount ? { Amount: amount } : {};

      const response = await axios.put(url, data, {
        headers: this.getHeaders(),
      });

      logInfo('Transação Cielo capturada com sucesso', { paymentId });
      return response.data;
    } catch (error) {
      logError('Erro ao capturar transação Cielo', { error, paymentId });
      throw this.handleApiError(error);
    }
  }

  /**
   * Cancela uma transação
   */
  async cancelTransaction(paymentId: string, amount?: number): Promise<CieloTransactionResponse> {
    try {
      const url = `${this.apiUrl}/1/sales/${paymentId}/void`;
      const queryParams = amount ? `?amount=${amount}` : '';

      const response = await axios.put(`${url}${queryParams}`, {}, {
        headers: this.getHeaders(),
      });

      logInfo('Transação Cielo cancelada com sucesso', { paymentId });
      return response.data;
    } catch (error) {
      logError('Erro ao cancelar transação Cielo', { error, paymentId });
      throw this.handleApiError(error);
    }
  }

  /**
   * Consulta uma transação pelo PaymentId
   */
  async getTransaction(paymentId: string): Promise<CieloTransactionResponse> {
    try {
      const response = await axios.get(`${this.apiQueryUrl}/1/sales/${paymentId}`, {
        headers: this.getHeaders(),
      });

      return response.data;
    } catch (error) {
      logError('Erro ao consultar transação Cielo', { error, paymentId });
      throw this.handleApiError(error);
    }
  }

  /**
   * Consulta uma transação pelo MerchantOrderId
   */
  async getTransactionByMerchantOrderId(merchantOrderId: string): Promise<CieloTransactionResponse> {
    try {
      const response = await axios.get(`${this.apiQueryUrl}/1/sales?merchantOrderId=${merchantOrderId}`, {
        headers: this.getHeaders(),
      });

      return response.data;
    } catch (error) {
      logError('Erro ao consultar transação Cielo por MerchantOrderId', { error, merchantOrderId });
      throw this.handleApiError(error);
    }
  }

  /**
   * Obtém headers padrão para requisições à API da Cielo
   */
  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'MerchantId': this.merchantId,
      'MerchantKey': this.merchantKey,
    };
  }

  /**
   * Trata erros da API da Cielo
   */
  private handleApiError(error: any): Error {
    if (error.response && error.response.data) {
      const { data } = error.response;
      return new Error(
        `Erro Cielo: ${data.Message || JSON.stringify(data)}`
      );
    }
    return error;
  }
}

// Instância para uso global
export const cieloGateway = new CieloPaymentGateway(); 