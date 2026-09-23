# M14 Pagamentos e conciliação

**Rota proposta:** `/admin/financeiro`  
**Acesso:** Financeiro, gestor  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Conferir recebimentos online e presenciais, diferenças e estornos.

## Composição e hierarquia
Tentativas por pedido; saldo a receber; recebimento informado pelo entregador; confirmação no caixa/provedor; estornos; eventos pendentes; filtros de divergência.

## Ações e navegação
Confirmar recebimento com método, valor e comprovante/referência; conciliar; iniciar estorno autorizado; revisar pagamento tardio; rejeitar lançamento incorreto com motivo.

## Regras e validações
Estorno não é exclusão; valor pago online só vem de provedor validado; dinheiro entregue ao motorista e dinheiro prestado ao caixa são registros distintos; pagamento parcial só se política aprovar.

## Estados e exceções
Webhook atrasado; pagamento duplicado; pagamento após cancelamento; estorno pendente; prestação de contas divergente.

## Dados e integrações
GET /admin/payments; /receipts; /refunds; /reconciliation; provider adapter. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, priorizar tarefa atual, botões grandes e lista em vez de tabela; mapa é complementar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Um evento não quita duas vezes.
- entrega física não quita saldo.
- somatório de recebimentos e estornos é auditável.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
