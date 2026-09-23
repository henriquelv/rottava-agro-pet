# Confirmação do pedido

- **Rota:** `/pedido/[id]/confirmacao`
- **Objetivo:** confirmar a criação única do pedido e explicar os próximos estados.
- **Público/perfil:** usuário autenticado que concluiu o checkout.
- **Componentes usados:** `Status`, confirmação demo ou `OrderDetail` real.
- **Dados necessários:** ID do pedido, sessão e banco; IDs `demo-*` usam estado demonstrativo explícito.
- **Ações possíveis:** continuar testando/comprando e consultar pedido real.
- **Regras:** demo declara que não houve cobrança/reserva/comunicação; pedido real é filtrado pelo dono.
- **Estados:** demo success, success real, banco indisponível e acesso negado.
- **Desktop:** cartão de confirmação central.
- **Mobile:** conteúdo em coluna única.
- **Animações/transições:** entrada de rota discreta e feedback de CTA.
- **Permissões:** autenticada.
- **Dependências de backend:** banco para pedidos reais.
- **Integrações externas futuras:** confirmação de pagamento e comunicação.
- **Pendências:** conectores reais.
