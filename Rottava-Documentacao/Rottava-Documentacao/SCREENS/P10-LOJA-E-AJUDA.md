# P10 Loja e ajuda

**Rota proposta:** `/loja`  
**Acesso:** Visitante e cliente  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Exibir localização, horários, contato e informações comerciais.

## Composição e hierarquia
Endereço e mapa da loja; horário real; WhatsApp; perguntas sobre compra, entrega, retirada e banho e tosa; links para políticas publicadas.

## Ações e navegação
Abrir rota externa; chamar WhatsApp; acessar P11 com tema desejado; ir para P04; endereço da loja copiável.

## Regras e validações
Endereço, telefone e horário dependem do cliente; não publicar dados fictícios; área de entrega vem da configuração, não do nome da cidade apenas.

## Estados e exceções
Mapa indisponível mantém endereço textual; fora do horário informa próxima abertura somente se calendário configurado.

## Dados e integrações
GET /store e conteúdo editorial publicado. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, usar coluna única, foco visível e botões com rótulos; manter o contexto ao voltar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Telefone e endereço são os cadastrados.
- botões funcionam em celular.
- mapa não é única forma de obter endereço.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
