# Entrega própria com localização

## Fluxo operacional

Pedido elegível e separado entra em M07. O despachante agrupa e atribui entregas. E01 recebe a rota. E02 inicia percurso e posições; o cliente vê C04 apenas para seu pedido ativo. Na parada, E03 registra prova e cobrança separadas. M08 acompanha ocorrências. Financeiro concilia recebimentos presenciais em M14.

## Política de rastreamento proposta

Coletar somente durante rota ativa, com permissão do dispositivo e finalidade operacional. Guardar lat/lng, precisão, captured_at, received_at, entregador e rota; rejeitar posições inválidas e identificar atraso. Não criar animação que pareça posição real quando não há atualização. O cliente recebe a posição atual necessária à própria entrega, sem lista de outros clientes, paradas ou histórico integral.

Intervalo, distância mínima entre envios, retenção e limiar de dado antigo são parâmetros técnicos a validar em testes de bateria/rede. Guardar horários em UTC e mostrar no fuso da loja. A localização termina com a rota; canais do cliente perdem acesso ao encerrar a entrega.

## Decisão técnica importante

Geolocalização web depende de contexto seguro e permissão. Fonte: [MDN Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API), consultada em 23/09/2026. Não assumir que uma página web manterá rastreamento confiável com tela apagada ou app de navegação em primeiro plano. A exigência de acompanhamento contínuo em segundo plano deve ser validada em dispositivos reais; considerar aplicativo do entregador com capacidades nativas se necessário. Isso é decisão D09, sem alteração do site do consumidor.

## Ocorrências

Cliente ausente: motorista registra tentativa, contato e orientação da operação. Endereço errado: pausar e confirmar com cliente; recalcular rota/frete só mediante política e aprovação, sem cobrança silenciosa. GPS negado: manter status e contato; avisar operação. Sem rede: eventos com UUID ficam pendentes localmente e são reenviados; conclusão só é definitiva após aceite do servidor. Devolução à loja é ocorrência com destino operacional, não cancelamento/estorno automático.

## Cobrança

Se presencial na entrega for aprovado, motorista vê saldo e métodos aceitos. Recebimento em dinheiro gera obrigação de prestação ao caixa. Pix/cartão devem ter confirmação adequada do provedor/maquininha/processo de caixa; imagem de comprovante não quita automaticamente. Entrega física, recebimento do cliente e prestação de contas são eventos distintos.

Diagrama: [FL04](../../FLUXOS/FL04-ENTREGA.md).
