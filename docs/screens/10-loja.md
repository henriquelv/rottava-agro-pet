# Loja

- **Rota:** `/loja`
- **Objetivo:** publicar endereço, horário e contato somente quando oficiais.
- **Público/perfil:** público.
- **Componentes usados:** `PageHero`, grade de informações ou `EmptyState`.
- **Dados necessários:** `STORE_ADDRESS`, `STORE_HOURS`, `STORE_PHONE`, cidade e estado.
- **Ações possíveis:** consultar dados ou abrir atendimento.
- **Regras:** valores ausentes não são substituídos por ficção.
- **Estados:** empty/configuração pendente ou success com informações oficiais; erros seguem o servidor.
- **Desktop:** dois blocos informativos equilibrados.
- **Mobile:** blocos empilhados.
- **Animações/transições:** transição global e feedback de links.
- **Permissões:** pública.
- **Dependências de backend:** variáveis de ambiente.
- **Integrações externas futuras:** mapa e rota.
- **Pendências:** dados oficiais e credencial de mapas.
