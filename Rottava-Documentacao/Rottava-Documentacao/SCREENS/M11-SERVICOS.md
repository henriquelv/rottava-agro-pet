# M11 Serviços e capacidade

**Rota proposta:** `/admin/servicos`  
**Acesso:** Gestor de serviços  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Definir serviços, preços, durações, profissionais e recursos que sustentam a agenda.

## Composição e hierarquia
Lista de serviços; duração e intervalo; regras por porte/pelagem; preço fixo ou avaliação; profissionais habilitados; recursos compartilhados; expediente e bloqueios.

## Ações e navegação
Criar/editar serviço; associar recursos; configurar capacidade; testar disponibilidade; ativar versão.

## Regras e validações
Serviço publicado precisa duração e capacidade válidas; revisão não altera reserva confirmada sem fluxo de mudança; regras reais dependem da loja.

## Estados e exceções
Configuração incompatível: impedir ativação; recurso inativo com agenda futura: exigir resolução; preço incompleto: modo avaliação.

## Dados e integrações
CRUD /admin/services, /admin/resources, /admin/business-hours. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, priorizar tarefa atual, botões grandes e lista em vez de tabela; mapa é complementar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Capacidade simulada corresponde à agenda.
- inativação não apaga histórico.
- duração impacta todos os recursos necessários.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
