# Inventário de telas

Este diretório documenta as interfaces que existem no código da aplicação. “Parcial” significa que a tela é funcional, mas aguarda uma definição comercial ou integração externa explicitamente indicada no próprio fluxo.

| # | Tela | Rota | Status | Documento |
|---|---|---|---|---|
| 01 | Home | `/` | Funcional | [01-home.md](01-home.md) |
| 02 | Catálogo | `/produtos` | Funcional | [02-catalogo.md](02-catalogo.md) |
| 03 | Produto | `/produto/[slug]` | Funcional | [03-produto.md](03-produto.md) |
| 04 | Favoritos | `/favoritos` | Funcional | [04-favoritos.md](04-favoritos.md) |
| 05 | Carrinho | `/carrinho` | Funcional | [05-carrinho.md](05-carrinho.md) |
| 06 | Checkout | `/checkout` | Funcional/condicional | [06-checkout.md](06-checkout.md) |
| 07 | Banho e tosa | `/banho-e-tosa` | Parcial | [07-banho-e-tosa.md](07-banho-e-tosa.md) |
| 08 | Atendimento | `/atendimento` | Funcional em demo | [08-atendimento.md](08-atendimento.md) |
| 09 | Autenticação | `/entrar`, `/cadastro`, `/recuperar-senha` | Funcional/condicional | [09-autenticacao.md](09-autenticacao.md) |
| 10 | Loja | `/loja` | Condicional | [10-loja.md](10-loja.md) |
| 11 | Políticas | `/informacoes/[slug]` | Parcial | [11-politicas.md](11-politicas.md) |
| 12 | Conta | `/minha-conta` | Funcional | [12-conta.md](12-conta.md) |
| 13 | Pedidos da conta | `/minha-conta/pedidos`, `/minha-conta/pedidos/[id]` | Funcional com banco | [13-pedidos-conta.md](13-pedidos-conta.md) |
| 14 | Pets e endereços | `/minha-conta/pets`, `/minha-conta/enderecos` | Parcial | [14-pets-enderecos.md](14-pets-enderecos.md) |
| 15 | Agenda e dados | `/agendar`, `/minha-conta/agendamentos`, `/minha-conta/dados` | Parcial/funcional | [15-agenda-dados.md](15-agenda-dados.md) |
| 16 | Confirmação | `/pedido/[id]/confirmacao` | Funcional | [16-confirmacao.md](16-confirmacao.md) |
| 17 | Admin inicial | `/admin` | Funcional | [17-admin.md](17-admin.md) |
| 18 | Admin pedidos | `/admin/pedidos`, `/admin/pedidos/[id]` | Parcial | [18-admin-pedidos.md](18-admin-pedidos.md) |
| 19 | Admin integrações | `/admin/integracoes` | Funcional | [19-admin-integracoes.md](19-admin-integracoes.md) |
| 20 | Admin módulos | múltiplas rotas `/admin/*` | Parcial | [20-admin-modulos.md](20-admin-modulos.md) |
| 21 | Entregador | `/entregador`, `/entregador/[id]` | Parcial | [21-entregador.md](21-entregador.md) |
| 22 | Acesso e não encontrado | `/sem-permissao`, rota inexistente | Funcional | [22-estados-sistema.md](22-estados-sistema.md) |

## Superfícies compartilhadas

Header reativo, menu, busca global, minicarrinho, dock móvel, rodapé e transição entre páginas vivem no layout global. Busca usa `/api/catalog/search`; carrinho e favoritos persistem no navegador; sessão é lida no servidor. Todas as superfícies respeitam `prefers-reduced-motion`.
