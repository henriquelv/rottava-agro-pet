# Guia de Contribuição

## Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Padrões de Código

### TypeScript

- Use TypeScript para todo o código
- Defina tipos explícitos para todas as variáveis e funções
- Use interfaces para definir tipos de objetos
- Use enums para valores constantes
- Evite usar `any`

### React

- Use componentes funcionais com hooks
- Use o padrão de nomenclatura PascalCase para componentes
- Use o padrão de nomenclatura camelCase para funções e variáveis
- Use o padrão de nomenclatura kebab-case para arquivos
- Use o padrão de nomenclatura SCREAMING_SNAKE_CASE para constantes

### CSS

- Use Tailwind CSS para estilização
- Evite estilos inline
- Use classes utilitárias do Tailwind
- Mantenha a consistência dos espaçamentos e cores
- Use variáveis CSS para valores reutilizáveis

### Testes

- Escreva testes para todos os componentes
- Use Jest e React Testing Library
- Mantenha uma cobertura de testes acima de 80%
- Teste casos de sucesso e erro
- Teste acessibilidade

### Git

- Use commits semânticos
- Mantenha mensagens de commit claras e concisas
- Use branches feature para novas funcionalidades
- Use branches fix para correções
- Use branches release para versões

## Processo de Revisão

1. O PR deve ter uma descrição clara do que foi feito
2. O PR deve ter testes
3. O PR deve seguir os padrões de código
4. O PR deve passar nos testes automatizados
5. O PR deve ser revisado por pelo menos um mantenedor

## Ambiente de Desenvolvimento

1. Clone o repositório
2. Instale as dependências
3. Configure as variáveis de ambiente
4. Execute os testes
5. Inicie o servidor de desenvolvimento

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto
- `npm run start` - Inicia o servidor de produção
- `npm run test` - Executa os testes
- `npm run lint` - Executa o linter
- `npm run format` - Formata o código
- `npm run type-check` - Verifica os tipos

## Dependências

- Next.js
- React
- TypeScript
- Tailwind CSS
- Prisma
- NextAuth.js
- Jest
- React Testing Library
- ESLint
- Prettier

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

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 