# C10 Detalhe do agendamento

**Rota proposta:** `/minha-conta/agendamentos/:id`  
**Acesso:** Cliente dono  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Orientar comparecimento e acompanhar execução do serviço.

## Composição e hierarquia
Pet; serviços; data e duração; endereço da loja; preço previsto/final quando aprovado; etapas; instruções fornecidas pela loja; remarcar/cancelar; contato.

## Ações e navegação
Solicitar remarcação abre seleção de horário mantendo original até substituição confirmada; cancelar pede motivo; aprovar alteração de serviço/preço quando oferecida; falar com equipe.

## Regras e validações
Prazos e multas não foram definidos; nenhuma cobrança automática por falta; adicional exige consentimento registrado; estados de serviço não são estados de entrega de produtos.

## Estados e exceções
Aguardando confirmação, confirmado, pet recebido, em atendimento, pronto, concluído, cancelado, não compareceu; política impede alteração: atendimento humano.

## Dados e integrações
GET /appointments/:id; /reschedule; /cancel; /approve-change. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, usar coluna única, foco visível e botões com rótulos; manter o contexto ao voltar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Falha na remarcação mantém vaga antiga.
- cliente vê cobrança adicional antes de aprovar.
- conclusão preserva histórico.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
