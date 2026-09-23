# P11 Informações e políticas

**Rota proposta:** `/informacoes/:slug`  
**Acesso:** Visitante e cliente  
**Situação:** especificação proposta v1 — não implementada.

## Objetivo
Disponibilizar regras comerciais e privacidade aprovadas para a loja.

## Composição e hierarquia
Título, versão e data de atualização; navegação por assunto; conteúdo legível; contato; links para ações relacionadas como solicitar cancelamento.

## Ações e navegação
Escolher entrega, pagamento, retirada, cancelamentos, privacidade ou serviços; acessar C11 para solicitação vinculada ao pedido.

## Regras e validações
Conteúdo jurídico/comercial não é definido por este pacote; textos devem ser fornecidos e revisados antes do lançamento; aceite registra versão quando necessário; preferências de comunicação separadas.

## Estados e exceções
Política não publicada: não inventar texto; revisão nova não altera registro de aceite antigo.

## Dados e integrações
GET /content/policies/:slug; registro de versões e consentimentos quando aplicável. Os caminhos de API são contratos propostos; não representam endpoints existentes já verificados.

## Responsividade e acessibilidade
No celular, usar coluna única, foco visível e botões com rótulos; manter o contexto ao voltar. Campos têm rótulos e erros associados; cor não é o único indicador; operações em andamento impedem reenvio acidental, sem substituir idempotência no servidor.

## Critérios de aceite
- Conteúdo corresponde à versão publicada.
- links de suporte são visíveis.
- não há política automática com prazos não aprovados.

## Documentação relacionada
[Mapa de telas](../DOCUMENTACAO/00-ARQUITETURA-E-ESCOPO/03-MAPA-DE-TELAS.md) · [Regras de negócio](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/04-REGRAS-DE-NEGOCIO.md) · [Estados](../DOCUMENTACAO/04-BANCO-DE-DADOS-E-LOGICA/03-ESTADOS-E-CICLOS.md) · [Pendências](../DOCUMENTACAO/06-PLANEJAMENTO-E-VALIDACAO/01-DECISOES-PENDENTES.md)
