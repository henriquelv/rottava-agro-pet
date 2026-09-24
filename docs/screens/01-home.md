# Home

- **Rota:** `/`
- **Objetivo:** iniciar a compra pelo Agente Rottava, permitindo buscar, comparar variantes e adicionar produtos ao carrinho sem percorrer o catálogo.
- **Público/perfil:** visitante ou cliente autenticado.
- **Componentes usados:** `CommerceAgent`, `ProductCard`, `Reveal`, header, busca, minicarrinho e dock móvel.
- **Dados necessários:** produtos publicados por `listProducts`; imagem editorial local; modo demo.
- **Ações possíveis:** conversar por texto ou atalhos; consultar resultados derivados do catálogo; escolher variante; adicionar direto ao carrinho; navegar ao produto, catálogo, atendimento e banho e tosa; favoritar produtos da vitrine.
- **Regras:** dados comerciais demonstrativos só vêm de `demo-catalog.ts`; sem catálogo real é exibido estado vazio.
- **Estados:** loading é o streaming padrão do Next; empty mostra preparação da vitrine; falha de fonte cai no tratamento do servidor; success mostra até seis produtos.
- **Desktop:** introdução editorial e console do agente dividem a primeira dobra; resultados aparecem dentro da conversa; vitrine horizontal e composição editorial assimétrica continuam abaixo.
- **Mobile:** o agente aparece antes da vitrine, com prompts e resultados compactos; trilho de produtos rolável e dock fixo.
- **Animações/transições:** palavra ROTTAVA entra em sequência, aura acompanha o ponteiro, consulta e resultados trocam por presença/layout; tudo é desativado ou simplificado com `prefers-reduced-motion`.
- **Permissões:** pública.
- **Dependências de backend:** catálogo via banco quando configurado.
- **Integrações externas futuras:** modelo de linguagem via AI SDK/Gateway para interpretação aberta, preservando as mesmas ferramentas de catálogo e carrinho.
- **Pendências:** fornecer credencial e modelo homologados para ativar geração por IA; a versão atual usa busca guiada determinística sobre o catálogo e não inventa produtos, preços ou estoque. Substituir imagens de demonstração quando houver acervo oficial.
