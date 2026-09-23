# Sequência de implementação proposta

O escopo completo inclui bot nos dois canais, entrega com mapa e banho e tosa. As etapas abaixo são ordem de construção, não redução do que foi solicitado. Não há estimativa de prazo/custo sem validar integração e volumes.

| Etapa | Resultado | Dependências | Saída verificável |
|---|---|---|---|
| 0 Descoberta | Contrato do legado, regras comerciais e referências aprovadas | D01–D18 conforme módulo | Mapeamento e decisões registradas |
| 1 Fundação | Autenticação, papéis, modelo lógico e catálogo de teste | D01, D11, D16, D17 | Contas isoladas e dados mapeados |
| 2 Loja e compra | P01–P08, conta, motor de frete e pagamento | D02–D06, D12, D15 | Compra em homologação com falhas previstas |
| 3 Operação | Separação, retirada, caixa e conciliação | Etapa 2 | Pedido operado até conclusão |
| 4 Entrega | Despacho, entregador, mapa e ocorrências | D09, D13, etapa 3 | Rota real de teste com sinal e sem sinal |
| 5 Serviços | Pets, agenda e execução de banho e tosa | D07, D08 | Reserva concorrente controlada e serviço completo |
| 6 Conversas | Chat web, WhatsApp, botões e humano | Serviços de negócio estáveis e D10 | Mesmo pedido continuado entre canais |
| 7 Homologação | Acessibilidade, recuperação, desempenho e treinamento | Todas | Critérios de aceite e plano de operação aprovados |

Chat pode ser prototipado cedo com dados fictícios, mas a capacidade de comprar depende dos comandos reais do checkout. Interface do entregador pode ser desenhada antes de escolher tecnologia de localização; não anunciar continuidade em segundo plano sem teste.

## Entrega por módulo

Cada módulo deve atualizar seu SCREENS, contrato, estado, teste e fonte de decisão. Implementar uma fatia ponta a ponta com dados de teste antes de expandir telas. Não criar endpoints que apenas simulem sucesso sem persistência e autorização. Publicação será tarefa futura, quando solicitada e validada.
