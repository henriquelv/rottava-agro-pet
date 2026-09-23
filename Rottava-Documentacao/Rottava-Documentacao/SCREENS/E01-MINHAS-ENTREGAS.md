# E01 Entregas do motorista

**Rota proposta:** `/entregador`  
**Acesso:** Entregador autenticado  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Mostrar apenas rotas e tarefas atribuídas ao entregador.

## Composição e hierarquia
Disponibilidade; rota do dia; paradas com endereço mínimo necessário; volumes; valores presenciais a cobrar; status da conexão e localização; iniciar rota.

## Ações e navegação
Aceitar atribuição conforme operação; abrir E02; informar indisponibilidade; iniciar coleta de posição ao iniciar trabalho autorizado.

## Regras e validações
Não listar outros entregadores; localização somente em trabalho ativo e com permissão; cache mínimo privado; autenticação compartilha padrão A01 com papel restrito.

## Estados e exceções
Sem rota; atribuição retirada; offline; GPS negado com orientação e aviso à operação.

## Dados e integrações
GET /driver/routes; /driver/status; sessão por papel. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, priorizar tarefa atual, botões grandes e lista em vez de tabela; mapa é complementar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Motorista vê só suas tarefas.
- acesso direto a outra rota é negado.
- GPS desligado não aparece como ativo.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
