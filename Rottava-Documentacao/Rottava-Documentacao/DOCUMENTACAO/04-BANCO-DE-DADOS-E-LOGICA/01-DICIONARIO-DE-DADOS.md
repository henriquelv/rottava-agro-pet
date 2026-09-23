# Dicionário lógico proposto

Este é o modelo do novo projeto. Nenhuma tabela abaixo foi identificada no banco real. Tipos, nomes físicos e mapeamentos serão definidos após descoberta. PKs internas são UUIDs propostos; valores monetários em centavos inteiros BRL; instantes em UTC com exibição America/Sao_Paulo; quantidade decimal somente quando unidade de venda exigir e for aprovada.

| Entidade | Campos principais | Dono e restrições |
|---|---|---|
| accounts | id, email, phone, name, status, auth_subject | Autenticação; senha hash no provedor ou repositório seguro, nunca em catálogo |
| channel_links | id, account_id, channel, external_contact_id, verified_at, revoked_at | Vínculo único ativo por canal/contato; prova de vínculo |
| addresses | id, account_id, street, number, district, city, state, postal_code, lat, lng, reference | Base nova; arquivar sem apagar snapshots |
| pets | id, account_id, name, species, size, coat, notes, archived_at | Base nova ou adaptador a descobrir |
| product_refs | id, external_system, external_product_id, category_id, brand_id, active | Código externo estável e único no sistema de origem |
| variants | id, product_id, external_sku, unit, attributes, sellable | Unidade e variante inequívocas |
| price_observations | variant_id, amount_cents, currency, source_version, observed_at | Fonte existente; não preço mestre novo por pressuposto |
| stock_observations | variant_id, observed_quantity, source_version, observed_at | Observação não equivale a reserva |
| catalog_content | product_id, description, media, slug, publication_state, version | Complemento editorial; separado de preço e estoque |
| brands/categories | id, external_id opcional, name, slug, active | Mapeamento e curadoria |
| carts | id, account_id opcional, anonymous_token_hash, channel, version, expires_at | Carrinho temporário não reserva |
| cart_items | id, cart_id, variant_id, quantity | Unicidade cart_id + variant_id quando não há personalização |
| shipping_rule_versions | id, method, coverage, parameters, effective_at, state | Configuração versionada |
| shipping_quotes | id, cart_id, cart_version, address_hash, rule_version_id, amount_cents, expires_at | Cotações imutáveis; não reaproveitar após alteração |
| orders | id, number, account_id, source_channel, operational_state, payment_state, fulfillment_mode, subtotal_cents, shipping_cents, total_cents, version, external_order_id | Pedido central; chave idempotente única por ator/operação |
| order_items | id, order_id, variant_id, external_sku, name_snapshot, unit_snapshot, quantity, unit_price_cents, line_total_cents | Snapshot de venda preservado |
| order_addresses | order_id, recipient_snapshot, address_snapshot, geo_snapshot | Endereço contratado; alteração por fluxo auditado |
| stock_reservations | id, order_id, variant_id, quantity, state, expires_at, external_reservation_id | Reserva local não garante balcão; depende de estratégia integrada |
| payment_attempts | id, order_id, provider, provider_id, method, state, amount_cents, idempotency_key | Várias tentativas, sem cobrar duas simultâneas indevidamente |
| payment_events | id, provider, external_event_id, verified_at, state, payload_ref | Unicidade provider + event_id; payload minimizado |
| receipts | id, order_id, delivery_id opcional, method, amount_cents, recorded_by, confirmed_by, state, reference | Recebimento presencial e confirmação separados |
| refunds | id, payment_attempt_id ou receipt_id, amount_cents, reason, state, external_id | Estorno não apaga recebimento |
| delivery_routes | id, driver_id, state, started_at, ended_at, version | Uma atribuição ativa por tarefa |
| deliveries | id, order_id, route_id, stop_position, state, proof_ref, completed_at | Uma entrega ativa por pedido na proposta inicial |
| location_events | id, driver_id, route_id, lat, lng, accuracy, captured_at, received_at | Retenção limitada a definir; acesso restrito |
| delivery_events | id, delivery_id, client_event_id, type, actor_id, occurred_at, received_at | Deduplicação de eventos offline |
| services | id, name, active, pricing_rule, duration_rule, version | Catálogo de banho e tosa |
| resources | id, type, name, capacity, active | Profissional, espaço ou equipamento necessário |
| resource_calendar | id, resource_id, availability_or_block, starts_at, ends_at | Expediente, férias, pausas e bloqueios |
| appointment_holds | id, account_id, pet_id, resource_allocations, start, end, expires_at, state | Reserva temporária atômica |
| appointments | id, account_id, pet_id, service_snapshot, resource_allocations, starts_at, ends_at, state, quoted_amount_cents, final_amount_cents, version | Valor nulo permitido somente com modo avaliação explícito |
| appointment_events | id, appointment_id, type, actor_id, occurred_at, approved_change_ref | Linha do tempo e aprovações |
| conversations | id, account_id opcional, channel, contact_ref, owner_type, agent_id, state | Identidade pode estar pendente |
| messages | id, conversation_id, external_message_id, direction, kind, content_ref, occurred_at | Conteúdo com retenção e acesso definidos |
| conversation_actions | id, conversation_id, context_version, command, expires_at, consumed_at | Botões assinados/identificadores opacos; uso idempotente |
| requests | id, order_id, account_id, type, reason, state, resolution | Cancelamento, devolução e problema |
| staff/roles | account_id, role_id, permissions, active | Autorização operacional |
| content_versions | id, key, body, published_at, approved_by | Home, políticas e dados públicos |
| integration_jobs | id, connector, aggregate_id, operation_key, state, attempt_count, next_attempt_at | Fila persistente e reconciliação |
| outbox_events | id, aggregate_id, event_type, payload_ref, created_at, delivered_at | Gravado com mudança de negócio |
| audit_events | id, actor_id, subject_id, action, before_ref, after_ref, reason, timestamp | Trilha append-only lógica, com retenção definida |

## Mapeamento mínimo do legado

Precisamos identificar produto, SKU/variante, unidade, preço vigente, disponibilidade, data de alteração e situação de venda. Para escrever vendas: cliente, itens, pagamento, referência externa, reserva, cancelamento e comportamento de idempotência. Se campos faltarem, registrar lacuna; não derivar automaticamente preço por embalagem ou saldo vendável a partir de campos desconhecidos.
