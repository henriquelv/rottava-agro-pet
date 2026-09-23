# Home

- **Rota:** `/`
- **Objetivo:** apresentar a marca, levar rapidamente ao catálogo e aos serviços.
- **Público/perfil:** visitante ou cliente autenticado.
- **Componentes usados:** `GlyphPortalHero`, `ProductCard`, `Reveal`, header, busca, minicarrinho e dock móvel.
- **Dados necessários:** produtos publicados por `listProducts`; imagem editorial local; modo demo.
- **Ações possíveis:** navegar ao catálogo, produto, loja, atendimento e banho e tosa; favoritar e adicionar produto.
- **Regras:** dados comerciais demonstrativos só vêm de `demo-catalog.ts`; sem catálogo real é exibido estado vazio.
- **Estados:** loading é o streaming padrão do Next; empty mostra preparação da vitrine; falha de fonte cai no tratamento do servidor; success mostra até seis produtos.
- **Desktop:** portal de scroll em tela ampla, vitrine horizontal e composição editorial assimétrica.
- **Mobile:** portal adaptado, trilho de produtos rolável e dock fixo.
- **Animações/transições:** palavra ROTTAVA abre a imagem com o scroll; header compacta; seções e cards usam movimentos distintos e discretos.
- **Permissões:** pública.
- **Dependências de backend:** catálogo via banco quando configurado.
- **Integrações externas futuras:** catálogo legado e conteúdo aprovado.
- **Pendências:** substituir imagens de demonstração quando houver acervo oficial.
