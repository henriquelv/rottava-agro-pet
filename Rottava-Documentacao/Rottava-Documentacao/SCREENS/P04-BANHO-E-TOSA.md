# P04 Apresentação de banho e tosa

**Rota proposta:** `/banho-e-tosa`  
**Acesso:** Visitante e cliente  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Apresentar os serviços e iniciar um agendamento.

## Composição e hierarquia
Foto autorizada da operação; serviços disponíveis; descrição do que está incluído; critérios de preço por espécie, porte, pelagem e serviço quando configurados; funcionamento e botão Agendar; contato humano.

## Ações e navegação
Agendar abre C08 após login A01, preservando serviço; tirar dúvidas abre P09 com contexto de serviço; consultar meus agendamentos abre C09.

## Regras e validações
Inclusão de banho e tosa é confirmada; autoagendamento, duração, preços e critérios são propostas a validar; preço sob avaliação deve ser rotulado; não prometer horário sem consultar capacidade.

## Estados e exceções
Serviço inativo não é oferecido; agenda não configurada: contato para solicitar horário; preço sob consulta: sem valor fictício; imagens ausentes: apresentação textual.

## Dados e integrações
GET /services e /store; catálogo próprio de serviços ou adaptação do sistema existente, conforme descoberta. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, usar coluna única, foco visível e botões com rótulos; manter o contexto ao voltar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Só serviços ativos iniciam agendamento.
- retorno do login mantém escolha.
- cliente entende se preço é fechado ou sujeito à avaliação.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
