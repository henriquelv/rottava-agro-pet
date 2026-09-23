# M06 Regras de frete e cobertura

**Rota proposta:** `/admin/frete`  
**Acesso:** Gestor  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Configurar a lógica escolhida pelo cliente e simular antes de ativar.

## Composição e hierarquia
Origem da loja; área atendida; método por bairro, distância ou faixa; tabela de valores; mínimo, gratuidade e restrições opcionais; horários; simulador de endereço/carrinho; versão ativa.

## Ações e navegação
Criar rascunho; simular; conferir área; publicar versão; desativar regra futura; consultar histórico.

## Regras e validações
Método, valores e limites estão pendentes; não ativar sem cobertura válida e cálculo determinístico; regra nova vale para novas cotações; pedido confirmado mantém frete contratado.

## Estados e exceções
Endereço ambíguo; geocodificação indisponível; bairro sem regra; sobreposição de regras; configuração incompleta: não publicar.

## Dados e integrações
GET/PATCH /admin/shipping-rules; POST /shipping/simulate; POST /admin/shipping-rules/:id/publish. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, priorizar tarefa atual, botões grandes e lista em vez de tabela; mapa é complementar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Simulação e checkout usam mesmo motor.
- cobertura desconhecida não equivale a gratuita.
- versão fica gravada na cotação.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
