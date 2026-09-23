# Carrinho

- **Rota:** `/carrinho`
- **Objetivo:** revisar itens, quantidades e subtotal antes do checkout.
- **Público/perfil:** público; login é solicitado ao avançar.
- **Componentes usados:** `CartView`, contexto `CartProvider`, `EmptyState`.
- **Dados necessários:** itens persistidos no navegador com preço snapshot de exibição.
- **Ações possíveis:** alterar quantidade, remover, abrir produto e ir ao checkout/login.
- **Regras:** carrinho não reserva estoque nem fixa preço; servidor revalida no pedido.
- **Estados:** hidratação; empty direciona ao catálogo; erro final pertence ao checkout; success mostra resumo.
- **Desktop:** lista e resumo em duas colunas.
- **Mobile:** linhas compactas e resumo em fluxo único; minicarrinho usa drawer.
- **Animações/transições:** drawer spring e mudanças de quantidade sem movimento excessivo.
- **Permissões:** pública.
- **Dependências de backend:** nenhuma até a submissão do pedido.
- **Integrações externas futuras:** cotação de entrega.
- **Pendências:** regra de frete e cobertura da loja.
