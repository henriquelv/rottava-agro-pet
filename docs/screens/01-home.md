# Home

- **Rota:** `/`
- **Objetivo:** apresentar a identidade Rottava e iniciar a compra pelo agente, permitindo entender necessidades, comparar opções e adicionar produtos ao carrinho sem percorrer todo o catálogo.
- **Público/perfil:** visitante ou cliente autenticado.
- **Componentes usados:** `GlyphPortalHero`, `CommerceAgent`, `SelectMenu`, composição editorial de categorias, faixa contínua de marcas, header, busca, minicarrinho e dock móvel.
- **Dados necessários:** produtos publicados por `listProducts`, incluindo `metadata` de espécie, fase, porte, tipo e necessidade quando disponíveis.
- **Ações possíveis:** atravessar ou pular o portal de entrada; responder espécie, fase de vida, porte e objetivo; fazer perguntas abertas; comparar até três opções; escolher variante; adicionar ao carrinho; seguir para identificação/checkout; reiniciar; entrar por categoria ou marca.
- **Regras:** o primeiro ranqueamento é determinístico. A OpenAI explica e reorganiza somente IDs recebidos do servidor; preço, variante, estoque, carrinho e pedido permanecem sob controle da aplicação. Não cria avaliações, descontos, benefícios veterinários ou disponibilidade.
- **Estados:** portal, perguntas, consulta da IA, resultados, comparação, fallback do catálogo, erro recuperável e carrinho atualizado.
- **Desktop:** portal com revelação por scroll; agente em duas colunas; mosaico fotográfico assimétrico e faixa de marcas pausável.
- **Mobile:** portal simplificado, agente empilhado, categorias sem trilho obrigatório e marcas com rolagem manual; dock permanece fixo.
- **Animações/transições:** portal, troca de pergunta, comparação, resultados, menus de variante e faixa de marcas; `prefers-reduced-motion` remove deslocamentos e looping.
- **Permissões:** pública.
- **Dependências de backend:** `listProducts`, `/api/assistant` e `/api/catalog/search`; catálogo do banco quando selecionado ou fallback versionado da planilha.
- **Integrações externas:** OpenAI Responses API no servidor; a indisponibilidade ativa fallback local sem interromper a compra.
- **Pendências:** associar imagens oficiais, estoque, políticas e atributos veterinários aprovados aos SKUs; avaliar respostas da IA com conversas reais antes de ampliar autonomia.
