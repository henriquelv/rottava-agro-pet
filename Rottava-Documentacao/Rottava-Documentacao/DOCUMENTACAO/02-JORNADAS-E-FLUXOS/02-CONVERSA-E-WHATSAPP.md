# Compra guiada na conversa

## Modelo único de intenção

Site e WhatsApp compartilham contexto lógico, carrinho e comandos. A apresentação é adaptada ao canal. O bot pode pesquisar, explicar com dados cadastrados, comparar atributos existentes, adicionar/remover itens, calcular frete, preparar checkout e mostrar pagamento. Não precisa transferir para humano em toda compra; transfere quando cliente pede, dado falta ou ação exige revisão.

## Roteiro proposto por botões

| Etapa | Pergunta ou conteúdo | Ações |
|---|---|---|
| Entrada | Como podemos ajudar? | Comprar, Serviços, Mais opções |
| Mais opções | Escolha um atendimento | Meus pedidos, Falar com pessoa, Voltar |
| Busca | Qual produto você procura? | Categorias em lista; texto livre |
| Produto | Nome, variante, preço e disponibilidade | Adicionar, Ver detalhes, Outros |
| Carrinho | Itens e subtotal | Finalizar, Continuar comprando, Editar |
| Identificação | Vincular ou criar sua conta | Abrir acesso seguro; retornar à conversa |
| Recebimento | Como prefere receber? | Entrega, Retirada, Voltar |
| Endereço | Selecionar endereço verificado | Lista de endereços, Novo endereço |
| Pagamento | Escolha a forma | Pix, Cartão, Presencial |
| Revisão | Itens, frete, total e recebimento | Confirmar pedido, Alterar, Voltar |
| Pedido registrado | Número e estado | Pagar quando elegível, Acompanhar, Ajuda |

No WhatsApp, botões de resposta têm até três opções segundo documentação Meta consultada em 23/09/2026. Menus maiores usam listas ou etapas. O site pode mostrar mais opções, mas todas usam os mesmos IDs de ação. Fonte: [Meta reply buttons](https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/interactive-reply-buttons-messages/) e [Meta listas](https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/interactive-list-messages/).

## Identidade e continuidade

Telefone recebido do canal identifica a conversa, mas acesso ao histórico da conta exige vínculo verificado. Um link assinado e temporário abre login/cadastro com senha fora da conversa; após sucesso, vincula canal e conta com consentimento. Não pedir senha, CVV ou número de cartão ao bot. Um carrinho originado no site pode continuar no WhatsApp por token temporário; não colocar endereço, valor confiável ou credenciais na URL.

## Segurança das ações

Cada botão carrega action_id, conversa, versão do carrinho/contexto, expiração e assinatura/referência validada no servidor. Clique antigo recebe resumo atual, sem executar comando desatualizado. Mensagem duplicada é reconhecida por ID do provedor; comando usa idempotency_key. Um modelo de linguagem interpreta intenção, mas valores, autorização e transições são decididos pela aplicação.

## Pagamento e humano

Pix pode ser apresentado conforme suporte do canal e do provedor; cartão abre página segura. Pagamento nativo dentro do WhatsApp não é pressuposto. Operador assume conversa por trava e pausa o bot; o histórico e carrinho continuam disponíveis. Retomada do bot é explícita. Mensagens proativas dependem de consentimento e regras vigentes de templates/janela do canal. Esses detalhes devem ser validados na homologação da conta WhatsApp.

Diagrama: [FL03](../../FLUXOS/FL03-CONVERSA.md).
