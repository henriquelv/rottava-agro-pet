# Rottava Pet Casa e Jardim

Documentação funcional e técnica para organizar o projeto do e commerce. Versão 1 de 23/09/2026, preparada a partir das definições de Henrique, do Word com referências visuais e das imagens de organização fornecidas.

O pacote contém **46 telas especificadas**, **29 documentos por área**, **8 fluxos com responsáveis e exceções** e **12 wireframes das telas principais**. A loja ainda não foi implementada. Integrações, banco existente e pagamentos não foram conectados ou testados.

## Comece por aqui

1. Leia a [visão e os requisitos](DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/01-VISAO-E-REQUISITOS.md).
2. Confira o [mapa das 46 telas](DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md).
3. Abra o [índice de wireframes](WIREFRAMES/README.md) e os [fluxos](FLUXOS/README.md).
4. Consulte os arquivos da pasta [SCREENS](SCREENS/README.md) para detalhar cada tela.
5. Use a [documentação por área](DOCUMENTACAO/README.md) para regras, dados, integrações e implementação.
6. Revise com a loja as [decisões pendentes](DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md).

## Organização

| Pasta | Conteúdo |
|---|---|
| SCREENS | Um Markdown por tela, com objetivo, composição, botões, navegação, regras, dados, estados e aceite |
| DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO | Requisitos, arquitetura, inventário e permissões |
| DOCUMENTACAO/01-UI-E-DESIGN | Perpetuity, componentes, responsividade e padrões de interação |
| DOCUMENTACAO/02-JORNADAS-E-FLUXOS | Compra, WhatsApp, entrega e banho e tosa |
| DOCUMENTACAO/03-OPERACAO-ADMINISTRATIVA | Rotina da equipe, cancelamentos e exceções |
| DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA | Dicionário lógico, relações, estados, regras, autenticação e eventos |
| DOCUMENTACAO/05-INTEGRACOES-E-CONTRATOS | Banco existente, pagamentos, chatbot, mapas, notificações e contratos propostos |
| DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO | Pendências, sequência de implementação, aceite, rastreabilidade e operação |
| FLUXOS | Diagramas por responsável em SVG/PNG, explicação em Markdown e fonte Mermaid |
| WIREFRAMES | 12 estudos de layout em SVG editável e PNG |
| REFERENCIAS | Word original, imagens enviadas, componentes e tokens exatos do tema |

## Como abrir

Extraia o ZIP e abra a pasta Rottava-Documentacao no VS Code. Abra README.md e use a prévia Markdown. Os links são relativos e funcionam dentro da pasta. SVG e PNG podem ser abertos diretamente; os .mmd são fontes editáveis dos diagramas. Também é possível versionar esta estrutura em um repositório quando o projeto for criado.

## O que já está definido

Petshop para consumidor de Caçador; preços públicos; Pix, cartão e opção presencial; retirada e entrega própria com localização; histórico de pedidos; conta com senha; chat e WhatsApp capazes de montar pedido completo por etapas e botões; leitura do banco existente pelo chat; banho e tosa; referências visuais fornecidas.

## O que é proposta de projeto

Organização do painel e dos papéis; rotas e nomes de endpoints; modelo lógico de banco novo; agenda online; portal/app do entregador; hierarquia dos wireframes; interpretação da composição Book a Demo para vitrine. São itens detalhados para revisão e implementação, não características já existentes no sistema da loja.

## O que permanece em aberto

Banco/API e reserva de estoque; método e valores de frete; local exato do pagamento presencial para entrega; gateway e parcelamento; serviços/preços/capacidade; rastreamento em segundo plano; WhatsApp oficial; dados reais da loja e políticas. O registro D01–D18 explica impacto e responsável sem inventar valores comerciais.

## Convenções

P = loja pública/compra; A = autenticação; C = cliente; M = gestão; E = entregador. R = requisito; RN = regra; D = decisão pendente; T = cenário de aceite; FL = fluxo; WF = wireframe. Produto, valor, marca ou horário entre colchetes são placeholders. Hero, dock, slider e card são componentes compartilhados; não são páginas autônomas.

Os diagramas por responsáveis se inspiram no exemplo enviado, mas são fluxos funcionais, não modelos BPMN 2.0 executáveis. Os wireframes demonstram hierarquia e paleta; não são screenshots de um site pronto nem design final aprovado. A referência original foi preservada sem alteração.
