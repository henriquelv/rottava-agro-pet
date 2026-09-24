# Implementação e decisões

## Estado entregue

- Superfícies responsivas pública, autenticação, conta, gestão e entregador.
- Catálogo persistente, carrinho local versionado, contas, pedidos idempotentes, pets, endereços e agendamentos.
- Autorização por papel e separação entre estados operacional e financeiro.
- Estados honestos para integrações ainda não homologadas.
- Modo de demonstração isolado, com catálogo mock, filtros, chatbot transacional, checkout sem cobrança e perfis por papel.
- Interface editorial própria com SVGs autorais; nenhum kit visual ou pacote de ícones é usado. Motion, cmdk, Vaul, Sonner e nuqs permanecem restritos a comportamento, acessibilidade e estado.

## Integrações configuráveis

| Área | Variáveis | Comportamento sem configuração |
|---|---|---|
| Banco | `DATABASE_URL` | modo leitura segura, sem fabricar catálogo |
| Pagamento | `PAYMENT_PROVIDER`, segredos | Pix/cartão indisponíveis; presencial sujeito à configuração |
| Legado | `LEGACY_CATALOG_API_*` | catálogo administrado na base própria |
| WhatsApp | `WHATSAPP_*` | chat web ativo; botão de canal oculto |
| Mapas | `MAPS_*` | rastreamento textual, sem posição simulada |

## Pendências da loja

Continuam dependentes de decisão: catálogo real, frete e cobertura, cobrança presencial em entrega, gateway/parcelamento, serviços/capacidade, endereço/horário/contato, políticas, WhatsApp oficial e estratégia de reserva compartilhada com balcão. A interface sinaliza cada indisponibilidade sem assumir valores.
