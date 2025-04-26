import { v4 as uuidv4 } from 'uuid';
import { CieloPaymentGateway, CieloCustomer } from '../lib/cielo';
import { logError, logInfo } from '../lib/logger';
import prisma from '../lib/prisma';

interface ProdutoCarrinho {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  imagem?: string;
}

interface ClienteCheckout {
  nome: string;
  email: string;
  cpf?: string;
  telefone?: string;
  endereco?: {
    rua: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
}

interface PagamentoCartao {
  tipo: 'credito' | 'debito';
  numeroCartao: string;
  titular: string;
  validade: string;
  cvv: string;
  parcelas: number;
  bandeira: string;
}

interface PagamentoPix {
  tipo: 'pix';
  expiracao?: number; // Minutos
}

interface PagamentoBoleto {
  tipo: 'boleto';
  dataVencimento: string; // YYYY-MM-DD
  instrucoes?: string;
}

type MetodoPagamento = PagamentoCartao | PagamentoPix | PagamentoBoleto;

interface OpcoesProcessamento {
  saveCustomer?: boolean;
  notifyByEmail?: boolean;
  captureImmediately?: boolean;
}

/**
 * Serviço para processamento de pagamentos
 */
export class PaymentService {
  private gateway: CieloPaymentGateway;

  constructor() {
    this.gateway = new CieloPaymentGateway();
  }

  /**
   * Processa um pagamento com base nos produtos, cliente e método de pagamento
   */
  async processarPagamento(
    produtos: ProdutoCarrinho[],
    cliente: ClienteCheckout,
    metodoPagamento: MetodoPagamento,
    opcoes: OpcoesProcessamento = {
      saveCustomer: true,
      notifyByEmail: true,
      captureImmediately: true
    }
  ) {
    try {
      // Gera um ID único para o pedido
      const orderId = `ORD-${uuidv4().substring(0, 8)}`;
      
      // Calcula o valor total
      const valorTotal = produtos.reduce(
        (total, item) => total + item.preco * item.quantidade,
        0
      );

      logInfo('Iniciando processamento de pagamento', {
        orderId,
        clienteEmail: cliente.email,
        valorTotal,
        metodoPagamento: metodoPagamento.tipo,
        qtdProdutos: produtos.length
      });

      // Converte o cliente para o formato da Cielo
      const cieloCustomer = this.converterCliente(cliente);

      // Processa o pagamento de acordo com o método escolhido
      let resultadoPagamento;
      switch (metodoPagamento.tipo) {
        case 'credito':
          resultadoPagamento = await this.processarCartaoCredito(
            orderId,
            cieloCustomer,
            valorTotal,
            metodoPagamento,
            opcoes.captureImmediately
          );
          break;
        
        case 'debito':
          // Implementar se necessário
          throw new Error('Pagamento com cartão de débito não suportado ainda');
        
        case 'pix':
          resultadoPagamento = await this.processarPix(
            orderId,
            cieloCustomer,
            valorTotal,
            metodoPagamento
          );
          break;
        
        case 'boleto':
          resultadoPagamento = await this.processarBoleto(
            orderId,
            cieloCustomer,
            valorTotal,
            metodoPagamento
          );
          break;
        
        default:
          throw new Error(`Método de pagamento não suportado: ${(metodoPagamento as any).tipo}`);
      }

      // Salvar o pedido no banco de dados
      const pedido = await this.salvarPedido(
        orderId,
        cliente,
        produtos,
        valorTotal,
        resultadoPagamento,
        metodoPagamento
      );

      // Enviar e-mail de confirmação se necessário
      if (opcoes.notifyByEmail) {
        // TODO: Integrar com serviço de e-mail
        // await this.enviarEmailConfirmacao(pedido);
      }

      return {
        success: true,
        orderId: pedido.id,
        paymentId: resultadoPagamento.Payment.PaymentId,
        status: resultadoPagamento.Payment.Status,
        transactionDetails: resultadoPagamento.Payment,
      };
    } catch (error) {
      logError('Erro ao processar pagamento', { error });
      
      if (error.name === 'CieloError') {
        return {
          success: false,
          error: error.message,
          statusCode: error.statusCode,
          details: error.cieloResponse
        };
      }
      
      return {
        success: false,
        error: error.message || 'Erro desconhecido ao processar pagamento'
      };
    }
  }

  /**
   * Processa pagamento com cartão de crédito
   */
  private async processarCartaoCredito(
    orderId: string,
    cliente: CieloCustomer,
    valorTotal: number,
    dadosCartao: PagamentoCartao,
    capturaImediata: boolean = true
  ) {
    return this.gateway.createCreditCardPayment(
      orderId,
      cliente,
      valorTotal,
      {
        cardNumber: dadosCartao.numeroCartao.replace(/\s/g, ''),
        holder: dadosCartao.titular,
        expirationDate: dadosCartao.validade,
        securityCode: dadosCartao.cvv,
        brand: dadosCartao.bandeira
      },
      dadosCartao.parcelas || 1,
      capturaImediata,
      'ROTTAVA PET'
    );
  }

  /**
   * Processa pagamento com Pix
   */
  private async processarPix(
    orderId: string,
    cliente: CieloCustomer,
    valorTotal: number,
    dadosPix: PagamentoPix
  ) {
    return this.gateway.createPixPayment(
      orderId,
      cliente,
      valorTotal,
      dadosPix.expiracao || 60 // Padrão: 60 minutos
    );
  }

  /**
   * Processa pagamento com Boleto
   */
  private async processarBoleto(
    orderId: string,
    cliente: CieloCustomer,
    valorTotal: number,
    dadosBoleto: PagamentoBoleto
  ) {
    return this.gateway.createBoletoPayment(
      orderId,
      cliente,
      valorTotal,
      {
        expirationDate: dadosBoleto.dataVencimento,
        instructions: dadosBoleto.instrucoes || 'Pagar até a data de vencimento para evitar juros e multas.'
      }
    );
  }

  /**
   * Salva o pedido no banco de dados
   */
  private async salvarPedido(
    orderId: string,
    cliente: ClienteCheckout,
    produtos: ProdutoCarrinho[],
    valorTotal: number,
    resultadoPagamento: any,
    metodoPagamento: MetodoPagamento
  ) {
    try {
      // Verifica se o cliente já existe
      let usuarioId = null;
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { email: cliente.email }
      });

      if (usuarioExistente) {
        usuarioId = usuarioExistente.id;
      } else {
        // Cria um novo usuário
        const novoUsuario = await prisma.usuario.create({
          data: {
            email: cliente.email,
            nome: cliente.nome,
            telefone: cliente.telefone,
            cpf: cliente.cpf,
            endereco: cliente.endereco ? {
              create: {
                rua: cliente.endereco.rua,
                numero: cliente.endereco.numero,
                complemento: cliente.endereco.complemento,
                bairro: cliente.endereco.bairro,
                cidade: cliente.endereco.cidade,
                estado: cliente.endereco.estado,
                cep: cliente.endereco.cep
              }
            } : undefined
          }
        });
        usuarioId = novoUsuario.id;
      }

      // Cria o pedido
      const pedido = await prisma.pedido.create({
        data: {
          id: orderId,
          usuarioId,
          valorTotal,
          status: this.mapearStatusPagamento(resultadoPagamento.Payment.Status),
          metodoPagamento: metodoPagamento.tipo,
          paymentId: resultadoPagamento.Payment.PaymentId,
          transacaoData: JSON.stringify(resultadoPagamento),
          itens: {
            create: produtos.map(produto => ({
              produtoId: produto.id,
              quantidade: produto.quantidade,
              precoUnitario: produto.preco,
              nome: produto.nome
            }))
          }
        },
        include: {
          itens: true,
          usuario: true
        }
      });

      logInfo('Pedido salvo com sucesso', {
        orderId,
        paymentId: resultadoPagamento.Payment.PaymentId,
        status: pedido.status
      });

      return pedido;
    } catch (error) {
      logError('Erro ao salvar pedido', { error, orderId });
      throw error;
    }
  }

  /**
   * Converte cliente do formato da aplicação para o formato da Cielo
   */
  private converterCliente(cliente: ClienteCheckout): CieloCustomer {
    const cieloCustomer: CieloCustomer = {
      Name: cliente.nome
    };

    if (cliente.email) {
      cieloCustomer.Email = cliente.email;
    }

    if (cliente.cpf) {
      cieloCustomer.Identity = cliente.cpf.replace(/\D/g, '');
      cieloCustomer.IdentityType = 'CPF';
    }

    if (cliente.endereco) {
      cieloCustomer.Address = {
        Street: cliente.endereco.rua,
        Number: cliente.endereco.numero,
        Complement: cliente.endereco.complemento,
        ZipCode: cliente.endereco.cep.replace(/\D/g, ''),
        City: cliente.endereco.cidade,
        State: cliente.endereco.estado,
        Country: 'BRA',
        District: cliente.endereco.bairro
      };

      // Usar o mesmo endereço para entrega
      cieloCustomer.DeliveryAddress = { ...cieloCustomer.Address };
    }

    return cieloCustomer;
  }

  /**
   * Mapeia o status de pagamento da Cielo para o formato da aplicação
   */
  private mapearStatusPagamento(statusCielo: number): string {
    const statusMap: Record<number, string> = {
      0: 'pendente',     // NotFinished
      1: 'pendente',     // Authorized
      2: 'confirmado',   // PaymentConfirmed
      3: 'cancelado',    // Denied
      10: 'cancelado',   // Voided
      11: 'reembolsado', // Refunded
      12: 'pendente',    // Pending
      13: 'falha',       // Aborted
      20: 'agendado'     // Scheduled
    };

    return statusMap[statusCielo] || 'pendente';
  }

  /**
   * Consulta um pagamento pelo ID
   */
  async consultarPagamento(paymentId: string) {
    try {
      const resposta = await this.gateway.getTransaction(paymentId);
      
      return {
        success: true,
        orderId: resposta.MerchantOrderId,
        paymentId: resposta.Payment.PaymentId,
        status: resposta.Payment.Status,
        statusFormatado: this.mapearStatusPagamento(resposta.Payment.Status),
        valor: resposta.Payment.Amount / 100, // Converte de centavos para reais
        detalhesPagamento: resposta.Payment
      };
    } catch (error) {
      logError('Erro ao consultar pagamento', { error, paymentId });
      
      return {
        success: false,
        error: error.message || 'Erro ao consultar pagamento'
      };
    }
  }

  /**
   * Captura um pagamento previamente autorizado
   */
  async capturarPagamento(paymentId: string, valorParcial?: number) {
    try {
      const resposta = await this.gateway.captureTransaction(paymentId, valorParcial);
      
      // Atualiza o status do pedido no banco de dados
      await this.atualizarStatusPedido(resposta.MerchantOrderId, resposta.Payment.Status);
      
      return {
        success: true,
        orderId: resposta.MerchantOrderId,
        paymentId: resposta.Payment.PaymentId,
        status: resposta.Payment.Status,
        statusFormatado: this.mapearStatusPagamento(resposta.Payment.Status),
        valorCapturado: resposta.Payment.CapturedAmount / 100
      };
    } catch (error) {
      logError('Erro ao capturar pagamento', { error, paymentId });
      
      return {
        success: false,
        error: error.message || 'Erro ao capturar pagamento'
      };
    }
  }

  /**
   * Cancela um pagamento
   */
  async cancelarPagamento(paymentId: string, valorParcial?: number) {
    try {
      const resposta = await this.gateway.cancelTransaction(paymentId, valorParcial);
      
      // Atualiza o status do pedido no banco de dados
      await this.atualizarStatusPedido(resposta.MerchantOrderId, resposta.Payment.Status);
      
      return {
        success: true,
        orderId: resposta.MerchantOrderId,
        paymentId: resposta.Payment.PaymentId,
        status: resposta.Payment.Status,
        statusFormatado: this.mapearStatusPagamento(resposta.Payment.Status),
        valorCancelado: resposta.Payment.VoidedAmount / 100
      };
    } catch (error) {
      logError('Erro ao cancelar pagamento', { error, paymentId });
      
      return {
        success: false,
        error: error.message || 'Erro ao cancelar pagamento'
      };
    }
  }

  /**
   * Atualiza o status do pedido no banco de dados
   */
  private async atualizarStatusPedido(orderId: string, statusCielo: number) {
    try {
      const statusPedido = this.mapearStatusPagamento(statusCielo);
      
      await prisma.pedido.update({
        where: { id: orderId },
        data: { status: statusPedido }
      });
      
      logInfo('Status do pedido atualizado', { orderId, statusCielo, statusPedido });
      
      return true;
    } catch (error) {
      logError('Erro ao atualizar status do pedido', { error, orderId });
      throw error;
    }
  }
} 