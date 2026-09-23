# Padrões de interação

## Navegação

Cabeçalho com logo, busca e conta; dock com Início, Produtos, Carrinho, Serviços e Conta. Badge do carrinho mostra quantidade agregada, não valor. No mobile, espaço inferior reservado para dock; em checkout e pagamento a ação principal ocupa área dedicada sem concorrência visual. Chat abre em painel no desktop ou tela cheia no celular, preservando estado.

## Formulários e feedback

Validar campos junto ao erro e resumo no topo quando necessário. Não apagar dados por falha de rede. Mostrar carregamento na ação acionada; não bloquear toda a página por atualização de imagem. Mudança de preço, endereço ou variante recalcula o resumo antes da confirmação. Mensagens de sucesso refletem persistência do servidor, não apenas clique.

## Estados compartilhados

| Estado | Apresentação | Ação possível |
|---|---|---|
| Carregando | Esqueleto ou indicador localizado | Navegação permanece quando segura |
| Vazio | Explicação contextual | Catálogo, criar endereço/pet ou limpar filtros |
| Falha recuperável | Mensagem clara e dados preservados | Tentar novamente |
| Dado desatualizado | Última atualização e contexto | Atualizar, revisar preço ou pedir ajuda |
| Sem permissão | Mensagem sem revelar dados | Entrar ou voltar |
| Operação pendente | Protocolo e status | Consultar resultado; não duplicar |

## Mobile e desktop

Home: vitrine dupla no desktop e sequência editorial seguida de cards no celular. Produto: duas colunas no desktop e compra próxima ao preço no celular. Checkout: resumo lateral no desktop e expansível no mobile. Equipe: tabela com filtros no desktop e tarefas priorizadas no mobile. Entregador: mobile primeiro, instruções curtas e confirmação deliberada em operações sensíveis.

## Textos operacionais sugeridos

Pedido recebido. Aguarde a confirmação da loja. Pagamento aguardando confirmação. Valor a pagar na retirada. Valor a pagar na entrega, quando esse modo for aprovado. Última localização recebida às HH:mm. Não foi possível confirmar o estoque; fale com a loja. Seu horário ainda está em análise. São textos de interface propostos, sujeitos à revisão comercial.
