# A02 Criar conta

**Rota proposta:** `/cadastro`  
**Acesso:** Visitante  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Criar identidade do cliente para histórico, pedidos e agendamentos.

## Composição e hierarquia
Nome, e-mail, celular e senha; confirmação de senha; acesso às condições; opção de comunicação independente; continuar.

## Ações e navegação
Criar conta; verificar contato pelo meio escolhido; retornar ao checkout; link para entrar em conta existente.

## Regras e validações
CPF somente se exigido pelo fluxo fiscal/provedor e com finalidade definida; senha nunca enviada ao WhatsApp; conta criada no chat usa link seguro para definir senha; e-mail/telefone duplicados não criam contas paralelas silenciosamente.

## Estados e exceções
Contato já registrado: caminho de recuperação sem exposição excessiva; validação de campo; verificação pendente; falha de rede mantém campos não secretos.

## Dados e integrações
POST /auth/register; /auth/verify; serviço de mensagens transacionais escolhido depois. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, usar coluna única, foco visível e botões com rótulos; manter o contexto ao voltar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Conta nasce como cliente.
- autorização e preço não são controlados por campos do cadastro.
- consentimento de marketing não vem marcado.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
