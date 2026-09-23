# M18 Configurações da operação

**Rota proposta:** `/admin/configuracoes`  
**Acesso:** Gestor  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Centralizar decisões comerciais e horários usados pelos fluxos.

## Composição e hierarquia
Dados da loja; timezone; expediente e feriados; modalidades de recebimento; formas de pagamento; contato; parâmetros de reservas; versões de políticas; notificações.

## Ações e navegação
Salvar rascunho; validar; publicar parâmetros; consultar efeitos e versões; acessar módulos específicos de frete e serviços.

## Regras e validações
Configuração ausente não recebe valor comercial inventado; alteração crítica registra autor; regras novas não reescrevem pedidos confirmados; números de TTL técnicos são calibrados na implementação.

## Estados e exceções
Configuração incompleta; conflito; indisponibilidade de provedor; validação falhou.

## Dados e integrações
GET/PATCH /admin/settings; versionamento e auditoria. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, priorizar tarefa atual, botões grandes e lista em vez de tabela; mapa é complementar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Site, chat e operação usam os mesmos parâmetros.
- configuração inválida não é publicada.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
