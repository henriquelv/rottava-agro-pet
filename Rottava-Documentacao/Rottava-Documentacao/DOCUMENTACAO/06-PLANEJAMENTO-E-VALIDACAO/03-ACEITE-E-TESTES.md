# Plano de aceite

Este arquivo descreve testes futuros da aplicação. O pacote entregue foi revisado documentalmente; nenhum teste de integração ou compra real foi executado.

| ID | Cenário | Resultado obrigatório |
|---|---|---|
| T01 | Produto com duas variantes e preços distintos | SKU e total correspondem à seleção |
| T02 | Última unidade vendida no balcão durante checkout | Reserva comum ou confirmação manual evita promessa indevida |
| T03 | Preço muda entre carrinho e conclusão | Cliente revisa novo resumo |
| T04 | Endereço fora da cobertura | Entrega bloqueada e retirada disponível |
| T05 | Endereço muda após cotação | Cotação antiga rejeitada |
| T06 | Duplo clique e timeout ao criar pedido | Um pedido recuperável por mesma chave |
| T07 | Webhook de aprovação duplicado | Uma baixa financeira e uma transição operacional |
| T08 | Browser retorna sucesso sem webhook | Pagamento permanece pendente até confirmação |
| T09 | Pix aprovado após cancelamento/expiração | Reconciliação; sem reabertura automática |
| T10 | Pagamento recusado seguido de nova tentativa | Histórico preservado e agregado financeiro correto |
| T11 | Presencial na retirada | Saldo visível e baixa autorizada |
| T12 | Presencial na entrega | Entrega, recebimento e prestação ao caixa distintos |
| T13 | Cliente solicita ID de pedido alheio | Acesso negado sem dados |
| T14 | Bot recebe instrução maliciosa em texto de produto | Não amplia ferramentas nem permissões |
| T15 | Botão antigo/duplicado no WhatsApp | Revisão ou mesmo resultado, nunca compra duplicada |
| T16 | Cliente alterna site e WhatsApp com carrinho editado | Conflito de versão apresentado e resolvido |
| T17 | Atendente assume conversa | Bot pausa e cliente percebe atendimento humano |
| T18 | GPS negado, rede cai e dispositivo bloqueia tela | Comportamento real documentado; sem posição fictícia |
| T19 | Conclusão offline reenviada | Um evento aceito e cobrança não duplicada |
| T20 | Cliente tenta ver outras paradas | Dados omitidos e canal não autorizado |
| T21 | Dois clientes reservam último slot | Apenas capacidade permitida confirma |
| T22 | Reagendamento falha | Horário anterior preservado |
| T23 | Adicional no banho e tosa | Exige aceite antes de cobrar/executar |
| T24 | Legado muda esquema ou retorna timeout | Alerta, contenção e reconciliação; sem escrita cega |
| T25 | Token de redefinição reutilizado | Rejeitado |
| T26 | Teclado, leitor de tela e movimento reduzido | Compra possível sem mouse/animação |
| T27 | Mobile estreito, teclado aberto e rede lenta | Ações legíveis, sem sobreposição do dock/chat |
| T28 | Cancelamento com estorno falho | Operacional cancelado, financeiro pendente visível |
| T29 | Produto removido na origem | Novas compras bloqueadas, histórico preservado |
| T30 | Backup restaurado em homologação | Dados consistentes, comandos antigos não reexecutados |

## Gate de lançamento

Decisões comerciais críticas fechadas; integração homologada; pagamentos reais de teste controlados quando autorizados; callbacks e retries idempotentes; perfis de acesso revisados; catálogo conferido; identidade e políticas publicadas; rastreamento testado em dispositivos usados; agenda validada pela equipe; rotina de contingência e caixa treinadas. Não aprovar apenas pela aparência da home.
