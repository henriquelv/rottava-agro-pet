# C02 Histórico de pedidos

**Rota proposta:** `/minha-conta/pedidos`  
**Acesso:** Cliente  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Consultar compras realizadas no site e no WhatsApp vinculado.

## Composição e hierarquia
Lista paginada; filtros por período e status; número, data, total, canal, entrega/retirada e situação; ação Ver pedido e Comprar novamente.

## Ações e navegação
Abrir C03; repetir cria carrinho novo com catálogo atual e diferenças destacadas; filtros permanecem na URL.

## Regras e validações
Pedidos do WhatsApp só aparecem após vínculo de identidade validado; repetir não replica preço histórico nem pagamento; pedidos antigos do sistema existente dependem de integração identificada.

## Estados e exceções
Sem pedidos: catálogo; pedido importado incompleto: indicar campos indisponíveis; falha: tentar novamente.

## Dados e integrações
GET /me/orders; POST /orders/:id/reorder; histórico legado como integração pendente. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, usar coluna única, foco visível e botões com rótulos; manter o contexto ao voltar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Recompra usa preços atuais.
- histórico não expõe outros compradores.
- canal aparece corretamente.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
