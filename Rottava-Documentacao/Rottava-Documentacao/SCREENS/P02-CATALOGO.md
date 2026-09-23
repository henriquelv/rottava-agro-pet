# P02 Catálogo e busca

**Rota proposta:** `/produtos?busca=&categoria=&marca=`  
**Acesso:** Visitante e cliente  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Localizar e comparar produtos por nome, categoria, marca e características disponíveis.

## Composição e hierarquia
Busca visível; título e quantidade de resultados; filtros laterais no desktop e painel no celular; ordenação; grade de cards com imagem, nome, variante, preço e disponibilidade; paginação; filtros ativos removíveis.

## Ações e navegação
Buscar, filtrar e ordenar atualizam URL; abrir card leva a P03; Adicionar exige variante inequívoca, caso contrário abre seletor; limpar filtros preserva termo de busca; voltar restaura posição.

## Regras e validações
Filtros propostos: espécie, categoria, marca, faixa de preço, peso e disponibilidade, apenas quando houver dados confiáveis; não misturar preço de embalagem com preço por kg; busca nunca executa SQL recebido do usuário.

## Estados e exceções
Sem resultado: sugerir remover filtros e conversar; sem estoque: card informativo sem adicionar; falha de página: tentar novamente sem perder filtros; imagem ausente: placeholder Rottava.

## Dados e integrações
GET /catalog/products com filtros permitidos, cursor e limite; leitura mediada do catálogo existente. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, usar coluna única, foco visível e botões com rótulos; manter o contexto ao voltar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Filtros retornam os mesmos resultados após compartilhar URL.
- navegação de retorno preserva pesquisa.
- produto indisponível não entra no carrinho.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
