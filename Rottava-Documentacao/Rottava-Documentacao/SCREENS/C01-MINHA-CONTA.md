# C01 Visão geral da conta

**Rota proposta:** `/minha-conta`  
**Acesso:** Cliente  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Concentrar atalhos para pedidos, serviços e dados pessoais.

## Composição e hierarquia
Saudação; último pedido ativo; próximo agendamento; atalhos Pedidos, Agendamentos, Pets, Endereços e Dados; sair.

## Ações e navegação
Abrir C02, C09, C07, C06 ou C05; último pedido abre C03; encerrar sessão.

## Regras e validações
Retornar apenas dados do cliente autenticado; sem pedido ativo não criar cards fictícios.

## Estados e exceções
Conta nova: convite a comprar/cadastrar pet; falha em um bloco não derruba os demais.

## Dados e integrações
GET /me/summary; sessão autenticada. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, usar coluna única, foco visível e botões com rótulos; manter o contexto ao voltar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Usuário novo entende próximos passos.
- logout encerra sessão.
- cards pertencem à conta correta.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
