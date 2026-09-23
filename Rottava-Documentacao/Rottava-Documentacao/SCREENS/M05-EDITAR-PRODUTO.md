# M05 Conteúdo digital do produto

**Rota proposta:** `/admin/catalogo/:id`  
**Acesso:** Gestor de catálogo  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Completar imagens, descrição e organização comercial sem alterar dados mestres inadvertidamente.

## Composição e hierarquia
Dados integrados bloqueados; galeria; descrição; atributos; categoria digital; marca; URL; destaque; prévia; status de publicação.

## Ações e navegação
Enviar imagem; editar descrição; mapear atributos; salvar rascunho; visualizar; publicar; retirar publicação.

## Regras e validações
Atributos sensíveis precisam de fonte; sanitizar conteúdo; arquivos permitidos e direitos de uso; preço e saldo obedecem dono do dado; publicação valida variante e imagem/fallback.

## Estados e exceções
Conflito de versão; upload falhou; dado externo mudou; conteúdo incompleto impede publicação comprável.

## Dados e integrações
PATCH /admin/catalog/:id/content; media storage; publicação versionada. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, priorizar tarefa atual, botões grandes e lista em vez de tabela; mapa é complementar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Salvar rascunho não altera loja pública.
- publicação respeita dados integrados.
- item histórico segue consultável após despublicação.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
