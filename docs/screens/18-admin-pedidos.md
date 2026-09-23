# Administração de pedidos

- **Rotas:** `/admin/pedidos`, `/admin/pedidos/[id]`.
- **Objetivo:** exibir a fila operacional; a rota de detalhe existe, mas ainda usa o aviso genérico do módulo.
- **Público/perfil:** operador, atendimento, financeiro e gestor conforme navegação/RBAC geral.
- **Componentes usados:** `AdminShell`, `AdminTitle`, tabela, `Status`, `ConfigNotice` no detalhe.
- **Dados necessários:** pedidos e conta do cliente.
- **Ações possíveis:** abrir o detalhe da linha.
- **Regras:** estados financeiro e operacional são separados; a demo só aparece quando ativada.
- **Estados:** empty sem pedidos, demo controlado, success do banco e aviso no detalhe.
- **Desktop:** tabela de cinco colunas.
- **Mobile:** tabela refluída pelo CSS administrativo.
- **Animações/transições:** transição de rota e feedback das linhas.
- **Permissões:** perfis administrativos aceitos pelo roteador.
- **Dependências de backend:** PostgreSQL.
- **Integrações externas futuras:** pagamento, estoque e entrega.
- **Pendências:** implementar ações de detalhe/alteração com auditoria.
