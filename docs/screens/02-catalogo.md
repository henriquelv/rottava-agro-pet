# Catálogo

- **Rota:** `/produtos` com `busca`, `categoria`, `marca`, `tipo`, `fase`, `porte`, `necessidade`, `precoMin`, `precoMax`, `disponivel`, `ordem` e `pagina` na URL.
- **Objetivo:** localizar e comparar produtos com filtros reproduzíveis.
- **Público/perfil:** público.
- **Componentes usados:** `PageHero`, `CatalogFilters`, `SelectMenu`, `ProductCard`, `EmptyState`.
- **Dados necessários:** lista de produtos e metadados; categorias, marcas, tipos, fases, portes, necessidades, preços e contagens são derivados dessa lista.
- **Ações possíveis:** buscar, filtrar por qualquer faceta disponível, ordenar, remover chips, paginar, abrir produto, favoritar e adicionar ao carrinho.
- **Regras:** facetas e contagens não são hardcoded; query state usa histórico; são renderizados 24 produtos por página; atributos ausentes não são inferidos na interface.
- **Estados:** transição reduz opacidade dos filtros; empty sugere limpar; erro é tratado no servidor; success atualiza contagem e grade.
- **Desktop:** sidebar persistente e toolbar com chips e menu de ordenação alinhado ao sistema visual da loja.
- **Mobile:** botão abre bottom sheet com spring; ordenação usa menu próprio, operável por toque e teclado, sem depender do select nativo do sistema.
- **Animações/transições:** chips entram/saem, cards reorganizam e drawer usa spring; reduced motion desativa deslocamentos.
- **Permissões:** pública.
- **Dependências de backend:** `listProducts`, catálogo versionado importado da planilha e `/api/catalog/search` para busca global.
- **Integrações externas futuras:** sincronização do catálogo legado.
- **Pendências:** vincular imagens oficiais e estoque aos SKUs; validar os preços fornecidos pela loja antes da operação comercial.
