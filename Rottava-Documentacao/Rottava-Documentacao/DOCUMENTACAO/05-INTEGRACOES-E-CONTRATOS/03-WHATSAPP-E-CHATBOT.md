# Integração de WhatsApp e chatbot

## Camadas

Adaptador de canal recebe eventos e envia mensagens. Orquestrador mantém etapa da conversa. Serviço de identidade vincula contato à conta. Gateway de ferramentas expõe ações tipadas. Serviços de negócio consultam catálogo, calculam e gravam pedidos. Atendimento humano assume a conversa quando necessário.

| Ferramenta proposta | Permissão | Retorno esperado |
|---|---|---|
| search_products(query, filters) | Público | IDs, nomes, variantes, preços e momento da leitura |
| get_product(id) | Público | Cadastro e disponibilidade contextual |
| upsert_cart_item(cart_id, variant_id, quantity, version) | Dono do carrinho | Carrinho recalculado e versão |
| quote_shipping(cart_id, address_id) | Cliente vinculado | Cotação/indisponibilidade e motivos |
| prepare_checkout(cart_id) | Cliente vinculado | Resumo e token de confirmação temporário |
| confirm_order(confirmation_token, key) | Cliente confirmou | Pedido central ou conflito revisável |
| get_my_order(order_id) | Dono verificado | Dados e estados permitidos |
| get_service_slots(pet_id, service_id) | Cliente vinculado | Horários e condição de preço |
| confirm_appointment(hold_id, key) | Cliente confirmou | Agendamento ou conflito |
| handoff(conversation_id, reason) | Conversa atual | Fila/atendente e bot pausado |

Nenhuma ferramenta recebe SQL arbitrário, customer_id escolhido pelo modelo ou preço autorizado pelo modelo. O backend injeta identidade e escopo. Leituras dependem de banco real mapeado; resultados não encontrados são explicitamente desconhecidos. Descrições de produto não podem instruir o bot a executar ferramentas.

## Requisitos do canal

Conta WhatsApp Business Platform, número elegível, provedor ou Cloud API, credenciais, webhooks e modelos de mensagem quando exigidos. Não pressupor que um link wa.me sozinho dá bot, botões ou histórico sincronizado. A documentação Meta distingue mensagens de serviço e templates; validar janela, permissões, limites e custos na conta escolhida antes do lançamento.

Botões usam IDs estáveis, com até três respostas rápidas por mensagem na referência atual; listas dividem menus maiores. Recursos adicionais, como Flows, são opcionais e dependem do suporte escolhido. Um único desenho de conversa não exige UI idêntica nos canais.

## Confiabilidade

Validar assinatura do webhook; deduplicar ID externo; registrar entrada antes do processamento; controlar reenvio de saída; evitar eco do bot; correlacionar clique à versão de contexto; limitar abuso; mascarar dados em logs. Ao assumir humano, bot_ativo muda para humano_ativo atomicamente. Reabrir conversa preserva histórico permitido sem reaproveitar confirmação antiga.

Fontes consultadas em 23/09/2026: [Meta botões](https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/interactive-reply-buttons-messages/), [Meta listas](https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/interactive-list-messages/), [Meta mensagens de serviço](https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/send-messages). Preços do canal não foram estimados.
