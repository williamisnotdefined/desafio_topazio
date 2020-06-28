# Desafio Topázio
### 🚀 Tecnologias utilizadas
- [Node.js](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Jest](https://jestjs.io/docs/en/expect)

### 📦 O que eu preciso instalar, para rodar o projeto?
- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [Yarn](https://classic.yarnpkg.com/lang/en/)

### ⬇️ Baixando, instalando, executando e testando
```bash
  # Clonar o repositório
  git clone https://github.com/wozzp/desafio_topazio.git

  # Instalação de dependencias
  yarn install

  # Executar o projeto em ambiente de desenvolvimento
  yarn dev

  # Executar os testes do projeto
  yarn test
```
### 🌎 Breve explicação sobre a estrutura
- **`Testes`**: O projeto está com 100% de coverage, para ver o relatório de coverage basta executar os testes e abrir o arquivo src/__tests __/coverage/lcov-report/index.html
- **`modules`**: Os modulos (user, book) do projeto foram desenvolvidos com base em DDD(Domain Driven Design)
- **`fluxo das requisições`**: Routes > Controller > Services. As rotas devem direcionar a requisição a um Controller, onde ele trata os dados da requisição e envia para um Service, que será responsável por realizar alguma tarefa e devolver para o controller os dados necessários. (Single Responsibility Principle)
- **`API`**: A api está preparada para versionamento e conta atualmente com o prefixo "/api/v1"

## 📌 Rotas da API
⚠️ **Atenção! O _token_ necessário para realizar grande parte das requisições é gerado a partir da rota **`POST /auth`** e deve ser enviado via _Bearer_ nas referidas rotas. Na pasta raiz do projeto foi adicionado um arquivo exportado do insomnia, você pode importar para facilitar nos testes, o nome do arquivo é 'insomnia_exported.json' :D**

### Livros

- **`Criação - POST /book`**: Essa rota deve receber um título, isbn, categoria e ano para ser possível criar um livro. Além disso é necessário estar logado como um usuário com permissão de administrador.

- **`Listagem - GET /book`**: Essa rota pode receber por queryString um título, isbn, categoria e ano para a filtragem dos livros. Também é possível passar os parametros page e limit, afim de modificar a paginação. Não é necessário estar autenticado para receber o retorno desta rota.

- **`Ver um livro - GET /book/:id`**: Essa rota espera por parametro o ID de um livro, não é necessário estar autenticado para receber o retorno desta rota.

- **`Deletar - DELETE /book/:id`**: Essa rota espera por parametro o ID de um livro, é necessário estar autenticado com usuário com privilégio de administrador.

- **`Editar - PUT /book/:id`**: Esta rota espera por parametro o ID de um livro e o body da requisição deve conter título, isbn, categoria e ano. É necessário estar autenticado com um usuário com privilégio de administrador.

- **`Upload de Capa - POST /book/save-cover/:id`**:Esta rota espera por parametro o ID de um livro e deve receber uma imagem para ser salva como capa do livro. Apenas um usuário com privilégio de administrador poderá efetuar essa ação.

### Usuários

- **`Criação - POST /user`**: Esta rota espera receber um nome, idade, telefone, email, password e permissão (usuário ou administrador). Não precisa estar autenticado. Para maior facilidade, fiz essa rota receber a Role (que não seria uma boa prática), o ideal seria que um usuário administrador fosse criado por outro usuário administrador e que o primeiro usuário adm já estivesse populado na base, dessa forma não passariamos a role.

- **`Listagem - GET /user`**: Esta rota espera todos os dados de um usuário por queryString (nome, idade, phone, role) assim como page e limit para alterar a paginação. Está rota exige privilégios de administrador.

- **`Ver um usuário - GET /user/:id`**: Está rota espera um ID de um usuário por parametro e pode ser acessada pelo próprio usuário (dono do ID) ou por um usuário com privilégios de administrador, demais usuários autenticados não terão acesso.

- **`Editar - PUT /user/:id`**: Está rota espera um ID de um usuário por parametro e o body da requisição deve conter nome, idade, telefone e email. Pode ser acessada pelo próprio usuário (dono do ID) ou por um usuário com privilégios de administrador.

- **`Deletar - DELETE /user/:id`**: Está rota espera um ID de um usuário por parametro e pode ser acessada pelo próprio usuário (dono do ID) ou por um usuário com privilégios de administrador.

- **`Favoritar livro - POST /user/favorite-book/:id`**: Está rota espera um ID de um livro por parametro e pode ser acessada apenas pelo usuário que está autenticado. Um administrador não conseguirá adicionar favoritos para outro usuário.

### Auth

- **`Logar - POST /auth`**: Está rota espera um email e senha, ela retornará um token JWT e o usuário. Informações sensíveis do usuário (como senha) nunca são passadas por payload.

## 🌐 Melhorias / Auto críticas

Existe muito espaço para melhoria nesse teste, por exemplo, utiizaçaõ de docker, implementação de logs, upload para s3 ao invés de disco local, etc.

🚀🚀🚀

