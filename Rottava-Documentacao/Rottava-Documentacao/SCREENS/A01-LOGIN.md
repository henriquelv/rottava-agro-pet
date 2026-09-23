# A01 Entrar

**Rota proposta:** `/entrar`  
**Acesso:** Cliente ou equipe conforme portal  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Autenticar com conta e senha e retornar à ação iniciada.

## Composição e hierarquia
Marca discreta; e-mail proposto como identificador; senha com mostrar/ocultar; Entrar; Esqueci a senha; Criar conta; mensagem de erro acessível.

## Ações e navegação
Entrar cria sessão; cadastro abre A02; recuperação abre A03; retorno interno preserva carrinho, serviço ou pedido; equipe usa entrada /equipe/entrar com mesmo padrão.

## Regras e validações
Identificador e-mail é proposta; cliente confirmou conta com senha; servidor verifica credenciais, limite de tentativas e papel; retorno só aceita rota interna autorizada; equipe não ganha permissões por escolher portal.

## Estados e exceções
Senha incorreta: mensagem genérica; muitas tentativas: espera; sessão inválida: nova autenticação; conta bloqueada: contato.

## Dados e integrações
POST /auth/login; GET /auth/session; cookies seguros ou mecanismo equivalente aprovado. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, usar coluna única, foco visível e botões com rótulos; manter o contexto ao voltar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Senha não aparece em logs.
- retorno não permite redirecionamento externo.
- cliente não acessa administração.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
