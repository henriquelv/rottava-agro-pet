# Produto

- **Rota:** `/produto/[slug]`
- **Objetivo:** explicar o item e permitir escolher variação e quantidade.
- **Público/perfil:** público.
- **Componentes usados:** `ProductGallery`, `ProductBuy`, `ProductDetails`, `ProductCard` relacionados.
- **Dados necessários:** produto, imagens, variantes, preço, disponibilidade e relacionados da mesma categoria.
- **Ações possíveis:** trocar imagem/variante, ajustar quantidade, favoritar, adicionar e continuar no carrinho.
- **Regras:** sem preço a compra é bloqueada; estoque é revalidado no pedido; rating/desconto/badge só existem em fixture demo.
- **Estados:** slug ausente retorna 404; imagem ausente usa arte neutra; variação sem estoque desabilita compra; success renderiza JSON-LD.
- **Desktop:** galeria grande à esquerda e compra sticky à direita.
- **Mobile:** thumbnails roláveis e barra de compra fixa acima do dock.
- **Animações/transições:** troca de imagem e preço com presença animada, hover com segunda imagem, accordions suaves.
- **Permissões:** pública.
- **Dependências de backend:** `getProduct`, criação de pedido no checkout.
- **Integrações externas futuras:** mídia e estoque do catálogo legado.
- **Pendências:** conteúdo técnico depende das descrições oficiais.
