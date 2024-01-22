## Dependencias JS
Dependências usadas no projeto.
| Dependência | Versão
|---| ---|
| @nestjs/serve-static | ^4.0.0 |
| @nestjs/typeorm | ^10.0.1 |
| class-transformer | ^0.5.1 |
| class-validator | ^0.14.1 |
| mysql2 | ^3.7.0 |
| typeorm | ^0.3.19 |


| Dependência Dev | Versão
|---| ---|
| @types/multer | ^1.4.11 |

## Env
Renomei e adicone informações no servidor
> .env.example

para

> .env

### Informações
Veja um exemplo de configuração válida .env
``` env
HOST = 'localhost'
PORT = '3306'
USER = 'root'
PASSWORD = "123456"
DATABASE = "teste-dbf"
```

## Instalação de dependências

```bash
$ npm install
```

## Executando aplicação
Para executar a API entre no terminal, acesse a pasta e digite:

#### desenvolvimento
```bash
npm run start
```
#### modo de observação
```bash
$ npm run dev
```
