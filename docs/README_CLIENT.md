## Estrutura e padrão
O projeto esta estruturado em modulo por padrão do angular, por exemplo o modulo de produtos possui sua propria pasta, onde contém sua controller, service, arquivos DTOs e Entitys

Cada controller extende da BaseController, herdando seus atributos e metodos. O mesmo que acontece com as controllers ocorre com as services, onde elas extendem da BaseService.
### Pastas
#### Services
Essa pasta contem todas as services utilizadas nos módulos produto e categoria, 
#### Helpers
Local onde fica os helpers da aplicação, como por exemplo o custom do formValidator
#### Shared
Pasta para components e service compartilhadas com diversos módulos
#### Shared -> Components
Componentes compartilhados com diversos outros módulos
#### Shared -> Service
Service compartilhadas com diversos outros módulos
#### Environments
Local onde fica as variaveis de ambiente. Nas variaveis de ambientes tem informações como por exemplo, url da API

## Metodos 
* create(data)
* update(id, data)
* getById(id)
* getAll()
* delete(id)
* isMoney(control: AbstractControl)
* getMessage(control: AbstractControl)

### create(data)
Usado para fazer uma requisição http do tipo POST, enviando a variavel data para a API
### update(id, data)
Usado para fazer uma requisição http do tipo PUT, enviando a variavel data e parâmetro id para a API
### getById(id)
Usado para fazer uma requisição http do tipo GET, enviando o parâmetro id para API, retornando a pesquisa de um valor
### getAll()
Usado para fazer uma requisição http do tipo GET, retornando um array de valores
### delete(id)
Usado para fazer uma requisição http do tipo DELETE, enviando o parâmetro id para API, deletando o valor referente ao id
### isMoney(control: AbstractControl)
Esse metodo é uma customização de um forms validator, nele é verificado se o valor do formulario é valor monetário valido
### getMessage(control: AbstractControl)
Esse metodo esta dentro de uma service, e tem o objetivo de gerar mensagens customizada para formulario a partir de de um parâmetro formControl passado, essas mensagens serão exibidas conforme o tipo do erro
* required: 'Campo obrigatório, entre com algum valor',
* maxlength: 'quantidade de caracteres ultrapassa o maximo permitido',
* notNumber: 'Valor inserido não é um numero',
* negativeNumber: 'Valores negativos não são permitidos',
* zero: 'O valor não pode ser zero',
* notMoney: 'Valor inserido não é um valor monetario válido',


