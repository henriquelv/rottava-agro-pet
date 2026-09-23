# M12 Central de conversas

**Rota proposta:** `/admin/atendimento`  
**Acesso:** Atendente, gestor  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Atender site e WhatsApp com continuidade de contexto.

## Composição e hierarquia
Fila por canal e status; dono da conversa; histórico; identificação validada; carrinho/pedido; respostas e botões; notas privadas; transferir; retomar bot.

## Ações e navegação
Assumir conversa pausa bot; editar carrinho via comandos autorizados; enviar resumo para cliente confirmar; transferir; encerrar ou devolver ao bot.

## Regras e validações
Atendente não vê senha/cartão; conversa de visitante não revela pedidos por simples nome ou telefone digitado; saída proativa no WhatsApp depende de regras do canal a verificar; notas privadas nunca vão ao cliente.

## Estados e exceções
Atendente concorrente: bloqueio de posse; canal indisponível: fila de envio; mensagem duplicada deduplicada; humano ausente: previsão conforme expediente.

## Dados e integrações
GET /admin/conversations; /claim; /messages; /handoff; pedidos e identidade. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, priorizar tarefa atual, botões grandes e lista em vez de tabela; mapa é complementar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Bot não responde enquanto humano detém atendimento.
- mudança de canal não mistura identidades.
- comando sensível pede confirmação ao cliente.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
