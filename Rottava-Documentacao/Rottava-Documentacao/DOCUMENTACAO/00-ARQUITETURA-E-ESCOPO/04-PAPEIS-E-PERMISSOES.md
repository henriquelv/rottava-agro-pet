# Papéis e permissões

| Capacidade | Visitante | Cliente | Operador | Atendente | Serviços | Entregador | Financeiro | Gestor |
|---|---|---|---|---|---|---|---|---|
| Ver catálogo público | Sim | Sim | Sim | Sim | Sim | Sim | Sim | Sim |
| Ver pedido | Não | Próprio | Operação | Atendimento | Não | Atribuído e mínimo | Financeiro | Sim |
| Criar carrinho | Temporário | Próprio | Assistido | Assistido | Não | Não | Não | Assistido |
| Confirmar compra pelo cliente | Não | Própria | Exige confirmação do cliente | Exige confirmação do cliente | Não | Não | Não | Exige confirmação do cliente |
| Separar pedido | Não | Não | Sim | Não | Não | Não | Não | Sim |
| Agendar serviço | Não | Próprio | Se também recepção | Assistido | Sim | Não | Não | Sim |
| Localizar entregador | Não | Entrega própria ativa | Se despachante | Resumo | Não | Própria posição | Não | Sim |
| Informar cobrança presencial | Não | Não | Se caixa | Não | Se caixa | Na sua entrega | Sim | Sim |
| Conciliar ou estornar | Não | Não | Não | Não | Não | Não | Sim | Sim |
| Configurar integração e equipe | Não | Não | Não | Não | Não | Não | Não | Permissão específica |

Papéis podem ser combinados explicitamente para a equipe pequena. Recepção e despachante são conjuntos de permissões, não necessariamente pessoas adicionais. Gestor técnico não recebe acesso financeiro apenas por manter conectores. Endpoint, campo e evento devem validar permissão no servidor; esconder botão é apenas apresentação.

O bot não possui “acesso de administrador”. Cada ferramenta recebe a identidade verificada, o canal, a conversa e o escopo. Para visitante, permite catálogo e carrinho temporário; pedidos pessoais exigem vínculo de conta. Logs de ações guardam ator humano ou bot e usuário beneficiário. Nunca confiar em customer_id enviado livremente pelo modelo.
