# Pedidos da conta

- **Rotas:** `/minha-conta/pedidos`, `/minha-conta/pedidos/[id]`.
- **Objetivo:** listar compras e detalhar estados operacional e financeiro separadamente.
- **Público/perfil:** cliente autenticado dono do pedido.
- **Componentes usados:** `AccountNav`, `Status`, `EmptyState`, lista e detalhe de itens.
- **Dados necessários:** `orders`, `order_items` e sessão.
- **Ações possíveis:** abrir um pedido e voltar à lista.
- **Regras:** consulta inclui `account_id`; pedido alheio retorna acesso negado; estoque e pagamento não são confundidos.
- **Estados:** sem pedidos mostra empty; sem banco informa indisponibilidade; não autorizado não expõe dados; success mostra snapshots.
- **Desktop:** lista tabular e detalhe em coluna estreita.
- **Mobile:** registros quebram em blocos legíveis.
- **Animações/transições:** transição global e feedback de links.
- **Permissões:** autenticada e proprietária.
- **Dependências de backend:** PostgreSQL e sessão.
- **Integrações externas futuras:** pagamento, entrega e notificações.
- **Pendências:** ativação das integrações reais.
