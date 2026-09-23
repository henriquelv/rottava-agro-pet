# C06 Endereços

**Rota proposta:** `/minha-conta/enderecos`  
**Acesso:** Cliente  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Cadastrar locais de entrega com precisão suficiente para cotação e despacho.

## Composição e hierarquia
Lista de endereços; formulário rua, número, complemento, bairro, cidade, UF, CEP, referência e destinatário; mapa para conferir ponto; endereço principal.

## Ações e navegação
Adicionar, editar, arquivar e selecionar; geocodificar; corrigir pino; retornar ao checkout com endereço selecionado.

## Regras e validações
Cidade/UF e área de cobertura precisam ser verificadas no servidor; CEP sozinho não determina ponto de entrega; alteração invalida cotação; excluir não apaga snapshot de pedidos.

## Estados e exceções
Endereço não localizado: correção manual; fora de área: retirada; mapa indisponível: suporte e validação operacional sem frete inventado.

## Dados e integrações
GET/POST/PATCH /me/addresses; geocodificação; motor de frete. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, usar coluna única, foco visível e botões com rótulos; manter o contexto ao voltar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Endereço editado exige nova cotação.
- latitude/longitude não substituem endereço legível.
- dados de outro cliente são inacessíveis.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
