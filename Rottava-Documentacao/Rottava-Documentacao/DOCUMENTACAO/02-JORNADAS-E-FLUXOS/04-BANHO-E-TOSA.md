# Banho e tosa

Serviço confirmado; fluxo de autoagendamento é proposta detalhada para aprovação. Não há informação real de serviços, preços, equipe, duração ou capacidade no material recebido.

## Antes do atendimento

P04 apresenta os serviços. Cliente entra, cadastra pet em C07 e seleciona serviço em C08. Disponibilidade depende de duração, porte/pelagem quando relevantes, profissionais, recursos, pausas e bloqueios. Ao revisar, uma reserva temporária impede concorrência; confirmação consome a vaga. Se depender de avaliação, criar solicitação claramente pendente, sem prometer preço/horário como confirmado.

## Operação

M09 mostra agenda. Recepção confirma condições e recebe pet. M10 registra início, ocorrências e adicionais. Adicional proposto informa diferença de preço e duração; cliente aprova antes da execução. Serviço pronto gera aviso; entrega do pet é registrada. Pagamento e conclusão de serviço são separados, como nos pedidos de produtos.

## Reagendamento

Reservar novo horário antes de liberar o antigo; confirmar a troca de forma atômica na base de agenda ou usar compensação explícita em integração externa. Falha mantém horário anterior. Cancelamento é registrado e libera capacidade uma única vez. Política de antecedência, sinal, taxa e ausência depende de aprovação do cliente; não criar multa automática.

## Escopo proposto

Agendamento separado do carrinho de produtos. Controles próprios de serviços se o sistema atual não oferecer agenda. Pagamento de serviços inicialmente na operação, como proposta a validar; pagamento online ou sinal só após decisão D08. Transporte de pets não está incluído. Histórico do pet serve ao atendimento, sem substituir prontuário veterinário.

Diagrama: [FL05](../../FLUXOS/FL05-BANHO-E-TOSA.md).
