# Backend do Sistema de Cadastro de Funcionários

Este é o backend do sistema de cadastro de funcionários, desenvolvido com Node.js, Express e MySQL.

## Pré-requisitos

- Node.js instalado
- MySQL instalado e rodando localmente
- npm ou yarn instalado

## Configuração

1. Instale as dependências:
```bash
npm install
```

2. Configure o banco de dados:
- Abra o MySQL Workbench ou phpMyAdmin
- Execute o script `database.sql` para criar o banco de dados e as tabelas

3. Configure as variáveis de ambiente:
- Crie um arquivo `.env` na raiz do projeto
- Adicione as seguintes variáveis:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=cadastro_funcionarios
PORT=3000
```

## Executando o projeto

Para iniciar o servidor em modo de desenvolvimento:
```bash
npm run dev
```

Para iniciar o servidor em modo de produção:
```bash
npm start
```

## Endpoints da API

### Funcionários
- GET /api/funcionarios - Lista todos os funcionários
- POST /api/funcionarios - Cadastra um novo funcionário
- PUT /api/funcionarios/:id - Atualiza um funcionário existente
- DELETE /api/funcionarios/:id - Remove um funcionário

### Autenticação
- POST /api/login - Realiza o login do usuário

## Usuário padrão para teste
- Email: teste@teste.com
- Senha: 123456 