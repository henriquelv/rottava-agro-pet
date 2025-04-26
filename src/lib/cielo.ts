import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { logError, logInfo } from './logger';
import { CieloError, handleCieloError, withRetry } from './cielo-error-handler';

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

// Interfaces para tipagem
export interface CieloPaymentRequest {
  MerchantOrderId: string;
  Customer: {
    Name: string;
    Email?: string;
    Birthdate?: string;
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
    };
  };
  Payment: {
    Type: string;
    Amount: number;
    Installments: number;
    SoftDescriptor?: string;
    CreditCard?: {
      CardNumber: string;
      Holder: string;
      ExpirationDate: string;
      SecurityCode: string;
      Brand: string;
      SaveCard?: boolean;
    };
    DebitCard?: {
      CardNumber: string;
      Holder: string;
      ExpirationDate: string;
      SecurityCode: string;
      Brand: string;
    };
    Authenticate?: boolean;
    ReturnUrl?: string;
  };
}

export interface CieloTransaction {
  MerchantOrderId: string;
  Customer: {
    Name: string;
    Email?: string;
  };
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
    ProofOfSale: string;
    Tid: string;
    AuthorizationCode: string;
    PaymentId: string;
    Type: string;
    Amount: number;
    Currency: string;
    Country: string;
    ExtraDataCollection: any[];
    Status: number;
    Links: {
      Method: string;
      Rel: string;
      Href: string;
    }[];
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
    if (!config.merchantId || !config.merchantKey) {
      throw new CieloError(
        'Credenciais da Cielo não configuradas. Verifique as variáveis de ambiente.',
        500
      );
    }

    this.merchantId = config.merchantId;
    this.merchantKey = config.merchantKey;
    this.apiUrl = config.apiUrl;
    this.apiQueryUrl = config.apiQueryUrl;

    logInfo('CieloPaymentGateway inicializado', {
      sandbox: config.sandbox,
      apiUrl: this.apiUrl
    });
  }

  /**
   * Cria uma transação de cartão de crédito
   */
  async createCreditCardPayment(
    orderId: string,
    customer: CieloCustomer,
    amount: number,
    cardData: {
      cardNumber: string;
      holder: string;
      expirationDate: string;
      securityCode: string;
      brand: string;
    },
    installments: number = 1,
    capture: boolean = true,
    softDescriptor?: string
  ): Promise<CieloTransactionResponse> {
    try {
      // Converte o valor para centavos (API da Cielo espera o valor em centavos)
      const amountInCents = Math.round(amount * 100);

      const paymentRequest: CieloTransactionRequest = {
        MerchantOrderId: orderId,
        Customer: customer,
        Payment: {
          Type: 'CreditCard',
          Amount: amountInCents,
          Installments: installments,
          SoftDescriptor: softDescriptor,
          Capture: capture,
          CreditCard: {
            CardNumber: cardData.cardNumber,
            Holder: cardData.holder,
            ExpirationDate: cardData.expirationDate,
            SecurityCode: cardData.securityCode,
            Brand: cardData.brand
          }
        }
      };

      // Log da requisição (mascarando dados sensíveis)
      logInfo('Criando transação de cartão de crédito', {
        orderId,
        customerName: customer.Name,
        amount: amountInCents,
        installments,
        capture,
        cardBrand: cardData.brand,
        cardLastDigits: cardData.cardNumber.slice(-4)
      });

      const response = await withRetry(() => 
        axios.post<CieloTransactionResponse>(
          `${this.apiUrl}/1/sales`,
          paymentRequest,
          {
            headers: {
              'Content-Type': 'application/json',
              'MerchantId': this.merchantId,
              'MerchantKey': this.merchantKey,
              'RequestId': uuidv4()
            }
          }
        )
      );

      // Log da resposta
      logInfo('Transação de cartão de crédito criada com sucesso', {
        orderId,
        paymentId: response.data.Payment.PaymentId,
        status: response.data.Payment.Status,
        returnCode: response.data.Payment.ReturnCode,
        returnMessage: response.data.Payment.ReturnMessage
      });

      return response.data;
    } catch (error) {
      return handleCieloError(error, { 
        operation: 'createCreditCardPayment',
        orderId 
      });
    }
  }

  /**
   * Cria uma transação de cartão de débito
   */
  async createDebitCardPayment(
    orderId: string,
    customer: CieloCustomer,
    amount: number,
    cardData: {
      cardNumber: string;
      holder: string;
      expirationDate: string;
      securityCode: string;
      brand: string;
    },
    returnUrl: string = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pedidos/sucesso?metodo=cartao_debito`
  ): Promise<CieloTransactionResponse> {
    try {
      // Converte o valor para centavos (API da Cielo espera o valor em centavos)
      const amountInCents = Math.round(amount * 100);

      const paymentRequest: CieloTransactionRequest = {
        MerchantOrderId: orderId,
        Customer: customer,
        Payment: {
          Type: 'DebitCard',
          Amount: amountInCents,
          Authenticate: true, // Transações de débito precisam de autenticação
          ReturnUrl: returnUrl, // URL para redirecionamento após autenticação
          DebitCard: {
            CardNumber: cardData.cardNumber,
            Holder: cardData.holder,
            ExpirationDate: cardData.expirationDate,
            SecurityCode: cardData.securityCode,
            Brand: cardData.brand
          }
        }
      };

      // Log da requisição (mascarando dados sensíveis)
      logInfo('Criando transação de cartão de débito', {
        orderId,
        customerName: customer.Name,
        amount: amountInCents,
        cardBrand: cardData.brand,
        cardLastDigits: cardData.cardNumber.slice(-4)
      });

      const response = await withRetry(() => 
        axios.post<CieloTransactionResponse>(
          `${this.apiUrl}/1/sales`,
          paymentRequest,
          {
            headers: {
              'Content-Type': 'application/json',
              'MerchantId': this.merchantId,
              'MerchantKey': this.merchantKey,
              'RequestId': uuidv4()
            }
          }
        )
      );

      // Log da resposta
      logInfo('Transação de cartão de débito criada com sucesso', {
        orderId,
        paymentId: response.data.Payment.PaymentId,
        status: response.data.Payment.Status,
        returnCode: response.data.Payment.ReturnCode,
        returnMessage: response.data.Payment.ReturnMessage,
        authenticationUrl: response.data.Payment.AuthenticationUrl
      });

      return response.data;
    } catch (error) {
      return handleCieloError(error, { 
        operation: 'createDebitCardPayment',
        orderId 
      });
    }
  }

  /**
   * Captura uma transação previamente autorizada
   */
  async captureTransaction(
    paymentId: string,
    amount?: number
  ): Promise<CieloTransactionResponse> {
    try {
      const endpoint = amount 
        ? `${this.apiUrl}/1/sales/${paymentId}/capture?amount=${Math.round(amount * 100)}`
        : `${this.apiUrl}/1/sales/${paymentId}/capture`;

      logInfo('Capturando transação', { paymentId, partialAmount: !!amount });

      const response = await withRetry(() => 
        axios.put<CieloTransactionResponse>(
          endpoint,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              'MerchantId': this.merchantId,
              'MerchantKey': this.merchantKey,
              'RequestId': uuidv4()
            }
          }
        )
      );

      logInfo('Transação capturada com sucesso', {
        paymentId,
        status: response.data.Payment.Status,
        capturedAmount: response.data.Payment.CapturedAmount
      });

      return response.data;
    } catch (error) {
      return handleCieloError(error, { 
        operation: 'captureTransaction',
        paymentId 
      });
    }
  }

  /**
   * Cancela uma transação
   */
  async cancelTransaction(
    paymentId: string,
    amount?: number
  ): Promise<CieloTransactionResponse> {
    try {
      const endpoint = amount 
        ? `${this.apiUrl}/1/sales/${paymentId}/void?amount=${Math.round(amount * 100)}`
        : `${this.apiUrl}/1/sales/${paymentId}/void`;

      logInfo('Cancelando transação', { paymentId, partialAmount: !!amount });

      const response = await withRetry(() => 
        axios.put<CieloTransactionResponse>(
          endpoint,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              'MerchantId': this.merchantId,
              'MerchantKey': this.merchantKey,
              'RequestId': uuidv4()
            }
          }
        )
      );

      logInfo('Transação cancelada com sucesso', {
        paymentId,
        status: response.data.Payment.Status,
        voidedAmount: response.data.Payment.VoidedAmount
      });

      return response.data;
    } catch (error) {
      return handleCieloError(error, { 
        operation: 'cancelTransaction',
        paymentId 
      });
    }
  }

  /**
   * Consulta uma transação pelo PaymentId
   */
  async getTransaction(paymentId: string): Promise<CieloTransactionResponse> {
    try {
      logInfo('Consultando transação', { paymentId });

      const response = await withRetry(() => 
        axios.get<CieloTransactionResponse>(
          `${this.apiQueryUrl}/1/sales/${paymentId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'MerchantId': this.merchantId,
              'MerchantKey': this.merchantKey,
              'RequestId': uuidv4()
            }
          }
        )
      );

      logInfo('Transação consultada com sucesso', {
        paymentId,
        status: response.data.Payment.Status
      });

      return response.data;
    } catch (error) {
      return handleCieloError(error, { 
        operation: 'getTransaction',
        paymentId 
      });
    }
  }

  /**
   * Cria uma transação de Pix
   */
  async createPixPayment(
    orderId: string,
    customer: CieloCustomer,
    amount: number,
    expirationMinutes: number = 60
  ): Promise<CieloTransactionResponse> {
    try {
      // Converte o valor para centavos
      const amountInCents = Math.round(amount * 100);

      const paymentRequest: CieloTransactionRequest = {
        MerchantOrderId: orderId,
        Customer: customer,
        Payment: {
          Type: 'Pix',
          Amount: amountInCents,
          QrCodeExpiration: expirationMinutes
        }
      };

      logInfo('Criando transação Pix', {
        orderId,
        customerName: customer.Name,
        amount: amountInCents,
        expirationMinutes
      });

      const response = await withRetry(() => 
        axios.post<CieloTransactionResponse>(
          `${this.apiUrl}/1/sales`,
          paymentRequest,
          {
            headers: {
              'Content-Type': 'application/json',
              'MerchantId': this.merchantId,
              'MerchantKey': this.merchantKey,
              'RequestId': uuidv4()
            }
          }
        )
      );

      logInfo('Transação Pix criada com sucesso', {
        orderId,
        paymentId: response.data.Payment.PaymentId,
        status: response.data.Payment.Status
      });

      return response.data;
    } catch (error) {
      return handleCieloError(error, { 
        operation: 'createPixPayment',
        orderId 
      });
    }
  }

  /**
   * Cria uma transação de Boleto
   */
  async createBoletoPayment(
    orderId: string,
    customer: CieloCustomer,
    amount: number,
    boletoData: {
      expirationDate: string, // Formato: YYYY-MM-DD
      instructions: string,
      demonstrative?: string,
      boletoNumber?: string,
    }
  ): Promise<CieloTransactionResponse> {
    try {
      // Converte o valor para centavos
      const amountInCents = Math.round(amount * 100);

      const paymentRequest: CieloTransactionRequest = {
        MerchantOrderId: orderId,
        Customer: customer,
        Payment: {
          Type: 'Boleto',
          Amount: amountInCents,
          Provider: 'Bradesco2', // Provedor de boleto
          Address: customer.Address?.Street || 'Não informado',
          BoletoNumber: boletoData.boletoNumber || orderId,
          Assignor: 'Rottava Agro Pet',
          Demonstrative: boletoData.demonstrative || 'Pagamento Rottava Agro Pet',
          ExpirationDate: boletoData.expirationDate,
          Identification: this.merchantId.substring(0, 14),
          Instructions: boletoData.instructions
        }
      };

      logInfo('Criando transação de Boleto', {
        orderId,
        customerName: customer.Name,
        amount: amountInCents,
        expirationDate: boletoData.expirationDate
      });

      const response = await withRetry(() => 
        axios.post<CieloTransactionResponse>(
          `${this.apiUrl}/1/sales`,
          paymentRequest,
          {
            headers: {
              'Content-Type': 'application/json',
              'MerchantId': this.merchantId,
              'MerchantKey': this.merchantKey,
              'RequestId': uuidv4()
            }
          }
        )
      );

      logInfo('Transação de Boleto criada com sucesso', {
        orderId,
        paymentId: response.data.Payment.PaymentId,
        status: response.data.Payment.Status,
        boletoUrl: response.data.Payment.Url,
        boletoNumber: response.data.Payment.BoletoNumber
      });

      return response.data;
    } catch (error) {
      return handleCieloError(error, { 
        operation: 'createBoletoPayment',
        orderId 
      });
    }
  }
}

// Instância para uso global
export const cieloGateway = new CieloPaymentGateway(); 