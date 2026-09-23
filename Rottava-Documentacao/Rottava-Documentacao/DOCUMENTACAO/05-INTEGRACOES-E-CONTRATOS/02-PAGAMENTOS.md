# Integração de pagamentos

Pix, cartão e presencial são confirmados. Gateway, taxas, parcelamento, captura, expiração e estorno não estão escolhidos. Esta documentação não presume Mercado Pago, Stripe, Pagar.me ou qualquer fornecedor.

## Contrato do adaptador

create_attempt(order_id, method, amount_cents, idempotency_key); get_attempt(provider_id); validate_webhook(raw_body, headers); request_refund(attempt_id, amount_cents, reason, idempotency_key). Saídas normalizadas contêm ID externo, estado, expiração quando aplicável e instruções seguras de pagamento. Não coletar cartão diretamente no chat.

## Sequência

Revalidar pedido/estoque → persistir tentativa → criar cobrança no provedor → mostrar instrução → receber evento autenticado → deduplicar → conferir pedido, valor, moeda e estado → atualizar financeiro → liberar operação elegível. Checkout retorna pendente quando o provedor ainda não confirmou, mesmo que navegador diga sucesso.

## Presencial

Método presencial mantém saldo a receber. Retirada cobra no balcão. Para entrega, D04 decidirá entre cobrar no destino ou cobrar antes na loja. Se no destino, motorista informa recebimento e caixa concilia; meios aceitos e troco são parâmetros. Não armazenar foto de cartão ou confiar exclusivamente em comprovante enviado pelo cliente.

## Exceções

Recusa mantém tentativa recusada e permite outra elegível. Timeout consulta antes de repetir. Expiração libera reserva conforme política, mas pagamento tardio é reconciliado. Duplicidade gera divergência e possível estorno. Cancelamento operacional não conclui estorno automaticamente; falha financeira mantém pendência. Testar fluxo parcial e estorno parcial somente se forem aprovados no escopo.
