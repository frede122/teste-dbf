# DBF - Teste prático para fullstack

## Pré-requisitos

- JavaScript (Frontend)
- NodeJS ou Java (qualquer framework entre esses)
- Qualquer banco relacional (H2, MySQL, MSSQL, Postgres, etc)
- REST

## Desafio
Você deverá desenvolver uma tela simples onde um usuario poderá cadastrar categorias e produtos, todo produto terá obrigatoriamente uma categoria, tanto os produtos quanto as categorioas serão exibido em uma lista, onde o usuario poderá excluir, incluir ou editar esse produto.

Você deverá desenvolver uma API REST para gerenciar esses produtos e categorias de produtos. Dessa forma, deverá existir rotas para o CRUD tanto das categorias quanto dos produtos.

Utize o framework que desejar desde que preencha os pré-requisitos das linguagens acima. 
Mas recomendamos para o frontend: Angular ou React e para o backend: SpringBoot para o caso de Java e NestJS para o caso de NodeJS.

### O que esperamos 

#### Backend
1. Validação dos valores informados;
2. Consultas e inserções utilizando boas práticas;
3. Documentação. Explique brevemente os metodos criados.

#### Frontend
1. Validação dos campos corretamente;
2. Layout coeso e funcional.


### O que nos impressionaria
- Alguma metodologia para definição e organização do seu código, lembre-se qualquer padrão é melhor que padrão nenhum;
- Responsividade (no frontend);
- Utilização de boas práticas;
- Mascarás aplicadas onde devido e tratamento de erros;
- Testes unitários;
- Conteinerização da aplicação.

### O que não gostaríamos
- Saber que não foi você quem fez seu teste;
- Commits sem mensagens explicativas;
- Falta de validações;
- Uso extenso de bibliotecas para resolver problemas simples;
- Aplicação não funcional.

## O que avaliaremos de seu teste
1. Funcionamento e método de resolução do problema.
2. Organização do código.
3. Documentação da API.
4. Arquitetura do projeto.
5. Semântica, estrutura, legibilidade, manutenibilidade, escalabilidade do seu código e suas tomadas de decisões.
6. Históricos de commits do git.

### Dúvidas
Mande um e-mail para nós. (contato@dbfactory.com.br)

### Observação
Não esqueça de nos mandar o dump do banco utilizado.

* As tabelas deverão ter no minimo os seguintes campos:
    * Produtos

        | Campo       | Obrigatório |
        |-------------|-------------|
        | id          |             |
        | nome        | sim         |
        | descricao   | sim         |
        | valor       | sim         |
        | id_categoria| sim         |

    * Categoria

        | Campo      | Obrigatório |
        |------------|-------------|
        | id         |             |
        | nome       | sim         |
        | ativa      | sim         |
