# Módulos administrativos configuráveis

- **Rotas:** `/admin/catalogo`, `/frete`, `/entregas`, `/agenda`, `/servicos`, `/atendimento`, `/clientes`, `/financeiro`, `/conteudo`, `/equipe`, `/configuracoes`.
- **Objetivo:** manter a arquitetura de navegação e comunicar com precisão o que ainda depende da operação.
- **Público/perfil:** perfis administrativos; itens de menu são filtrados por função.
- **Componentes usados:** `AdminShell`, `AdminTitle`, `ConfigNotice`, `AdminReadiness`.
- **Dados necessários:** flags de integração; não há dados fictícios nesses módulos.
- **Ações possíveis:** navegar entre módulos e consultar prontidão.
- **Regras:** nenhuma tela finge possuir CRUD ou integração não implementada.
- **Estados:** configuração pendente e acesso negado; não há success operacional ainda.
- **Desktop:** shell com sidebar.
- **Mobile:** shell responsivo.
- **Animações/transições:** transição de rota e estados de foco.
- **Permissões:** RBAC aplicado no roteador e menu.
- **Dependências de backend:** variam por módulo.
- **Integrações externas futuras:** as cinco integrações exibidas em prontidão.
- **Pendências:** CRUDs, auditoria e regras comerciais de cada domínio.
