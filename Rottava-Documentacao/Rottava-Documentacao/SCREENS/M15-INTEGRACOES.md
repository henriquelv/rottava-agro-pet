# M15 Integrações e reconciliação

**Rota proposta:** `/admin/integracoes`  
**Acesso:** Gestor técnico autorizado  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Identificar falhas no banco existente, pagamentos, WhatsApp e localização.

## Composição e hierarquia
Conexões sem revelar segredos; última leitura; latência; filas; itens com erro; mapeamento de códigos; tentativas; estado degradado.

## Ações e navegação
Executar diagnóstico permitido; reprocessar evento idempotente; conferir conflito; suspender venda de catálogo incerto; registrar resolução.

## Regras e validações
Não executar SQL livre pela interface; reprocessamento usa chave original; segredos ficam fora do front; leitura existente não pressupõe autorização de escrita.

## Estados e exceções
Credencial expirada, esquema alterado, timeout, duplicidade, item não mapeado e fila bloqueada.

## Dados e integrações
GET /admin/integrations/health; /jobs; POST /jobs/:id/retry. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, priorizar tarefa atual, botões grandes e lista em vez de tabela; mapa é complementar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Reprocessar não duplica pedido/cobrança.
- falha contém contexto seguro.
- alteração de esquema dispara alerta.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
