# Sistema de Cadastro de Funcionários

Este projeto é um sistema completo de cadastro de funcionários, desenvolvido com React Native para o frontend e Node.js/Express para o backend, utilizando MySQL como banco de dados.

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

- **Frontend (React Native)**: Localizado na pasta `Funcionarios`, contém as telas e componentes do aplicativo móvel.
- **Backend (Node.js/Express)**: Localizado na pasta `backend`, contém a API RESTful e a configuração do banco de dados.

## Funcionalidades

- **Autenticação**: Login de usuários.
- **Cadastro de Funcionários**: Adicionar novos funcionários com validação de campos.
- **Edição de Funcionários**: Atualizar dados de funcionários existentes.
- **Exclusão de Funcionários**: Remover funcionários do sistema.
- **Listagem de Funcionários**: Visualizar todos os funcionários cadastrados.

## Tecnologias Utilizadas

- **Frontend**:
  - React Native
  - Expo
  - React Navigation
  - Axios (para requisições HTTP)

- **Backend**:
  - Node.js
  - Express
  - MySQL (banco de dados)
  - CORS (para permitir requisições cross-origin)

## Instalação e Execução

### Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL
- Expo CLI

### Passos para Instalação

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/gleyber-hue/app-cadastro-funcionarios.git
   cd app-cadastro-funcionarios
   ```

2. **Instale as Dependências do Backend**

   ```bash
   cd backend
   npm install
   ```

3. **Configure o Banco de Dados**

   - Crie um banco de dados MySQL chamado `projeto-funcionarios`.
   - Ajuste as credenciais de conexão no arquivo `backend/config/database.js`.

4. **Inicie o Servidor Backend**

   ```bash
   npm run dev
   ```

5. **Instale as Dependências do Frontend**

   ```bash
   cd ../Funcionarios
   npm install
   ```

6. **Inicie o Aplicativo Frontend**

   ```bash
   npx expo start
   ```

   - Use o Expo Go no seu dispositivo móvel ou emulador para visualizar o aplicativo.

## Uso

- **Login**: Acesse a tela de login e insira suas credenciais.
- **Cadastro/Edição**: Navegue até a tela de formulário para adicionar ou editar funcionários.
- **Listagem**: Visualize todos os funcionários cadastrados na tela de lista.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT. 