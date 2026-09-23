# Mapa e inventário das telas

46 telas funcionais propostas. Estados de uma mesma tela ficam no respectivo arquivo; variação por categoria ou marca reutiliza P02. Hero, card, dock e slider são componentes, não páginas independentes.

| ID | Tela | Rota proposta | Arquivo |
|---|---|---|---|
| P01 | Página inicial | `/` | [HOME](../../SCREENS/P01-HOME.md) |
| P02 | Catálogo e busca | `/produtos?busca=&categoria=&marca=` | [CATALOGO](../../SCREENS/P02-CATALOGO.md) |
| P03 | Detalhe do produto | `/produto/:slug` | [PRODUTO](../../SCREENS/P03-PRODUTO.md) |
| P04 | Apresentação de banho e tosa | `/banho-e-tosa` | [BANHO-E-TOSA](../../SCREENS/P04-BANHO-E-TOSA.md) |
| P05 | Carrinho | `/carrinho` | [CARRINHO](../../SCREENS/P05-CARRINHO.md) |
| P06 | Finalização da compra | `/checkout` | [CHECKOUT](../../SCREENS/P06-CHECKOUT.md) |
| P07 | Pagamento do pedido | `/pedido/:id/pagamento` | [PAGAMENTO](../../SCREENS/P07-PAGAMENTO.md) |
| P08 | Confirmação do pedido | `/pedido/:id/confirmacao` | [CONFIRMACAO](../../SCREENS/P08-CONFIRMACAO.md) |
| P09 | Chat de compra e atendimento | `/atendimento` | [CHAT](../../SCREENS/P09-CHAT.md) |
| P10 | Loja e ajuda | `/loja` | [LOJA-E-AJUDA](../../SCREENS/P10-LOJA-E-AJUDA.md) |
| P11 | Informações e políticas | `/informacoes/:slug` | [POLITICAS](../../SCREENS/P11-POLITICAS.md) |
| A01 | Entrar | `/entrar` | [LOGIN](../../SCREENS/A01-LOGIN.md) |
| A02 | Criar conta | `/cadastro` | [CADASTRO](../../SCREENS/A02-CADASTRO.md) |
| A03 | Recuperar acesso | `/recuperar-senha` | [RECUPERAR-SENHA](../../SCREENS/A03-RECUPERAR-SENHA.md) |
| C01 | Visão geral da conta | `/minha-conta` | [MINHA-CONTA](../../SCREENS/C01-MINHA-CONTA.md) |
| C02 | Histórico de pedidos | `/minha-conta/pedidos` | [MEUS-PEDIDOS](../../SCREENS/C02-MEUS-PEDIDOS.md) |
| C03 | Detalhe do pedido | `/minha-conta/pedidos/:id` | [DETALHE-PEDIDO](../../SCREENS/C03-DETALHE-PEDIDO.md) |
| C04 | Acompanhar entrega | `/minha-conta/pedidos/:id/entrega` | [RASTREAMENTO](../../SCREENS/C04-RASTREAMENTO.md) |
| C05 | Dados e segurança | `/minha-conta/dados` | [DADOS-DA-CONTA](../../SCREENS/C05-DADOS-DA-CONTA.md) |
| C06 | Endereços | `/minha-conta/enderecos` | [ENDERECOS](../../SCREENS/C06-ENDERECOS.md) |
| C07 | Pets do cliente | `/minha-conta/pets` | [MEUS-PETS](../../SCREENS/C07-MEUS-PETS.md) |
| C08 | Agendar banho e tosa | `/agendar` | [AGENDAR](../../SCREENS/C08-AGENDAR.md) |
| C09 | Lista de agendamentos | `/minha-conta/agendamentos` | [MEUS-AGENDAMENTOS](../../SCREENS/C09-MEUS-AGENDAMENTOS.md) |
| C10 | Detalhe do agendamento | `/minha-conta/agendamentos/:id` | [DETALHE-AGENDAMENTO](../../SCREENS/C10-DETALHE-AGENDAMENTO.md) |
| C11 | Cancelar ou relatar problema | `/minha-conta/pedidos/:id/solicitacao` | [SOLICITACOES](../../SCREENS/C11-SOLICITACOES.md) |
| M01 | Visão geral operacional | `/admin` | [PAINEL](../../SCREENS/M01-PAINEL.md) |
| M02 | Fila de pedidos | `/admin/pedidos` | [GESTAO-PEDIDOS](../../SCREENS/M02-GESTAO-PEDIDOS.md) |
| M03 | Operação de um pedido | `/admin/pedidos/:id` | [OPERAR-PEDIDO](../../SCREENS/M03-OPERAR-PEDIDO.md) |
| M04 | Catálogo integrado | `/admin/catalogo` | [CATALOGO-ADMIN](../../SCREENS/M04-CATALOGO-ADMIN.md) |
| M05 | Conteúdo digital do produto | `/admin/catalogo/:id` | [EDITAR-PRODUTO](../../SCREENS/M05-EDITAR-PRODUTO.md) |
| M06 | Regras de frete e cobertura | `/admin/frete` | [FRETE](../../SCREENS/M06-FRETE.md) |
| M07 | Despacho de entregas | `/admin/entregas` | [DESPACHO](../../SCREENS/M07-DESPACHO.md) |
| M08 | Monitoramento de entregas | `/admin/entregas/:id` | [MONITORAMENTO](../../SCREENS/M08-MONITORAMENTO.md) |
| M09 | Agenda de banho e tosa | `/admin/agenda` | [AGENDA](../../SCREENS/M09-AGENDA.md) |
| M10 | Execução do banho e tosa | `/admin/agenda/:id` | [ATENDIMENTO-PET](../../SCREENS/M10-ATENDIMENTO-PET.md) |
| M11 | Serviços e capacidade | `/admin/servicos` | [SERVICOS](../../SCREENS/M11-SERVICOS.md) |
| M12 | Central de conversas | `/admin/atendimento` | [ATENDIMENTO](../../SCREENS/M12-ATENDIMENTO.md) |
| M13 | Clientes e contexto de atendimento | `/admin/clientes/:id` | [CLIENTES](../../SCREENS/M13-CLIENTES.md) |
| M14 | Pagamentos e conciliação | `/admin/financeiro` | [FINANCEIRO](../../SCREENS/M14-FINANCEIRO.md) |
| M15 | Integrações e reconciliação | `/admin/integracoes` | [INTEGRACOES](../../SCREENS/M15-INTEGRACOES.md) |
| M16 | Conteúdo e identidade visual | `/admin/conteudo` | [CONTEUDO](../../SCREENS/M16-CONTEUDO.md) |
| M17 | Equipe e permissões | `/admin/equipe` | [EQUIPE](../../SCREENS/M17-EQUIPE.md) |
| M18 | Configurações da operação | `/admin/configuracoes` | [CONFIGURACOES](../../SCREENS/M18-CONFIGURACOES.md) |
| E01 | Entregas do motorista | `/entregador` | [MINHAS-ENTREGAS](../../SCREENS/E01-MINHAS-ENTREGAS.md) |
| E02 | Rota e parada ativa | `/entregador/rotas/:id` | [ROTA](../../SCREENS/E02-ROTA.md) |
| E03 | Comprovar entrega e cobrança | `/entregador/entregas/:id/concluir` | [CONCLUIR-ENTREGA](../../SCREENS/E03-CONCLUIR-ENTREGA.md) |

## Navegação principal

O dock proposto tem Início, Produtos, Carrinho, Serviços e Conta. A busca permanece no cabeçalho. Atendimento aparece como ação contextual e no menu, sem sobrepor o botão de compra. No desktop, categorias podem ter navegação textual adicional. Rotas internas de equipe não aparecem na loja pública.

## Retornos e contexto

Login retorna à rota solicitada, com destinos internos permitidos. Editar endereço retorna ao checkout e invalida a cotação. Voltar do produto restaura filtros/posição do catálogo. Mudar para WhatsApp transfere contexto por token temporário; o usuário precisa confirmar vínculo para acesso a dados pessoais. Deep links para pedido exigem autenticação e propriedade.

## Convenção de telas

P = pública/compra; A = autenticação; C = conta; M = gestão; E = entregador. Fluxos em FLUXOS usam os mesmos IDs. O inventário é a fonte para rotas e nomes; não criar tela duplicada a partir do nome de um componente visual.
