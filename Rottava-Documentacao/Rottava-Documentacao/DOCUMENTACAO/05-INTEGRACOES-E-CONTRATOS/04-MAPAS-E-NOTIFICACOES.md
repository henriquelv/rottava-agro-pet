# Mapas localização e notificações

## Mapas

Selecionar fornecedor após estimar cotações, geocodificações, rotas e visualizações mensais. Funções: converter endereço em ponto, calcular distância/tempo quando regra exigir, renderizar mapa e abrir navegação. Cache e retenção devem seguir contrato do fornecedor. Chave pública restrita por origem e chave privada apenas no backend quando aplicável. Endereço e status textual continuam úteis sem mapa.

## Posição do entregador

Cliente só recebe dados filtrados da sua entrega ativa. A equipe autorizada recebe rotas operacionais. Canal de eventos valida token, identidade e autorização na assinatura e após revogação. Registrar precisão e horários; descartar coordenadas inválidas; não substituir última posição por evento antigo. Rotas com aplicativo em segundo plano dependem da decisão técnica D09.

## Matriz de notificações proposta

| Evento | Destinatário | Conteúdo mínimo | Condição |
|---|---|---|---|
| Pedido registrado | Cliente | Número e próximo passo | Após persistência |
| Pagamento confirmado | Cliente | Pedido e situação | Confirmação validada |
| Pronto para retirada | Cliente | Local e instruções | Operador concluiu separação |
| Saiu para entrega | Cliente | Link autenticado e estimativa disponível | Entrega ativa |
| Ocorrência | Cliente e operação | Orientação e contato | Conforme responsável |
| Agendamento confirmado | Cliente | Pet, serviço, data e local | Capacidade confirmada |
| Pet pronto | Cliente | Serviço e retirada | Evento da equipe |
| Falha de integração | Equipe | Contexto sem segredo | Monitoramento |

Mensagem dentro do site é base. WhatsApp depende de vínculo/consentimento e condições do canal. E-mail pode ser escolhido para recuperação e avisos. SMS/push não são pressupostos. Notificação não é fonte autoritativa do estado: link consulta o servidor. Reenviar tem chave de evento/canal/destinatário para evitar duplicidade.
