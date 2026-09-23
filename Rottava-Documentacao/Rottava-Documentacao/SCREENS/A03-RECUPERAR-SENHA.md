# A03 Recuperar acesso

**Rota proposta:** `/recuperar-senha`  
**Acesso:** Visitante ou cliente  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Permitir redefinir senha sem revelar existência de contas.

## Composição e hierarquia
Primeira etapa solicita identificador; resposta neutra; página de token pede nova senha e confirmação; conclusão leva a A01.

## Ações e navegação
Solicitar link; reenviar com limite; validar token; trocar senha; invalidar sessões conforme política definida.

## Regras e validações
Token de uso único, expiração e armazenamento protegido; não usar perguntas pessoais; canal e prazo serão configurados na autenticação.

## Estados e exceções
Token inválido, expirado ou já usado: solicitar novo; solicitação recebida: mensagem igual para contas existentes e inexistentes.

## Dados e integrações
POST /auth/password-reset; POST /auth/password-reset/confirm. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, usar coluna única, foco visível e botões com rótulos; manter o contexto ao voltar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Token reutilizado falha.
- nova senha permite login.
- token não vai para analytics ou logs.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
