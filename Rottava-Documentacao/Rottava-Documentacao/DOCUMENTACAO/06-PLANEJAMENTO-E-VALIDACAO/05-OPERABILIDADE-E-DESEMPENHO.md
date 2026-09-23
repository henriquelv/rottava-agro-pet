# Operabilidade e desempenho

## Metas propostas para validar

Catálogo paginado e imagens dimensionadas; buscar e adicionar sem esperar animação. Carregar mapas somente nas telas necessárias. Medir tempo de consulta do catálogo, sucesso do checkout, atraso de webhook, fila de integração, idade da posição e taxa de transferência humana. Alvos numéricos dependem de volumes e infraestrutura, ainda não informados.

## Falhas e recuperação

Monitorar saúde por conector, não apenas servidor online. Exibir horário da última sincronização. Guardar correlation_id para rastrear uma compra entre conversa, pedido, pagamento e integração. Alertas devem ser acionáveis: pedido pago sem estoque confirmado, cobrança duplicada, entrega parada, agendamento conflitante e fila de erro.

Backups e restauração testados da base nova e mídia necessária; política de RPO/RTO definida com o cliente. Restauração não deve reenviar notificações/cobranças antigas sem conciliação. Segredos separados por ambiente. Logs e posições têm retenção limitada conforme decisão D15. Nenhum relatório de produção pode afirmar “zero erros” por falta de dados.

## Contingência

Banco legado indisponível: suspender confirmação automática de itens incertos e manter atendimento. Provedor de pagamento indisponível: exibir pendência e modalidades alternativas autorizadas, sem converter cobrança automaticamente. WhatsApp indisponível: site e fila humana disponíveis. GPS indisponível: status textual e operação. Agenda indisponível: receber solicitação sem garantir vaga.
