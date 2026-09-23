# Banho e tosa

- **Rota:** `/banho-e-tosa`
- **Objetivo:** explicar a jornada e encaminhar uma solicitação sem prometer capacidade não configurada.
- **Público/perfil:** público.
- **Componentes usados:** hero de serviços, passos, `ConfigNotice`.
- **Dados necessários:** atualmente apenas conteúdo versionado.
- **Ações possíveis:** solicitar horário ou abrir atendimento.
- **Regras:** preços, duração e horários não são inventados.
- **Estados:** conteúdo disponível; aviso representa estado de configuração pendente; erros seguem o servidor.
- **Desktop:** hero editorial e quatro etapas em linha.
- **Mobile:** conteúdo e etapas empilhados.
- **Animações/transições:** transição de página e feedback dos CTAs.
- **Permissões:** pública; agendamento exige login.
- **Dependências de backend:** agenda e serviços ainda não ativados.
- **Integrações externas futuras:** capacidade, agenda e notificações.
- **Pendências:** serviços, preços, duração, recursos e cancelamento aprovados.
