# M04 Catálogo integrado

**Rota proposta:** `/admin/catalogo`  
**Acesso:** Gestor de catálogo  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Ver produtos importados e preparar sua publicação digital.

## Composição e hierarquia
Tabela com código externo/SKU, nome, preço, estoque, origem, atualização e publicação; filtros de dados incompletos; abrir M05.

## Ações e navegação
Selecionar produto; publicar/despublicar se requisitos mínimos atendidos; corrigir somente campos editoriais; solicitar sincronização autorizada.

## Regras e validações
Campos do sistema existente ficam somente leitura neste painel até definir contrato; não criar estoque paralelo; categoria digital pode mapear classificação externa.

## Estados e exceções
Produto sem imagem/descrição; variante sem vínculo; preço ausente; sincronização atrasada; removido na origem fica indisponível sem apagar histórico.

## Dados e integrações
GET /admin/catalog; /catalog-publications; processo de ingestão. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, priorizar tarefa atual, botões grandes e lista em vez de tabela; mapa é complementar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Preço não é sobrescrito por edição editorial.
- origem e última atualização são visíveis.
- sem SKU confiável não habilita compra.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
