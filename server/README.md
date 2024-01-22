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


## Testes Unitários
Para executar os testes da aplicação entre no terminal, acesse a pasta e digite os seguintes comandos :
### Testes Controllers
##### Teste product controller 
```bash
npm run test src/products/product/product.controller.spec.ts
```
#### Teste category controller 
```bash
npm run test src/products/category/category.controller.spec.ts
```
### Testes Services
**Cuiddado:** teste de service passando parametro _-- database_ usam do banco de dados, por isso informações podem ser perdidas, faça somente em ambiente de desenvolvimento.
#### Teste product services com mock
Nesse teste todos os dados são preservados, visto que parte da aplicação está mockada
```bash
npm run test src/products/product/product.controller.spec.ts
```
#### Teste product services sem mock
Nesse teste todos os dados possivelmente serão perdidos
```bash
npm run test src/products/product/product.service.spec.ts -- database
```
#### Teste category service com mock
Nesse teste todos os dados são preservados, visto que parte da aplicação está mockada
```bash
npm run test src/products/category/category.service.spec.ts 
```
#### Teste category service sem mock
Nesse teste todos os dados possivelmente serão perdidos
```bash
npm run test src/products/category/category.service.spec.ts  -- database
```
