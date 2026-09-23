# Direção visual e tokens

## Base confirmada

Tema Perpetuity copiado pelo usuário no Word, preservado integralmente em [PERPETUITY-TOKENS.css](../../REFERENCIAS/PERPETUITY-TOKENS.css). A paleta está definida; os wireframes são estudos de hierarquia, não aprovação final de tipografia, logo ou fotografias.

| Token | Claro | Escuro | Uso |
|---|---|---|---|
| background | #e8f0f0 | #0a1a20 | Fundo principal |
| foreground | #0a4a55 | #4de8e8 | Texto principal |
| card | #f2f7f7 | #0c2025 | Superfícies |
| primary | #06858e | #4de8e8 | Marca e ações |
| primary foreground | #ffffff | #0a1a20 | Texto sobre primary |
| border | #cde0e2 | #164955 | Divisórias |
| accent | #c9e5e7 | #164955 | Destaques leves |
| muted foreground | #427a7e | #36a5a5 | Texto secundário |
| destructive | #d13838 | #e83c3c | Erro e ação destrutiva |

O tema original tem raio 0.125rem e fonte monoespaçada: Courier New no claro e Source Code Pro no escuro. O pedido foi pela paleta. Proposta para leitura comercial: corpo em fonte sem serifa legível, a validar, mantendo cores e sem introduzir estética de terminal por obrigação. Wireframes usam Arial por portabilidade. O hero requer fonte com massa suficiente para o portal, conforme referência.

## Hierarquia proposta

Texto base 16 px; auxiliares pelo menos 14 px; títulos de seção 24–32 px; título de produto 28–36 px no desktop; hero responsivo. Espaçamento por escala 4/8/12/16/24/32/48/64. Alvos de toque com área mínima de projeto de 44 × 44 px. Tabelas operacionais viram cartões no celular. Foco visível, rótulos permanentes, leitura por teclado e redução de movimento fazem parte do aceite.

## Contraste

Preservar a paleta não significa usar qualquer combinação. Verificar contraste de cada estado; texto normal exige meta de 4,5:1 e texto grande 3:1. Se primary branco não atingir o alvo para texto pequeno, usar foreground escuro com texto branco no botão principal e primary como acento/borda, ou submeter ajuste de token de ação. Os tokens de origem continuam preservados. Não usar cor isolada para status.

## Tema e animação

Modo claro é proposta inicial para loja; escuro é variação documentada. O cliente ainda decide se haverá seletor. Glyph Portal somente na home, com atalho Ver produtos e fallback estático. Slider de marcas pausa por interação e respeita redução de movimento. Dock não interfere no teclado virtual nem cobre checkout. Não reproduzir animação de entrada ao voltar de um produto.
