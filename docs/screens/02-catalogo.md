# Catálogo

- **Rota:** `/produtos` com `busca`, `categoria`, `marca`, `precoMin`, `precoMax`, `disponivel` e `ordem` na URL.
- **Objetivo:** localizar e comparar produtos com filtros reproduzíveis.
- **Público/perfil:** público.
- **Componentes usados:** `PageHero`, `CatalogFilters`, `SelectMenu`, `ProductCard`, `EmptyState`.
- **Dados necessários:** lista de produtos, categorias e marcas derivadas dessa lista.
- **Ações possíveis:** buscar, filtrar por categoria, marca, preço e disponibilidade, ordenar, remover chips, abrir produto, favoritar e adicionar ao carrinho.
- **Regras:** facetas e contagens não são hardcoded; query state usa histórico; informações fictícias aparecem apenas no modo demo identificado.
- **Estados:** transição reduz opacidade dos filtros; empty sugere limpar; erro é tratado no servidor; success atualiza contagem e grade.
- **Desktop:** sidebar persistente e toolbar com chips e menu de ordenação alinhado ao sistema visual da loja.
- **Mobile:** botão abre bottom sheet com spring; ordenação usa menu próprio, operável por toque e teclado, sem depender do select nativo do sistema.
- **Animações/transições:** chips entram/saem, cards reorganizam e drawer usa spring; reduced motion desativa deslocamentos.
- **Permissões:** pública.
- **Dependências de backend:** `listProducts` e `/api/catalog/search` para busca global.
- **Integrações externas futuras:** sincronização do catálogo legado.
- **Pendências:** paginação será necessária quando o catálogo real superar a grade atual.
