import React from 'react'
import {
  Wallet,
  ArrowUp,
  ArrowDown,
  Bank,
  CreditCard,
  Money,
  Receipt
} from 'phosphor-react'
import { formatCurrency, formatDate } from '@/utils/admin'

// Dados mock para demonstração
const mockData = {
  fluxoCaixa: {
    saldoAtual: 45678.90,
    entradas: 78900.50,
    saidas: 33221.60,
    previsaoProximoMes: 52000.00
  },
  contasReceber: [
    {
      id: '1',
      cliente: 'João Silva',
      valor: 189.90,
      vencimento: '2024-03-25',
      status: 'pendente'
    },
    {
      id: '2',
      cliente: 'Maria Santos',
      valor: 450.50,
      vencimento: '2024-03-28',
      status: 'pendente'
    },
    {
      id: '3',
      cliente: 'Pedro Oliveira',
      valor: 780.30,
      vencimento: '2024-03-22',
      status: 'atrasado'
    }
  ],
  contasPagar: [
    {
      id: '1',
      fornecedor: 'Fornecedor A',
      valor: 2500.00,
      vencimento: '2024-03-30',
      categoria: 'Produtos'
    },
    {
      id: '2',
      fornecedor: 'Fornecedor B',
      valor: 1800.00,
      vencimento: '2024-03-25',
      categoria: 'Insumos'
    },
    {
      id: '3',
      fornecedor: 'Aluguel',
      valor: 3500.00,
      vencimento: '2024-04-05',
      categoria: 'Fixo'
    }
  ],
  formasPagamento: {
    dinheiro: 25,
    credito: 45,
    debito: 20,
    pix: 10
  }
}

export default function FinancialManagement() {
  return (
    <div className="space-y-6">
      {/* Fluxo de Caixa */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-text/60">Saldo Atual</span>
              <h3 className="text-2xl font-bold">
                {formatCurrency(mockData.fluxoCaixa.saldoAtual)}
              </h3>
            </div>
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Wallet size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-text/60">Entradas</span>
              <h3 className="text-2xl font-bold text-green-500">
                {formatCurrency(mockData.fluxoCaixa.entradas)}
              </h3>
            </div>
            <div className="p-2 bg-green-100 text-green-500 rounded-lg">
              <ArrowUp size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-text/60">Saídas</span>
              <h3 className="text-2xl font-bold text-red-500">
                {formatCurrency(mockData.fluxoCaixa.saidas)}
              </h3>
            </div>
            <div className="p-2 bg-red-100 text-red-500 rounded-lg">
              <ArrowDown size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-text/60">Previsão Próximo Mês</span>
              <h3 className="text-2xl font-bold">
                {formatCurrency(mockData.fluxoCaixa.previsaoProximoMes)}
              </h3>
            </div>
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Bank size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Formas de Pagamento */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-6">Formas de Pagamento</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
            <Money className="text-green-500" size={24} />
            <div>
              <span className="block text-sm text-text/60">Dinheiro</span>
              <strong>{mockData.formasPagamento.dinheiro}%</strong>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
            <CreditCard className="text-blue-500" size={24} />
            <div>
              <span className="block text-sm text-text/60">Crédito</span>
              <strong>{mockData.formasPagamento.credito}%</strong>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
            <CreditCard className="text-purple-500" size={24} />
            <div>
              <span className="block text-sm text-text/60">Débito</span>
              <strong>{mockData.formasPagamento.debito}%</strong>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
            <Receipt className="text-primary" size={24} />
            <div>
              <span className="block text-sm text-text/60">PIX</span>
              <strong>{mockData.formasPagamento.pix}%</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contas a Receber */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Contas a Receber</h2>
          <div className="space-y-4">
            {mockData.contasReceber.map((conta) => (
              <div
                key={conta.id}
                className="flex items-center justify-between p-4 bg-background rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{conta.cliente}</h4>
                  <div className="flex items-center gap-4 text-sm text-text/60">
                    <span>Vencimento: {formatDate(conta.vencimento)}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        conta.status === 'atrasado'
                          ? 'bg-red-100 text-red-500'
                          : 'bg-amber-100 text-amber-500'
                      }`}
                    >
                      {conta.status === 'atrasado' ? 'Atrasado' : 'Pendente'}
                    </span>
                  </div>
                </div>
                <span className="font-medium">{formatCurrency(conta.valor)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contas a Pagar */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Contas a Pagar</h2>
          <div className="space-y-4">
            {mockData.contasPagar.map((conta) => (
              <div
                key={conta.id}
                className="flex items-center justify-between p-4 bg-background rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{conta.fornecedor}</h4>
                  <div className="flex items-center gap-4 text-sm text-text/60">
                    <span>Vencimento: {formatDate(conta.vencimento)}</span>
                    <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                      {conta.categoria}
                    </span>
                  </div>
                </div>
                <span className="font-medium">{formatCurrency(conta.valor)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 