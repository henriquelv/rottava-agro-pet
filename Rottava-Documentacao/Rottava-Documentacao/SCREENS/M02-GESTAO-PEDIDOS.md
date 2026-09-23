# M02 Fila de pedidos

**Rota proposta:** `/admin/pedidos`  
**Acesso:** Operador, gestor  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Organizar recebimento, separação, retirada e exceções.

## Composição e hierarquia
Tabela ou quadro por status; filtros canal, recebimento, pagamento e período; busca por número/cliente; alerta de integração; abrir detalhes.

## Ações e navegação
Abrir M03; assumir separação; atribuir operador; imprimir resumo quando aprovado; filtros persistentes.

## Regras e validações
Ações em lote exigem elegibilidade individual; não liberar retirada/expedição pelo simples status de integração; operação segue regra de pagamento presencial ou online.

## Estados e exceções
Pedido bloqueado por estoque; sincronização pendente; concorrência entre operadores: atualizar registro.

## Dados e integrações
GET /admin/orders; POST /admin/orders/:id/claim; versão de registro. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, priorizar tarefa atual, botões grandes e lista em vez de tabela; mapa é complementar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Mesmo pedido não é separado duas vezes sem aviso.
- filtros distinguem entrega e retirada.
- pendência financeira visível.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
