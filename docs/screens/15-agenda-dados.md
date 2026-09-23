# Agenda e dados da conta

- **Rotas:** `/agendar`, `/minha-conta/agendamentos`, `/minha-conta/dados`.
- **Objetivo:** encaminhar solicitação de horário e exibir identidade/segurança da conta.
- **Público/perfil:** usuário autenticado.
- **Componentes usados:** `AccountNav`, `SectionTitle`, `ConfigNotice`, `UserRow`.
- **Dados necessários:** sessão; no futuro serviços, duração e capacidade.
- **Ações possíveis:** abrir atendimento, consultar nome/e-mail e sair pela navegação.
- **Regras:** nenhum horário é prometido antes da validação de capacidade.
- **Estados:** configuração pendente para agenda; success para dados; anônimo é redirecionado.
- **Desktop:** navegação lateral e conteúdo focado.
- **Mobile:** fluxo empilhado e CTA largo.
- **Animações/transições:** transição entre páginas e feedback de controles.
- **Permissões:** autenticada.
- **Dependências de backend:** sessão; agenda ainda não conectada.
- **Integrações externas futuras:** calendário, WhatsApp e notificações.
- **Pendências:** serviços, capacidade e política de cancelamento.
