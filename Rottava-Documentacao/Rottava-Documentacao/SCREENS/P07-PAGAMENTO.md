# P07 Pagamento do pedido

**Rota proposta:** `/pedido/:id/pagamento`  
**Acesso:** Cliente dono do pedido  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Concluir Pix ou cartão e acompanhar confirmação financeira real.

## Composição e hierarquia
Número do pedido e total; Pix com QR, copiar código e expiração; cartão em componente hospedado/tokenizado do provedor; estado de processamento; opção de tentar novamente quando elegível; contato.

## Ações e navegação
Copiar Pix; abrir componente de cartão; consultar status; retentar cria nova tentativa elegível vinculada ao mesmo pedido; aprovação leva a P08; mudança para presencial só se regra permitir e tentativa anterior reconciliada.

## Regras e validações
Navegador não aprova pagamento; servidor valida evento do provedor; não armazenar número integral/CVV; expiração e aprovação tardia seguem reconciliação; parcelamento e provedor são pendências.

## Estados e exceções
Pendente, aprovado, recusado, expirado, em análise, serviço indisponível; após recusa preservar pedido; após expiração explicar disponibilidade e caminhos sem duplicar cobrança.

## Dados e integrações
POST /orders/:id/payment-attempts; GET /orders/:id/payment; provedor de pagamento e webhook autenticado. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, usar coluna única, foco visível e botões com rótulos; manter o contexto ao voltar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Atualizar página não gera nova cobrança.
- retorno do provedor sem confirmação não mostra pago.
- cobrança tardia não libera pedido cancelado sem reconciliação.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
