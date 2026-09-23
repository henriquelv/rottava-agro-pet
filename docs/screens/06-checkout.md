# Checkout

- **Rota:** `/checkout`
- **Objetivo:** coletar forma de atendimento e criar um pedido idempotente.
- **Público/perfil:** cliente autenticado.
- **Componentes usados:** `CheckoutView`, resumo do carrinho e formulário.
- **Dados necessários:** sessão, carrinho, modo de entrega e pagamento habilitado.
- **Ações possíveis:** escolher retirada/entrega disponível, forma de pagamento e confirmar.
- **Regras:** visitante é redirecionado ao login; chave idempotente evita duplicidade; servidor recalcula itens; demo não cobra.
- **Estados:** vazio bloqueia envio; submitting desabilita botão; error preserva carrinho; success limpa carrinho e redireciona à confirmação.
- **Desktop:** formulário e resumo lado a lado.
- **Mobile:** etapas empilhadas e CTA largo.
- **Animações/transições:** seleção visual e transição de rota; respeita reduced motion.
- **Permissões:** sessão de cliente ou qualquer conta autenticada para teste.
- **Dependências de backend:** `POST /api/orders`, sessão e banco em produção.
- **Integrações externas futuras:** gateway, frete e mapas.
- **Pendências:** credenciais, cobertura e políticas comerciais.
