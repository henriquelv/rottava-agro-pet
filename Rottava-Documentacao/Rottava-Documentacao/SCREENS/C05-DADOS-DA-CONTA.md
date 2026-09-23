# C05 Dados e segurança

**Rota proposta:** `/minha-conta/dados`  
**Acesso:** Cliente  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Atualizar dados de contato e senha.

## Composição e hierarquia
Nome, e-mail, celular; contatos verificados; editar senha; preferências de comunicação; sessões quando suportadas; solicitar atendimento sobre dados.

## Ações e navegação
Salvar perfil; verificar novo contato; alterar senha; encerrar sessões; gerenciar vínculo WhatsApp após verificação.

## Regras e validações
Mudar telefone invalida vínculo anterior até nova verificação; ações sensíveis exigem reautenticação; trocar perfil não altera snapshots de pedidos já criados.

## Estados e exceções
Validação pendente; contato em uso; erro ao salvar preserva dados; sessão antiga expirada.

## Dados e integrações
GET/PATCH /me; POST /me/change-password; /me/channel-links. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, usar coluna única, foco visível e botões com rótulos; manter o contexto ao voltar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Pedido antigo mantém destinatário original.
- contato não verificado não dá acesso a outro histórico.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
