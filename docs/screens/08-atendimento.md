# Atendimento

- **Rota:** `/atendimento`
- **Objetivo:** tirar dúvidas, orientar a escolha, comparar produtos e montar o carrinho usando o mesmo catálogo da loja.
- **Público/perfil:** público.
- **Componentes usados:** `ChatView`, mensagens animadas, sugestões, comparação responsiva e cards compactos de produto.
- **Dados necessários:** produtos de `listProducts` e árvore de opções local.
- **Ações possíveis:** escolher assunto, escrever perguntas, comparar opções, ver/adicionar produtos, abrir carrinho, consultar pedidos pela conta e solicitar continuidade humana.
- **Regras:** o modelo recebe somente uma seleção limitada do catálogo; IDs retornados são validados; preços são renderizados pela aplicação; não diagnostica nem inventa benefícios, estoque, frete, promoção ou política; não afirma integração de WhatsApp ativa.
- **Estados:** início guiado, consulta, resposta, produtos sugeridos, comparação, fallback local, erro recuperável e necessidade de confirmação humana.
- **Desktop:** painel de conversa central com sugestões laterais/internas.
- **Mobile:** mensagens e botões ocupam a largura, com áreas de toque amplas.
- **Animações/transições:** mensagens e opções atualizam de modo discreto; página usa transição global.
- **Permissões:** pública.
- **Dependências de backend:** catálogo e `/api/assistant`; o canal web mantém fallback útil sem a OpenAI.
- **Integrações externas:** OpenAI Responses API com saída estruturada. Futuras: WhatsApp oficial, handoff e persistência de conversa.
- **Pendências:** homologação do WhatsApp, fila humana persistente e conjunto de avaliações da qualidade das respostas.
