# Portal do entregador

- **Rotas:** `/entregador`, `/entregador/[id]`.
- **Objetivo:** mostrar entregas atribuídas e, futuramente, uma parada ativa com privacidade.
- **Público/perfil:** entregador e gestor.
- **Componentes usados:** shell do motorista, `Status`, `EmptyState` e aviso de privacidade.
- **Dados necessários:** tarefas atribuídas; hoje nenhuma fonte real está conectada.
- **Ações possíveis:** voltar à loja; não inicia localização sem tarefa/permissão.
- **Regras:** não simula posição; cliente nunca vê outras paradas; geolocalização depende do dispositivo.
- **Estados:** sem rota atribuída, localização não iniciada e acesso negado.
- **Desktop:** painel central utilitário.
- **Mobile:** layout orientado ao uso em campo.
- **Animações/transições:** transição de rota e feedback de controles.
- **Permissões:** `driver` ou `manager`.
- **Dependências de backend:** despacho e entregas ainda não conectados.
- **Integrações externas futuras:** mapas, geolocalização e notificações.
- **Pendências:** modelo de tarefa, cobertura, consentimento e retenção de localização.
