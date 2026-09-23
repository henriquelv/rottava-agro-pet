# Compra de produtos

## Jornada principal

P01 apresenta a loja; P02 encontra produtos; P03 resolve variante e quantidade; P05 revisa itens; A01/A02 identifica; P06 define recebimento e pagamento; P07 processa online quando aplicável; P08 confirma registro; C03 acompanha operação; C04 acompanha entrega ativa. A visita pode começar diretamente em produto ou chat, mantendo as mesmas regras.

## Checkout em sequência

1. Carregar carrinho com sua versão e identidade.
2. Escolher retirada ou entrega. Retirada usa local/horário; entrega exige endereço validado.
3. Calcular cotação com regra versionada e prazo de validade configurável.
4. Selecionar Pix, cartão ou presencial. Mostrar onde ocorrerá cobrança.
5. Revalidar preços e disponibilidade; apresentar qualquer alteração.
6. Confirmar resumo com total, método e condições.
7. Criar pedido idempotente e reservar disponibilidade pela estratégia aprovada.
8. Cobrar online apenas quando a condição de estoque permitir. Se integração for somente leitura sem reserva confiável, registrar aguardando confirmação de estoque e liberar pagamento após conferência.
9. Exibir confirmação e liberar processamento conforme estado financeiro/comercial.

## Retirada

Pedido confirmado entra na separação; operador marca pronto para retirada e envia aviso. Cliente apresenta identificação/código conforme política. Pagamento presencial é registrado antes de liberar mercadoria, salvo exceção autorizada pela gestão com motivo. Retirada concluída gera evento e mantém comprovante. Prazo máximo para buscar e cancelamento por abandono são pendências; não aplicar prazo inventado.

## Falhas

Carrinho desatualizado exige revisão; estoque insuficiente impede concluir com aquele item; erro após criação consulta chave original; pagamento negado mantém pedido recuperável conforme reserva; reserva expirada exige revalidação; indisponibilidade de catálogo permite navegar dados indicativos mas bloqueia promessa de compra sem confirmação. Substituição exige cliente aprovar item, preço e eventual diferença financeira.

Diagramas: [FL01](../../FLUXOS/FL01-COMPRA.md), [FL02](../../FLUXOS/FL02-RETIRADA.md).
