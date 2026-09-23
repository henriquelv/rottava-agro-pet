# Favoritos

- **Rota:** `/favoritos`
- **Objetivo:** recuperar produtos marcados no dispositivo.
- **Público/perfil:** público.
- **Componentes usados:** `FavoritesView`, `ProductCard`, `EmptyState`.
- **Dados necessários:** catálogo atual e IDs salvos no `localStorage`.
- **Ações possíveis:** abrir/desfavoritar/adicionar produtos e voltar ao catálogo.
- **Regras:** a lista é local e não é sincronizada com a conta.
- **Estados:** hidratação local; empty explica ausência; itens removidos do catálogo deixam de aparecer; success mostra cards.
- **Desktop:** grade ampla.
- **Mobile:** grade compacta com ações por toque.
- **Animações/transições:** cards e favorito respondem com escala/estado; transição de rota discreta.
- **Permissões:** pública.
- **Dependências de backend:** leitura do catálogo.
- **Integrações externas futuras:** sincronização autenticada de favoritos.
- **Pendências:** nenhuma para o comportamento local atual.
