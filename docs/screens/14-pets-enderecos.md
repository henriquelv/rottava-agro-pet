# Pets e endereços

- **Rotas:** `/minha-conta/pets`, `/minha-conta/enderecos`.
- **Objetivo:** preparar dados reutilizáveis para serviços e entrega.
- **Público/perfil:** cliente autenticado.
- **Componentes usados:** `AccountNav`, `SectionTitle`, `ConfigNotice`, cards de pets existentes.
- **Dados necessários:** pets da conta; cobertura e regra de frete para endereços.
- **Ações possíveis:** hoje apenas consultar pets existentes e entender a pendência.
- **Regras:** pets não são usados para diagnóstico; cadastro fica bloqueado até a operação estar configurada.
- **Estados:** empty sem registro, configuração pendente, success para pets existentes; erro segue consulta protegida.
- **Desktop:** conteúdo ao lado da navegação.
- **Mobile:** cards e avisos empilhados.
- **Animações/transições:** transição de rota e feedback de navegação.
- **Permissões:** autenticada.
- **Dependências de backend:** tabela `pets`; módulo de cobertura futuro.
- **Integrações externas futuras:** serviços, mapas e frete.
- **Pendências:** regras de serviço, cobertura e formulários de edição.
