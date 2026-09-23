# Eventos e concorrência

| Evento lógico | Origem | Efeitos permitidos |
|---|---|---|
| order.created | Checkout ou bot após confirmação | Registrar intenção, reservar/conferir estoque, mostrar número |
| stock.confirmed | Adaptador ou operação autorizada | Liberar cobrança online ou confirmação presencial |
| payment.approved | Provedor validado | Atualizar financeiro; confirmar pedido elegível |
| order.picking_completed | Operador | Pronto retirada/despacho; notificar |
| delivery.started | Despacho/entregador | Abrir rastreamento autenticado |
| delivery.completed | Comando aceito com prova | Fechar entrega física e rastreamento; não quitar sozinho |
| receipt.recorded | Caixa/entregador autorizado | Aguardar confirmação/conciliação adequada |
| appointment.confirmed | Agenda | Consumir capacidade e notificar |
| appointment.ready | Equipe de serviço | Avisar responsável pelo canal permitido |
| request.approved | Equipe autorizada | Coordenar estoque, entrega e estorno conforme caso |

Envelope proposto: event_id, event_type, aggregate_id, aggregate_version, occurred_at, actor_id, correlation_id, causation_id e payload mínimo. Processador mantém registro de consumo por handler/evento; retentativa exponencial com limite e jitter configurados; falha definitiva vai para M15. Webhook é autenticado e persistido antes de responder aceite ao provedor.

## Concorrência

Carrinho usa versão otimista; edição em outro canal retorna conflito para revisão. Pedido tem versão e comandos de transição. Reserva de estoque depende da autoridade comum com o balcão: lock local não trava a venda do sistema externo. Agenda própria pode usar transação/restrição de ocupação; agenda externa exige contrato equivalente. Mesma chave com payload diferente retorna conflito, nunca reutiliza sucesso anterior indevidamente.

## Ordem dos eventos

Evento atrasado não regride estado: pagamento recusado de tentativa antiga não desfaz aprovação de outra tentativa; localização antiga não substitui posição mais recente; mensagem entregue não substitui resposta recebida. Quando a ordem for incerta, consultar fonte autoritativa e conciliar. A auditoria guarda tanto ocorrência quanto recebimento para explicar atrasos.

Diagrama: [FL08](../../FLUXOS/FL08-INTEGRACAO.md).
