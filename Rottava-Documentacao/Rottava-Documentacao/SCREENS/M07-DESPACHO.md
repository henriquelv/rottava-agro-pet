# M07 Despacho de entregas

**Rota proposta:** `/admin/entregas`  
**Acesso:** Despachante, gestor  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Atribuir pedidos prontos a entregadores e organizar paradas.

## Composição e hierarquia
Fila de pedidos prontos; mapa por área; lista de entregadores disponíveis; rotas abertas; capacidade; cobranças presenciais identificadas.

## Ações e navegação
Selecionar pedidos; atribuir entregador; ordenar paradas; confirmar rota; reatribuir antes/mediante interrupção registrada; abrir M08.

## Regras e validações
Pedido precisa estar separado; Pix/cartão online exigem aprovação; presencial admite saída apenas no modo aprovado D04; motorista só recebe dados da própria rota; otimização automática é proposta, não dependência inicial.

## Estados e exceções
Sem entregador: fila; endereço inconsistente: devolver para correção com cliente; atribuição concorrente: um vencedor; motorista offline: aviso.

## Dados e integrações
POST /admin/delivery-routes; /assign; /reassign; lista de pedidos elegíveis. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, priorizar tarefa atual, botões grandes e lista em vez de tabela; mapa é complementar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Pedido não integra duas rotas ativas.
- cobrança é visível ao motorista.
- cancelamento retira elegibilidade de despacho.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
