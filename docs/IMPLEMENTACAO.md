# Implementação e decisões

## Estado entregue

- Superfícies responsivas pública, autenticação, conta, gestão e entregador.
- Catálogo persistente, carrinho local versionado, contas, pedidos idempotentes, pets, endereços e agendamentos.
- Autorização por papel e separação entre estados operacional e financeiro.
- Estados honestos para integrações ainda não homologadas.
- Catálogo versionado importado da planilha da loja, filtros derivados dos dados, chatbot transacional, checkout sem cobrança e perfis de teste por papel.
- Interface editorial própria com Motion, tipografia Geist/Instrument Serif e uma única família de ícones Phosphor. Não usa Lucide React nem kits visuais prontos.
- Busca preditiva agrupada em produtos, marcas e categorias.
- Assistente OpenAI opcional no servidor, com saída estruturada, IDs limitados ao catálogo, fallback determinístico e preço/carrinho sempre controlados pela aplicação.

## Integrações configuráveis

| Área | Variáveis | Comportamento sem configuração |
|---|---|---|
| Banco | `DATABASE_URL` | modo leitura segura, sem fabricar catálogo |
| Assistente | `OPENAI_API_KEY`, `OPENAI_MODEL` | recomendação determinística e produtos do catálogo continuam disponíveis |
| Pagamento | `PAYMENT_PROVIDER`, segredos | Pix/cartão indisponíveis; presencial sujeito à configuração |
| Legado | `LEGACY_CATALOG_API_*` | catálogo administrado na base própria |
| WhatsApp | `WHATSAPP_*` | chat web ativo; botão de canal oculto |
| Mapas | `MAPS_*` | rastreamento textual, sem posição simulada |

## Pendências da loja

Continuam dependentes de decisão: sincronização do catálogo operacional, frete e cobertura, cobrança presencial em entrega, gateway/parcelamento, serviços/capacidade, endereço/horário/contato, políticas, WhatsApp oficial e estratégia de reserva compartilhada com balcão. A interface sinaliza cada indisponibilidade sem assumir valores.
