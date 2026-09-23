# Cancelamentos e exceções

## Fluxo de solicitação

Cliente abre C11; equipe avalia política e estágio em M03. Antes da separação, cancelar pode liberar estoque após aceite do comando. Após despacho, coordenar entrega/retorno antes de finalizar. Pagamento aprovado exige estorno/refund quando aplicável; estorno pendente permanece visível. Reembolso recusado ou falho gera pendência financeira, não desaparece.

| Situação | Tratamento proposto | Responsável |
|---|---|---|
| Item faltando fisicamente | Bloquear item, avisar, propor opção e obter aceite | Operação e atendimento |
| Pagamento aprovado após cancelamento | Não reabrir automaticamente; avaliar devolução financeira | Financeiro |
| Venda duplicada no legado | Conter reprocessamento e conciliar IDs externos | Gestor técnico e operação |
| Cliente ausente | Registrar tentativa e instrução de nova entrega/retorno | Despachante |
| Endereço mudou depois de pago | Reavaliar cobertura, frete e consentimento | Atendimento |
| Serviço com adicional | Proposta de alteração antes de executar/cobrar | Recepção |
| Bot não consegue concluir | Preservar carrinho e transferir contexto | Atendimento |

Prazos, condições de troca, direito aplicável, produtos com tratamento especial e textos de privacidade devem ser fornecidos/revisados para a operação antes de publicar. Este documento define mecanismo, não parecer jurídico. A equipe terá registro de quem decidiu, motivo, pedido afetado e eventos financeiros/operacionais resultantes.

Diagrama: [FL06](../../FLUXOS/FL06-CANCELAMENTO.md).
