# C11 Cancelar ou relatar problema

**Rota proposta:** `/minha-conta/pedidos/:id/solicitacao`  
**Acesso:** Cliente dono  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Abrir uma solicitação rastreável de cancelamento, devolução ou problema.

## Composição e hierarquia
Pedido e itens; tipo de solicitação; motivo; descrição; anexos opcionais; regras publicadas aplicáveis; confirmação e protocolo; andamento.

## Ações e navegação
Enviar uma solicitação; consultar resposta; responder à equipe; retornar ao pedido.

## Regras e validações
Solicitação não cancela pedido automaticamente; decisão depende de estado e política aprovada; anexos têm tipo/tamanho controlados; estorno segue confirmação financeira separada.

## Estados e exceções
Solicitação aberta já existente: mostrar protocolo; upload falhou: manter texto; em análise, aprovada, recusada com motivo ou resolvida.

## Dados e integrações
POST /orders/:id/requests; GET /requests/:id; storage privado de anexos. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, usar coluna única, foco visível e botões com rótulos; manter o contexto ao voltar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Clique repetido não duplica protocolo.
- cliente só vê solicitações próprias.
- mensagem não promete estorno já concluído.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
