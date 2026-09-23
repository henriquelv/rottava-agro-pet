# Rottava Pet Casa e Jardim planejamento do e commerce

Versão 1 · 23 de setembro de 2026 · Documento de concepção para Henrique e para validação com a loja.

Este pacote organiza telas, fluxos, regras e integrações para implementar a loja digital da Rottava em Caçador SC. Inclui compra pelo site e WhatsApp, atendimento com bot e humano, entrega própria com localização e banho e tosa. É documentação de projeto: não há site, integração, pagamento ou automação em execução.

## Confirmado pelo solicitante

| ID | Requisito | Alcance |
|---|---|---|
| R01 | Foco petshop e consumidor comum de Caçador | Nome Rottava Pet Casa e Jardim; categorias exatas pendentes |
| R02 | Preços públicos | Navegar e consultar sem login; conta com senha para compra identificada |
| R03 | Pix, cartão e pagamento presencial | Compra online; presencial tanto para entrega quanto retirada |
| R04 | Retirada e entrega própria | Motor de cálculo de frete; método e valores definidos depois |
| R05 | Banco de dados existente | Chat lê esse banco; fornecedor, esquema e integração ainda desconhecidos |
| R06 | Histórico e acompanhamento de pedidos | Entrega com localização, além de estados operacionais |
| R07 | Mesmo atendimento no site e WhatsApp | Montar pedido completo e guiar por botões; transferência para humano |
| R08 | Conta com senha | Identificador, recuperação e verificação ainda precisam de escolha |
| R09 | Banho e tosa | Serviço incluído; modelo detalhado de agenda proposto neste pacote |
| R10 | Referências 21st.dev | Perpetuity, Glyph Portal, Book a Demo, Feature Showcase, Infinite Slider e Dock |
| R11 | Organização em arquivos Markdown | SCREENS com um arquivo por tela; documentação em pastas por domínio |

## Proposto para tornar a operação completa

Painel administrativo por função; portal do entregador; agenda online; pets vinculados à conta; motor de preços/frete compartilhado entre canais; banco transacional próprio para pedidos e conversas; adaptador para o sistema da loja; histórico de alterações; conciliação de pagamento. São decisões de projeto revisáveis, não capacidades comprovadas do sistema atual.

## Não decidido

Plataforma e fornecedor do banco existente; mecanismo de reserva de estoque compartilhado com o balcão; categorias e marcas reais; gateway e parcelamento; regra de frete; janela de entrega; pagamento presencial na entrega versus ida ao balcão antes da entrega; política de serviços; identidade técnica e hospedagem. Consulte o registro de decisões pendentes.

## Limites do primeiro projeto

Sem marketplace, programa de fidelidade, assinatura de ração, clínicas/consultas, venda nacional, transporte de pets ou múltiplas lojas por pressuposto. Esses temas podem ser acrescentados por decisão posterior. Carrinho de produtos e agendamento são fluxos separados na proposta inicial; não presumir que a compra de um produto reserva banho e tosa.

## Como interpretar o pacote

“Confirmado” vem da conversa. “Proposta” é especificação funcional sugerida. “Pendente” depende do cliente ou de descoberta técnica. Rotas, entidades, eventos e endpoints são contratos lógicos para orientar implementação, sem alegação de existência no banco atual. Nenhum preço, marca, telefone ou endereço de exemplo é dado real da Rottava.
