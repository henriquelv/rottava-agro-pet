# Home

- **Rota:** `/`
- **Objetivo:** iniciar a compra pelo Agente Rottava, permitindo buscar, comparar variantes e adicionar produtos ao carrinho sem percorrer o catálogo.
- **Público/perfil:** visitante ou cliente autenticado.
- **Componentes usados:** `CommerceAgent`, `SelectMenu`, `Sheet`, header, busca, minicarrinho e dock móvel.
- **Dados necessários:** produtos publicados por `listProducts`, incluindo `metadata` de espécie, fase, porte, tipo e necessidade quando disponíveis.
- **Ações possíveis:** responder espécie, fase de vida, porte e objetivo por botões; refinar por raça, sabor ou outro termo; comparar três opções; escolher variante; adicionar ao carrinho; seguir para identificação/checkout; reiniciar a orientação; entrar pelas categorias Cães, Gatos, Pet em geral e Banho & tosa.
- **Regras:** a recomendação é determinística, ranqueia somente itens existentes e não cria estoque, avaliações, descontos ou alegações. A compra sempre passa por carrinho e confirmação.
- **Estados:** cada resposta avança uma etapa; resultados exibem até três produtos; catálogo vazio não gera recomendações fictícias; carrinho atualizado libera o próximo passo.
- **Desktop:** introdução e console do agente dividem a primeira dobra; abaixo existem apenas quatro blocos de categoria e o rodapé global.
- **Mobile:** conteúdo empilha sem trilho horizontal; perguntas viram uma coluna, resultados são compactos e o dock permanece fixo.
- **Animações/transições:** troca de pergunta, opções, resultados, menus de variante e estados do carrinho usam Motion; `prefers-reduced-motion` elimina deslocamentos não essenciais.
- **Permissões:** pública.
- **Dependências de backend:** `listProducts`; catálogo do banco quando selecionado ou fallback versionado importado da planilha da loja.
- **Integrações externas futuras:** modelo de linguagem via AI SDK/Gateway para interpretação aberta, preservando as mesmas ferramentas de catálogo e carrinho.
- **Pendências:** fornecer credencial e modelo homologados antes de ativar interpretação generativa. Associar imagens oficiais, estoque, políticas e atributos veterinários aprovados aos SKUs.
