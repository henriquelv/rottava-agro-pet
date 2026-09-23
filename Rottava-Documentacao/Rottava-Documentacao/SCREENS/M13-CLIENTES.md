# M13 Clientes e contexto de atendimento

**Rota proposta:** `/admin/clientes/:id`  
**Acesso:** Atendente e gestor conforme permissão  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Consultar histórico útil para atendimento, com acesso proporcional à função.

## Composição e hierarquia
Contato verificado; pedidos; agendamentos; pets; solicitações; vínculos de canal; notas internas e trilha de acesso.

## Ações e navegação
Pesquisar cliente; abrir pedido/agendamento; corrigir dado permitido com registro; iniciar atendimento; nunca exibir senha.

## Regras e validações
Busca exige propósito operacional; exportação em massa fora do escopo inicial; vínculo externo por chave confiável, não coincidência de nome; motorista não acessa esta tela.

## Estados e exceções
Identidade ambígua: não mesclar; legado sem vínculo: revisão; acesso negado por papel.

## Dados e integrações
GET /admin/customers/:id; índices mínimos e adaptador de cadastro legado. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, priorizar tarefa atual, botões grandes e lista em vez de tabela; mapa é complementar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Permissões limitam campos.
- toda mescla requer evidência e auditoria.
- histórico não cruza clientes.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
