# Rottava Pet Casa e Jardim

Aplicação full-stack do e-commerce da Rottava, construída a partir do pacote funcional em `Rottava-Documentacao/`. O projeto usa Next.js App Router, PostgreSQL e sessões assinadas, com separação entre vitrine pública, conta, administração e entregador.

A interface usa um design system próprio, CSS autoral, Motion para microinterações e uma única família de ícones Phosphor. Não depende de Lucide React nem de kits visuais como shadcn, Material UI ou Bootstrap.

## Rodar localmente

1. Copie `.env.example` para `.env.local` e preencha `DATABASE_URL` e `AUTH_SECRET`.
2. Execute `npm install`.
3. Execute `npm run db:migrate`.
4. Execute `npm run dev`.

Sem banco configurado, a vitrine usa o catálogo versionado importado da planilha da loja. Pagamento, WhatsApp, mapas e legado só são marcados como ativos quando suas variáveis e contratos forem homologados. O agente usa orientação determinística do catálogo como fallback quando a OpenAI não está configurada.

## Modo de demonstração

Defina `DEMO_MODE=true` e `NEXT_PUBLIC_DEMO_MODE=true` para habilitar produtos, pedidos e perfis claramente identificados como dados de teste. Todas as contas usam a senha `Rottava@123`:

| Papel | E-mail |
|---|---|
| Cliente | `cliente@rottava.test` |
| Operador | `operador@rottava.test` |
| Atendente | `atendimento@rottava.test` |
| Serviços | `servicos@rottava.test` |
| Entregador | `entregador@rottava.test` |
| Financeiro | `financeiro@rottava.test` |
| Gestor | `gestor@rottava.test` |

O modo demonstração não cobra, reserva estoque, envia mensagens nem declara integrações externas como ativas.

## Comandos

- `npm run dev`: desenvolvimento
- `npm run build`: build de produção
- `npm run lint`: análise estática
- `npm test`: testes de domínio
- `npm run db:migrate`: aplica o schema versionado

## Segurança e operação

Totais e estados são calculados no servidor; senhas usam bcrypt; sessão fica em cookie `httpOnly`; criação de pedidos usa chave idempotente; permissões são validadas por papel no servidor. Não inclua segredos no repositório.

Veja `docs/IMPLEMENTACAO.md` para a matriz de escopo, pendências comerciais e integrações.
