# C09 Lista de agendamentos

**Rota proposta:** `/minha-conta/agendamentos`  
**Acesso:** Cliente  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Consultar próximos serviços e histórico.

## Composição e hierarquia
Abas Próximos e Anteriores; pet, serviço, horário, estado e preço quando definido; abrir detalhes; novo agendamento.

## Ações e navegação
Abrir C10; novo abre C08; filtrar por pet.

## Regras e validações
Proposta de autoatendimento sujeita à validação; histórico pertence ao cliente; cancelados e faltas permanecem com rótulo.

## Estados e exceções
Sem agendamentos: apresentação P04; horário atualizado pela loja: destacar mudança pendente de ciência.

## Dados e integrações
GET /me/appointments. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, usar coluna única, foco visível e botões com rótulos; manter o contexto ao voltar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Horários corretos no fuso local.
- pedidos de remarcação não aparecem como confirmados.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
