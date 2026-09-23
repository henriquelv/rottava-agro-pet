# Acesso negado e não encontrado

- **Rotas:** `/sem-permissao` e qualquer rota inexistente (404 do Next).
- **Objetivo:** encerrar navegações inválidas sem revelar dados.
- **Público/perfil:** qualquer usuário.
- **Componentes usados:** `EmptyState`; página 404 nativa da aplicação para rota desconhecida.
- **Dados necessários:** sessão/perfil apenas para o estado de permissão.
- **Ações possíveis:** voltar ao início.
- **Regras:** recursos protegidos não exibem conteúdo antes da autorização.
- **Estados:** acesso negado ou não encontrado.
- **Desktop:** mensagem central em coluna estreita.
- **Mobile:** mesma hierarquia em largura total.
- **Animações/transições:** transição global quando a rota é resolvida pela aplicação.
- **Permissões:** pública como resposta, sem conteúdo protegido.
- **Dependências de backend:** sessão para decisões de autorização.
- **Integrações externas futuras:** nenhuma.
- **Pendências:** uma página 404 de marca pode substituir a fallback sem mudar as regras.
