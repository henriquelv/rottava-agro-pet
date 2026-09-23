# M16 Conteúdo e identidade visual

**Rota proposta:** `/admin/conteudo`  
**Acesso:** Gestor de conteúdo  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Controlar destaques, marcas, textos e dados públicos da loja.

## Composição e hierarquia
Seções da home; seleção de produtos; logos de marcas; imagens; textos; políticas versionadas; prévia desktop/mobile; publicar.

## Ações e navegação
Editar rascunho; reorganizar vitrine; pré-visualizar; publicar; restaurar versão editorial.

## Regras e validações
Paleta Perpetuity é base; mudanças globais são revisão de design; não inserir scripts/HTML arbitrário; marcas sem associação a produtos não levam a catálogo vazio por engano.

## Estados e exceções
Imagem inválida; produto despublicado em destaque: alerta; revisão concorrente; política aguardando aprovação.

## Dados e integrações
CRUD /admin/content; publicação de conteúdo e mídia. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, priorizar tarefa atual, botões grandes e lista em vez de tabela; mapa é complementar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Rascunho não vaza para produção.
- logos têm descrição.
- contato público reflete cadastro aprovado.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
