# M08 Monitoramento de entregas

**Rota proposta:** `/admin/entregas/:id`  
**Acesso:** Despachante, gestor  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Acompanhar rota, resolver falhas e verificar conclusão.

## Composição e hierarquia
Mapa operacional; paradas; entregador; última posição e precisão; ocorrências; ETA; estado de cobrança; contato; linha do tempo.

## Ações e navegação
Reatribuir conforme estado; registrar ocorrência; solicitar retorno; verificar prova; abrir M03 ou M14.

## Regras e validações
ETA não é promessa; atraso de localização destacado; alterações registradas; dados ficam restritos à operação; prova de entrega não é prova de pagamento.

## Estados e exceções
Sem GPS, fora de conexão, tentativa frustrada, cliente ausente, rota interrompida ou entrega concluída.

## Dados e integrações
GET /admin/deliveries/:id; streaming de posições e eventos; ocorrências. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, priorizar tarefa atual, botões grandes e lista em vez de tabela; mapa é complementar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Última posição tem horário.
- conclusão exige evidência definida.
- pagamento pendente continua pendente após entrega física.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
