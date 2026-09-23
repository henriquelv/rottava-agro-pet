# Integrações administrativas

- **Rota:** `/admin/integracoes`
- **Objetivo:** apresentar a configuração efetiva, sem declarar conectores simulados como reais.
- **Público/perfil:** perfis administrativos, com foco no gestor.
- **Componentes usados:** `AdminShell`, `AdminTitle`, lista de status.
- **Dados necessários:** flags derivadas das variáveis de ambiente.
- **Ações possíveis:** consultar status; não há edição de segredos pela interface.
- **Regras:** “Ativa” só é exibido quando a configuração correspondente existe.
- **Estados:** configurada ou pendente por conector; acesso negado fora dos perfis.
- **Desktop:** lista operacional alinhada.
- **Mobile:** linhas empilhadas.
- **Animações/transições:** transição global e feedback visual de status.
- **Permissões:** administrativa.
- **Dependências de backend:** ambiente da Vercel.
- **Integrações externas futuras:** banco, legado, pagamento, WhatsApp e mapas.
- **Pendências:** credenciais e testes de homologação.
