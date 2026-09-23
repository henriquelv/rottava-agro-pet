# Estados e ciclos de vida

## Pedido operacional

| Estado | Entradas e condições | Próximos estados permitidos |
|---|---|---|
| aguardando_disponibilidade | Integração sem reserva confiável ou revisão necessária | aguardando_pagamento, confirmado, cancelado |
| aguardando_pagamento | Disponibilidade validada; online ainda não aprovado | confirmado, cancelado |
| confirmado | Estoque confirmado; online aprovado ou presencial permitido | em_separacao, cancelamento_em_analise |
| em_separacao | Operador assumiu e confere itens | pronto_retirada, pronto_despacho, revisao_necessaria |
| revisao_necessaria | Falta, substituição, endereço ou integração inconsistente | em_separacao após resolução, cancelamento_em_analise |
| pronto_retirada | Separação concluída e modalidade retirada | concluido após conferência e regra financeira, cancelamento_em_analise |
| pronto_despacho | Separação concluída e modalidade entrega | em_entrega, cancelamento_em_analise |
| em_entrega | Despacho iniciado | concluido, ocorrencia_entrega, cancelamento_em_analise |
| ocorrencia_entrega | Ausente, endereço incorreto ou interrupção | em_entrega após resolução, retorno_loja |
| retorno_loja | Retorno físico solicitado/concluído | pronto_despacho após acordo, cancelamento_em_analise |
| cancelamento_em_analise | Solicitação em qualquer etapa elegível | estado anterior quando negada, cancelado após coordenação |
| concluido | Retirado/entregue fisicamente; financeiro pode ter pendência excepcional | Solicitação pós-venda separada; não retroceder |
| cancelado | Cancelamento efetivado | Terminal operacional; financeiro ainda pode conciliar |

Manter estado anterior ao pedido de cancelamento e bloquear ações incompatíveis enquanto em análise. Pedido cancelado não é reaberto por webhook de aprovação tardia. Antes de confirmação, cancelamento/expiração pode ser automático apenas conforme política configurada, com auditoria e liberação de reserva.

## Estado financeiro agregado

nao_iniciado, pendente, em_processamento, aprovado, recusado, expirado, presencial_a_receber, recebido_informado, recebido_confirmado, estorno_pendente, estornado, divergente. Agregado é derivado de tentativas, recebimentos e estornos; não editar livremente. “Recusado” pertence à tentativa e pode coexistir com outra tentativa aprovada; agregado deve considerar o resultado líquido real.

## Entrega

na_fila → atribuida → em_rota → chegou → entregue. Falhas levam a tentativa_frustrada ou interrompida; operação decide nova tentativa, retorno ou cancelamento. Não confundir parada concluída com rota concluída. Toda conclusão exige confirmação do servidor; offline fica evento pendente local.

## Agendamento

solicitado → confirmado → pet_recebido → em_atendimento → pronto → concluido. Alternativas: cancelado, nao_compareceu e interrompido. Hold temporário tem reservado, confirmado, expirado ou liberado, separados do agendamento. Adicional/preço proposto fica pendente de aprovação sem alterar silenciosamente contrato vigente.

## Conversa e integração

Conversa: bot_ativo, aguardando_humano, humano_ativo, encerrada. Apenas um dono ativo. Integração: pendente, processando, concluida, retentativa, falha_definitiva, resolvida_manualmente. Resolução manual não significa que o evento externo ocorreu; registrar prova e identificador.

Diagrama financeiro: [FL07](../../FLUXOS/FL07-PAGAMENTOS.md).
