# Regras de negócio

| ID | Regra | Efeito |
|---|---|---|
| RN01 | Preços públicos; valores definitivos calculados no backend | Não confiar em total do navegador ou do modelo |
| RN02 | Compra exige variante e unidade inequívocas | Peso/sabor/tamanho pertencem ao SKU |
| RN03 | Carrinho não reserva estoque | Disponibilidade é revalidada ao confirmar |
| RN04 | Venda física e digital devem compartilhar reserva ou conferência | Leitura do saldo isolada não garante última unidade |
| RN05 | Cotação pertence a carrinho, endereço e versão da regra | Qualquer mudança exige recalcular |
| RN06 | Frete desconhecido não é frete grátis | Retirada ou revisão quando não calculável |
| RN07 | Um pedido central por confirmação | Idempotência em site, bot e operação |
| RN08 | Pagamento é separado de separação/entrega | Não quitar por concluir entrega |
| RN09 | Presencial em entrega e retirada é permitido no escopo | Local/momento exato da cobrança precisa de D04 |
| RN10 | Online só é aprovado com confirmação validada | Redirecionamento do browser não comprova pagamento |
| RN11 | Substituição e diferença de preço exigem aceite | Registrar proposta e resposta |
| RN12 | Bot usa leitura limitada do banco existente | Sem SQL livre nem credencial exposta |
| RN13 | Bot escreve apenas por comandos de negócio | Mesmas validações do site |
| RN14 | Histórico depende de identidade verificada | WhatsApp não revela conta por nome informado |
| RN15 | Botões têm contexto e validade | Clique antigo exige revisar estado atual |
| RN16 | Humano ativo pausa bot | Evitar respostas concorrentes |
| RN17 | Rastreamento é restrito à entrega ativa | Nenhuma exposição de outras paradas |
| RN18 | Agenda controla capacidade e intervalo atomicamente | Duas confirmações não ocupam a mesma capacidade |
| RN19 | Remarcar protege horário anterior até sucesso | Sem perda de vaga por falha intermediária |
| RN20 | Políticas e valores pendentes não são inventados | Módulo fica em configuração/revisão |
| RN21 | Alterações preservam snapshots e auditoria | Históricos não mudam com cadastro atual |
| RN22 | Processamento de eventos aceita repetição com mesmo resultado | Webhooks/offline não duplicam efeitos |
| RN23 | Logout e revogação encerram acesso | Links não substituem autorização por proprietário |
| RN24 | Serviço e produto têm fluxos separados inicialmente | Cancelar um não cancela o outro |

## Motor de frete sem tabela definida

Entradas: endereço normalizado/ponto confirmado, origem da loja, carrinho, modalidade, horário e versão da regra. Saída: atendido ou não, valor em centavos quando calculável, prazo/janela quando configurado, rule_version_id, quote_id, expiração e motivos. Estratégias suportáveis: bairro, distância de rota ou faixas de distância. A estratégia ativa é única ou tem precedência explicitamente configurada; não escolher por suposição.

Quando for distância: fonte de rota e ponto de origem são obrigatórios; não usar distância em linha reta como equivalente sem decisão explícita. Gratuidade opcional exige threshold, base de cálculo e cobertura; não elimina restrição geográfica. Peso/capacidade só afeta cálculo se o cliente fornecer regra. Alteração de endereço invalida preço. Pedido já confirmado preserva frete contratado, exceto mudança consentida.
