# M17 Equipe e permissões

**Rota proposta:** `/admin/equipe`  
**Acesso:** Gestor autorizado  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Criar acessos de operação e limitar ações por responsabilidade.

## Composição e hierarquia
Usuários da equipe; papel; situação; último acesso; convite/ativação; matriz de permissões; auditoria.

## Ações e navegação
Convidar/criar acesso; atribuir papel; suspender; revogar sessões; revisar permissões.

## Regras e validações
Sem cadastro público de administrador; não permitir autoelevação; mínimo de acesso; separar motorista, recepção, operador, atendente, financeiro e gestor; mecanismo de ativação depende do provedor de autenticação.

## Estados e exceções
Convite expirado; usuário suspenso com tarefas: reatribuir; papel incompatível: impedir ação.

## Dados e integrações
CRUD /admin/staff; /roles; /sessions/revoke; auditoria. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, priorizar tarefa atual, botões grandes e lista em vez de tabela; mapa é complementar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Permissão é aplicada no backend.
- usuário suspenso perde acesso.
- operador sem financeiro não registra estorno.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
