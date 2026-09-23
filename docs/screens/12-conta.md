# Minha conta

- **Rota:** `/minha-conta`
- **Objetivo:** centralizar pedidos, cuidados e pets do cliente.
- **Público/perfil:** usuário autenticado.
- **Componentes usados:** `AccountNav`, saudação e cards de atalhos.
- **Dados necessários:** sessão e último pedido quando há banco.
- **Ações possíveis:** abrir pedidos, agendamentos, pets, endereços, dados e encerrar sessão.
- **Regras:** consultas são filtradas pelo ID da sessão.
- **Estados:** sem banco mantém atalhos sem inventar registros; success exibe último pedido; acesso anônimo redireciona.
- **Desktop:** navegação lateral e conteúdo.
- **Mobile:** navegação horizontal/compacta e cards empilhados.
- **Animações/transições:** transição de rota e estados de hover/foco.
- **Permissões:** autenticada.
- **Dependências de backend:** sessão e banco para histórico.
- **Integrações externas futuras:** dados consolidados dos canais.
- **Pendências:** nenhuma para o painel base.
