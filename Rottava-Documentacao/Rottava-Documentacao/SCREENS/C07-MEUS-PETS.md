# C07 Pets do cliente

**Rota proposta:** `/minha-conta/pets`  
**Acesso:** Cliente  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Guardar informações necessárias para agendar banho e tosa.

## Composição e hierarquia
Cards dos pets; nome, espécie, raça opcional, porte, pelagem, nascimento aproximado opcional e observações relevantes; foto opcional; ação Agendar.

## Ações e navegação
Cadastrar, editar e arquivar; agendar abre C08 com pet; consultar serviços anteriores pela agenda.

## Regras e validações
Campos e categorias são proposta a validar com equipe; coletar apenas informação útil ao serviço; dados do pet não autorizam diagnóstico ou prescrição pelo bot; agendamento guarda snapshot relevante.

## Estados e exceções
Sem pets: cadastro rápido; foto falhou: continuar sem foto; pet arquivado mantém histórico.

## Dados e integrações
GET/POST/PATCH /me/pets; banco próprio ou adaptador do sistema existente. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, usar coluna única, foco visível e botões com rótulos; manter o contexto ao voltar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Pet pertence ao cliente.
- editar porte pede recalcular serviço futuro ainda não confirmado.
- histórico passado é preservado.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
