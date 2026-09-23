# Integração com banco e sistema existentes

## O que sabemos

Existe um banco com integração e o chat deverá ler esse banco. Não foram fornecidos nome do sistema, documentação, esquema, credenciais ou amostra de dados. Portanto, nenhuma conexão, tabela ou capacidade de escrita foi testada.

## Descoberta necessária

Solicitar fornecedor, banco/versão, documentação da integração, modo de acesso permitido, ambiente de teste e contato técnico. Identificar IDs estáveis, variações, unidade de venda, casas decimais, saldo disponível versus físico, reservas, preço vigente/promocional, produtos inativos, fotos, descrições e atualização. Levantar se há API para clientes, pedidos, pagamentos, cancelamentos e reserva, incluindo limites e idempotência.

## Opções de leitura

Preferir API oficial suportada quando disponível. Se acesso direto ao banco for a integração permitida, usar credencial somente leitura em views restritas, consultas parametrizadas, rede protegida, limite de duração/linhas e processo intermediário no backend. O bot não acessa o banco pelo navegador nem recebe credencial. Cache é permitido para descoberta de catálogo, com updated_at; preço/estoque precisam da política de frescor aprovada para confirmar compra.

## Estratégias de pedido conforme capacidade real

| Capacidade descoberta | Caminho proposto | Limitação |
|---|---|---|
| API de reserva/venda idempotente | Reservar na autoridade do estoque e vincular IDs | Homologar expiração/liberação e falhas |
| API de venda sem reserva prévia | Validar contrato de criação atômica e momento de cobrança | Não prometer última unidade antes de aceite |
| Somente leitura | Registrar pedido aguardando disponibilidade; equipe confere e compromete estoque no sistema | Operação manual e tempo de confirmação explícitos |
| Exportação periódica | Catálogo indicativo com data; confirmação assistida | Não apresentar como estoque em tempo real |

Escolher uma estratégia antes de habilitar compra automática. Não implementar tabela local de “estoque real” concorrente ao balcão sem acordo operacional. No modo somente leitura, a equipe precisa registrar/segurar fisicamente o pedido antes de liberar cobrança; procedimento e responsabilidade são gate do lançamento.

## Falha e reconciliação

Guardar external_system, external_id e operation_key em cada ação. Após timeout de criação, consultar referência externa antes de repetir. Esquema mudou: suspender ingestão inválida e alertar M15. Produto retirado na origem fica indisponível para novas compras; histórico permanece. Nunca fazer alteração destrutiva no banco existente para acomodar o novo projeto sem mudança específica aprovada.
