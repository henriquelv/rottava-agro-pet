# E03 Comprovar entrega e cobrança

**Rota proposta:** `/entregador/entregas/:id/concluir`  
**Acesso:** Entregador atribuído  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Registrar entrega física e cobrança presencial de maneira separada.

## Composição e hierarquia
Resumo da parada; nome do recebedor; código de confirmação proposto; ocorrência; valor devido; método e referência de cobrança; revisar e enviar.

## Ações e navegação
Confirmar recebedor/prova; informar recebimento; reportar recusa/ausência; enviar; aguardar aceite; voltar à rota.

## Regras e validações
Método de prova final depende da loja; foto não obrigatória por padrão; não fotografar documentos; Pix/cartão dependem de verificação, não de imagem enviada pelo cliente; dinheiro recebido gera prestação ao caixa.

## Estados e exceções
Código inválido; pagamento não confirmado; offline: conclusão pendente de envio, não definitiva; ocorrência impede fechamento automático.

## Dados e integrações
POST /deliveries/:id/complete com event_id e proof; POST /receipts com idempotency_key; upload privado se autorizado. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, priorizar tarefa atual, botões grandes e lista em vez de tabela; mapa é complementar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Prova de entrega e recibo têm IDs distintos.
- envio repetido produz mesmo resultado.
- saldo não some em caso de falha de sincronização.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)

## Estudo visual WF12-ENTREGADOR

Interface de campo com cobrança explícita, ocorrência e estado de conectividade.

![Parada do entregador](../WIREFRAMES/WF12-ENTREGADOR.svg)

[Versão PNG](../WIREFRAMES/WF12-ENTREGADOR.png)
