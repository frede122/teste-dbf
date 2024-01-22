As controllers utilizam-se de entidades DTO para validação de seus campos por meio do Class-Validator.
## Configuração e Instalação
* [Configuração e Instalação](../server/README.md)
  
## Estrutura e padrão da API
O projeto esta estruturado em modulo, por exemplo o modulo de produtos possui sua propria pasta, onde contém sua controller, service, arquivos DTOs e Entitys

Cada controller extende da BaseController, herdando seus atributos e metodos. O mesmo que acontece com as controllers ocorre com as services, onde elas extendem da BaseService.

### Diagrama da estrutura do projeto
```mermaid
classDiagram
BaseController <|-- CategoryController
BaseController <|-- ProductController
BaseController : index()
BaseController : show(int id)
BaseController : create(data)
BaseController : update(int id, EntityDTO data)
BaseController : updatePartial(int id, data)
BaseController : delete(int id)
BaseController : BaseService service
BaseService <|-- CategoryService
BaseService <|-- ProductService
BaseService : create(data)
BaseService : findAll()
BaseService : show(int id)
BaseService : update(int id, AbstractEntity data)
BaseService : delete(int id)
CategoryController -- CategoryService
ProductController -- ProductService
CategoryController : CategoryService service
ProductController : ProductService service
ProductDTO -- ProductController
ProductDTO : string name
ProductDTO : string description
ProductDTO : string image_path
ProductDTO : decimal value
ProductDTO : Category category
CategoryDTO -- CategoryController
CategoryDTO : string name
CategoryDTO : boolean active
```

## EndPoints

### Produtos
| Req. Http | Url | Função
|---| ---| ---|
| POST | /products/product | create(data)|
| POST | /products/product/photo | upload(file)|
| GET | /products/product | index()|
| GET | /products/product/:id | show(id)|
| PUT | /products/product/:id | update(id, data)|
| DELETE | /products/product/:id | delete(id)|

### Categorias
| Req. Http | Url | Função | Exe: JSON Válido
|---| ---| ---| ---|
| POST | /products/category | create(data)| [Create Category ](#create-category) |
| GET | /products/category | index()|  |
| GET | /products/category/:id | show(id)| |
| PUT | /products/category/:id | update(id, data)| |
| DELETE | /products/category/:id | delete(id)| |


### JSON validos para Categoria
#### create category
[Create Category]([create-category])
```json
{
    "name": " frutas"
}
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
