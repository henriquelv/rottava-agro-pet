# P05 Carrinho

**Rota proposta:** `/carrinho`  
**Acesso:** Visitante e cliente  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Revisar produtos e estimativa do total antes da identificação e entrega.

## Composição e hierarquia
Itens com imagem, variante, valor unitário e quantidade; remover; subtotal; seletor preliminar entrega/retirada; consulta de frete; total estimado; Finalizar compra e Continuar no WhatsApp.

## Ações e navegação
Alterar quantidade recalcula no servidor; remover permite desfazer enquanto não confirmado checkout; Finalizar leva a A01 ou P06; WhatsApp transfere carrinho por token, mantendo identificador central.

## Regras e validações
Carrinho não reserva estoque; total definitivo exige cotação válida; sem endereço completo não mostrar frete como zero; mescla após login soma itens iguais respeitando limites e pede revisão de conflitos.

## Estados e exceções
Vazio: link catálogo; item esgotado: bloquear conclusão e permitir remover; preço desatualizado: destacar diferença; falha ao salvar: desfazer alteração otimista.

## Dados e integrações
GET/PATCH /carts/:id; POST /carts/merge; POST /shipping/quotes; versão do carrinho para detectar edição simultânea. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, usar coluna única, foco visível e botões com rótulos; manter o contexto ao voltar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Total não depende de valores enviados pelo navegador.
- usuário visualiza mudanças de preço.
- retomar no outro canal não duplica carrinho ou pedido.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
