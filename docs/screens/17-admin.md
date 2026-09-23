# Painel administrativo

- **Rota:** `/admin`
- **Objetivo:** mostrar prioridades operacionais e prontidão das integrações.
- **Público/perfil:** operador, atendimento, serviços, financeiro e gestor.
- **Componentes usados:** `AdminShell`, métricas, `AdminReadiness`.
- **Dados necessários:** contagem de pedidos e flags de integração.
- **Ações possíveis:** navegar aos módulos autorizados pelo menu.
- **Regras:** menu varia por perfil; em demo as métricas são identificáveis como ambiente de teste.
- **Estados:** sem banco usa métricas demo somente em `DEMO_MODE`; success real consulta pedidos; acesso inválido é negado.
- **Desktop:** sidebar operacional e painel de métricas.
- **Mobile:** navegação e cartões refluem em coluna.
- **Animações/transições:** transição global, hover/foco e mudanças discretas.
- **Permissões:** RBAC por função.
- **Dependências de backend:** sessão, banco e variáveis de integrações.
- **Integrações externas futuras:** catálogo, pagamento, WhatsApp e mapas.
- **Pendências:** credenciais e homologações listadas na própria tela.
