# Contratos lógicos da aplicação

Endpoints são proposta agnóstica de framework. Esta não é uma especificação OpenAPI completa nem contrato validado de terceiros. IDs reais, schemas e enums deverão ser formalizados na implementação usando estes comportamentos.

| Grupo | Leitura | Comandos e efeitos |
|---|---|---|
| Catálogo | /catalog/products, /:id, /categories, /brands, /highlights | Publicação editorial por administração |
| Identidade | /auth/session, /me | login, register, verify, password-reset, change-password, channel-links |
| Carrinho | /carts/:id | adicionar, alterar, remover, mesclar; incrementa versão |
| Frete | Cotação por ID autorizado | /shipping/quotes e /shipping/simulate |
| Compra | /orders/:id e /events | /checkout/validate; /orders; /reorder; /requests |
| Pagamento | /orders/:id/payment | /payment-attempts, /receipts, /refunds |
| Agenda | /services, /availability, /me/appointments | holds, appointments, reschedule, cancel, approve-change |
| Entrega | /driver/routes, /deliveries/:id/tracking | assign, events, location-batches, complete |
| Conversa | /conversations/:id | messages, actions, claim, handoff |
| Administração | /admin/* conforme papel | Configuração versionada e comandos auditados |

## Exemplo de confirmar pedido

```json
{
  "cart_id": "<id-do-carrinho>",
  "cart_version": 7,
  "fulfillment_mode": "delivery",
  "address_id": "<endereco-do-cliente>",
  "quote_id": "<cotacao-valida>",
  "payment_mode": "pix",
  "confirmation_token": "<token-do-resumo-aprovado>",
  "idempotency_key": "<uuid-da-operacao>"
}
```

Servidor resolve cliente pela sessão/vínculo, carrega preço e estoque, compara versão e cotação e retorna order_id, operational_state, payment_state, total_cents e next_action. Não recebe total como autoridade. Mesmo conteúdo com mesma chave retorna mesmo pedido. Conteúdo diferente com mesma chave gera conflito.

## Erros de domínio

AUTH_REQUIRED, FORBIDDEN, CART_VERSION_CONFLICT, PRICE_CHANGED, OUT_OF_STOCK, STOCK_UNCONFIRMED, QUOTE_EXPIRED, OUTSIDE_COVERAGE, PAYMENT_PENDING, SLOT_UNAVAILABLE, ACTION_EXPIRED, INTEGRATION_UNAVAILABLE. Cada resposta inclui code, mensagem útil, correlation_id e campo quando aplicável. Nunca retornar stack trace ou SQL para cliente.

## Paginação e atualização

Listas grandes paginadas por cursor; filtros permitidos e limite de página; timestamps das fontes. Eventos em tempo real oferecem atualização, mas recarga por GET recupera estado se conexão cair. Operações de escrita validam versão/idempotência também em chamadas do bot e do painel.
