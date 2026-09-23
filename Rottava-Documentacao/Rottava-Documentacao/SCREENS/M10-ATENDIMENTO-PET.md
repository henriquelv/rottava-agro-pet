# M10 Execução do banho e tosa

**Rota proposta:** `/admin/agenda/:id`  
**Acesso:** Recepção e equipe de serviços  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Registrar recebimento do pet, execução e entrega ao responsável.

## Composição e hierarquia
Pet e responsável; observações necessárias; serviço e preço aprovados; checklist de entrada; etapas; adicionais propostos; pronto para buscar; encerramento e pagamento.

## Ações e navegação
Receber pet; iniciar; pedir aprovação de adicional; marcar pronto; registrar entrega do pet; registrar pagamento pelo fluxo autorizado.

## Regras e validações
Não iniciar adicional sem aprovação; observações internas separadas das exibidas ao cliente; concluir serviço não equivale a quitar; identificação de quem retira conforme política.

## Estados e exceções
Pet não compareceu; atendimento interrompido; aprovação pendente; responsável atrasado; ocorrência registrada com contato.

## Dados e integrações
POST /admin/appointments/:id/events; /change-proposals; pagamento do serviço conforme decisão D08. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, priorizar tarefa atual, botões grandes e lista em vez de tabela; mapa é complementar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Histórico tem operador e horário.
- adicional não aprovado não é cobrado.
- pet pronto gera aviso apenas uma vez por evento.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
