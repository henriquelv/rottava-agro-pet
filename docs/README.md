# Rottava Agro Pet - Documentação

## Índice

1. [Visão Geral](#visão-geral)
2. [Instalação](#instalação)
3. [Configuração](#configuração)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Funcionalidades](#funcionalidades)
6. [API](#api)
7. [Segurança](#segurança)
8. [Testes](#testes)
9. [Deploy](#deploy)
10. [Contribuição](#contribuição)

## Visão Geral

O Rottava Agro Pet é uma plataforma de e-commerce especializada em produtos para agro e pet. A aplicação foi desenvolvida utilizando Next.js, TypeScript, Tailwind CSS e outras tecnologias modernas.

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/rottava-agro-pet.git
cd rottava-agro-pet
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Configuração

### Variáveis de Ambiente

- `NEXT_PUBLIC_API_URL`: URL da API
- `NEXT_PUBLIC_SITE_URL`: URL do site
- `NEXTAUTH_URL`: URL do NextAuth
- `NEXTAUTH_SECRET`: Segredo do NextAuth
- `DATABASE_URL`: URL do banco de dados
- `UPSTASH_REDIS_REST_URL`: URL do Redis
- `UPSTASH_REDIS_REST_TOKEN`: Token do Redis
- `AWS_ACCESS_KEY_ID`: Chave de acesso da AWS
- `AWS_SECRET_ACCESS_KEY`: Chave secreta da AWS
- `AWS_REGION`: Região da AWS
- `AWS_BUCKET_NAME`: Nome do bucket S3

### Banco de Dados

O projeto utiliza o Prisma como ORM. Para configurar o banco de dados:

1. Execute as migrações:
```bash
npx prisma migrate dev
```

2. Gere o cliente do Prisma:
```bash
npx prisma generate
```

## Estrutura do Projeto

```
src/
├── app/                    # Páginas da aplicação
├── components/            # Componentes React
├── lib/                   # Utilitários e configurações
├── styles/               # Estilos globais
├── types/                # Definições de tipos
└── utils/                # Funções utilitárias
```

## Funcionalidades

- Autenticação de usuários
- Gerenciamento de produtos
- Carrinho de compras
- Checkout
- Área administrativa
- Upload de imagens
- Internacionalização
- Acessibilidade
- Monitoramento
- Testes

## API

### Endpoints

- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de usuário
- `GET /api/products` - Listar produtos
- `POST /api/products` - Criar produto
- `PUT /api/products/:id` - Atualizar produto
- `DELETE /api/products/:id` - Deletar produto
- `POST /api/orders` - Criar pedido
- `GET /api/orders` - Listar pedidos

## Segurança

- Autenticação com NextAuth.js
- Proteção de rotas
- Rate limiting
- Headers de segurança
- Sanitização de inputs
- Validação de dados

## Testes

Para executar os testes:

```bash
npm test
```

Tipos de testes:
- Unitários
- Integração
- E2E
- Acessibilidade

## Deploy

O projeto está configurado para deploy na Vercel. Para fazer o deploy:

1. Conecte seu repositório na Vercel
2. Configure as variáveis de ambiente
3. Faça o deploy

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request 