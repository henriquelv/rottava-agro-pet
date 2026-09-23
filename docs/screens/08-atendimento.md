# Atendimento

- **Rota:** `/atendimento`
- **Objetivo:** orientar por botões e montar carrinho usando o mesmo catálogo da loja.
- **Público/perfil:** público.
- **Componentes usados:** `ChatView`, sugestões de produto e `ProductCard` simplificado.
- **Dados necessários:** produtos de `listProducts` e árvore de opções local.
- **Ações possíveis:** escolher assunto, voltar, ver/adicionar produtos e falar com a equipe quando disponível.
- **Regras:** preço vem do catálogo; demo é identificado; não afirma integração de WhatsApp ativa.
- **Estados:** início guiado, conversa em andamento, produtos sugeridos e indisponibilidade de integração.
- **Desktop:** painel de conversa central com sugestões laterais/internas.
- **Mobile:** mensagens e botões ocupam a largura, com áreas de toque amplas.
- **Animações/transições:** mensagens e opções atualizam de modo discreto; página usa transição global.
- **Permissões:** pública.
- **Dependências de backend:** catálogo; canal web funciona sem banco no demo.
- **Integrações externas futuras:** WhatsApp oficial, handoff e persistência de conversa.
- **Pendências:** credenciais e homologação do WhatsApp.
