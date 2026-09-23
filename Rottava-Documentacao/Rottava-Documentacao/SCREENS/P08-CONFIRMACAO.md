# P08 Confirmação do pedido

**Rota proposta:** `/pedido/:id/confirmacao`  
**Acesso:** Cliente dono do pedido  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Informar que o pedido foi registrado e explicar próximos passos.

## Composição e hierarquia
Número, resumo, modalidade, endereço/loja, status financeiro e operacional separados; previsão se disponível; acompanhar pedido; continuar comprando; atendimento.

## Ações e navegação
Acompanhar abre C03; mapa aparece em C04 quando houver entrega ativa; pagar abre P07 para pendências elegíveis; contato leva contexto do pedido.

## Regras e validações
Texto Pedido recebido não equivale a Pagamento aprovado; presencial deve indicar valor e local de cobrança; prazo só aparece quando calculado ou confirmado pela operação.

## Estados e exceções
Aguardando pagamento, aguardando confirmação de estoque, confirmado ou revisão necessária; carregamento consulta pedido existente.

## Dados e integrações
GET /orders/:id e linha do tempo de eventos próprios. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, usar coluna única, foco visível e botões com rótulos; manter o contexto ao voltar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Cliente entende se precisa pagar e onde.
- recarga mantém número.
- retirada não exibe entregador ou mapa.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
