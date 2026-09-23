# Identidade e proteção das operações

Conta com senha é requisito confirmado. Proposta: e-mail como login, telefone verificado para atendimento e vínculo de canal. Se provedor de autenticação for usado, guardar referência auth_subject na aplicação. Se autenticação for própria, projeto deve selecionar hash de senha adequado e política de proteção com revisão técnica; nunca senha em texto, reversível ou log.

## Sessões

Sessões com expiração, revogação e transporte seguro; proteção contra CSRF quando cookies forem usados; retorno pós-login apenas para rotas internas; limitar tentativas; redefinição com token único e expiração; reautenticar ao mudar contato ou senha. Equipe tem concessão explícita de função e proteção adicional a definir, especialmente gestão e financeiro.

## Acesso a dados

Toda consulta de pedidos, endereços, pets, conversas e entrega filtra por identidade autorizada. IDs opacos não substituem autorização. URLs de anexos privadas e temporárias. Chaves do banco legado, pagamentos, mapas restritos e WhatsApp nunca entram no prompt ou código público. Logs não guardam senha, cartão, tokens nem payload integral desnecessário.

## Chat e conteúdo externo

Descrição de produto, mensagens e anexos são dados não confiáveis, nunca instruções para ampliar permissão. Ferramentas têm schemas, limites, escopos e logs. Consultas são parametrizadas e apenas leitura de views permitidas. Ações de pedido exigem estado/versão atuais e confirmação. Texto gerado pelo bot não constitui confirmação de pagamento, estoque ou agendamento sem retorno da ferramenta.

## Arquivos e privacidade operacional

Validar tipo, tamanho e conteúdo dos uploads; servir de origem controlada; sanitizar conteúdo editorial. Definir retenção para mensagens, posições, anexos e auditoria antes da produção. Entregador recebe só contato/endereço das tarefas ativas. Não incluir segredos na documentação do repositório. Políticas legais e de retenção serão aprovadas pelo responsável da loja, com apoio apropriado quando necessário.
