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

## 🏷️ Sobre



melhor visualização vscode com extensão Material Icon Theme
modulos baseado em DDD (Domain Driven Design)

------ final ------
- jest / testes / coverage
- exportar insomnia


----- testes -----
- não esquecer de verificar status code retornado

-------------------- readme
Readme explicando:
- melhor visualização vscode com extensão Material Icon Theme
- mongo precisa estar instalado

- o uso do DDD
- single responsability principle


-----
Funcionalidades Livros
    - Criar (Admin) - OK
    - Listar todos (Não precisa estar logado) - OK
    - Ver um livro (Não precisa estar logado) - OK
    - Excluir (Admin) - OK
    - Editar (Admin) - OK
    - Adicionar Capa (Admin) - OK


Funcionalidades User
    - Criar Usuário (o usuário pode ser criado com a role de admin ou user e qualquer um pode criar) - OK
    - Auth - OK
    - Listar os usuários da biblioteca (Admin) - OK
    - Retornar dados de um usuário (User que está logado pode ver os seus próprios dados / Admin pode editar qualquer um) - OK
    - Editar (Admin / Own User) - OK
    - Excluir (Admin / Own User) - OK
    - Salvar livro na lista de favoritos de um usuário (User) - OK





