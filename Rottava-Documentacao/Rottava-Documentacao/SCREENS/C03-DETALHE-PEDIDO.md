# C03 Detalhe do pedido

**Rota proposta:** `/minha-conta/pedidos/:id`  
**Acesso:** Cliente dono  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Explicar situação, valores e próximos passos de uma compra.

## Composição e hierarquia
Resumo com status financeiro e operacional; linha do tempo; itens com snapshots; endereço/retirada; frete; pagamento; botões acompanhar, pagar, pedir ajuda, solicitar cancelamento.

## Ações e navegação
Mapa abre C04; pagar abre P07; problema abre C11; repetir abre P05; solicitar ajuda abre P09 com vínculo.

## Regras e validações
Itens do pedido são histórico imutável; alterações posteriores exigem revisão formal; ações disponíveis dependem dos estados; não mostrar dados internos ou notas privadas da equipe.

## Estados e exceções
Pagamento pendente; estoque em validação; atraso sem previsão; cancelamento solicitado; estorno em andamento.

## Dados e integrações
GET /orders/:id e /orders/:id/events; autorização por proprietário. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, usar coluna única, foco visível e botões com rótulos; manter o contexto ao voltar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Linha do tempo ordenada por evento.
- total fecha com itens e frete.
- cancelamento pedido não aparece como cancelamento aprovado.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
