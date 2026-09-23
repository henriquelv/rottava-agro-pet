# Autenticação

- **Rotas:** `/entrar`, `/cadastro`, `/recuperar-senha`
- **Objetivo:** iniciar sessão, criar conta ou orientar recuperação.
- **Público/perfil:** visitante.
- **Componentes usados:** `AuthForm`, painel editorial e blocos de contas demo quando habilitado.
- **Dados necessários:** nome (cadastro), e-mail, senha e retorno seguro.
- **Ações possíveis:** autenticar, cadastrar, navegar entre modos e usar contas de teste.
- **Regras:** validação Zod no servidor; senha com hash; cookie HTTP-only; retorno é limitado a rota interna; recuperação não revela existência de conta.
- **Estados:** idle, submitting, erro de validação/credencial, success com redirecionamento.
- **Desktop:** composição dividida com formulário focado.
- **Mobile:** painel editorial reduzido e formulário em coluna única.
- **Animações/transições:** transição de rota e feedback de estado sem animação contínua.
- **Permissões:** pública; usuário autenticado pode sair pelo menu da conta.
- **Dependências de backend:** APIs `/api/auth/login`, `/register` e `/logout`; banco em produção.
- **Integrações externas futuras:** provedor transacional para recuperação.
- **Pendências:** envio real de recuperação de senha.
