## Estrutura e padrão
O projeto esta estruturado em modulo, por exemplo o modulo de produtos possui sua propria pasta, onde contém sua controller, service, arquivos DTOs e Entitys

Cada controller extende da BaseController, herdando seus atributos e metodos. O mesmo que acontece com as controllers ocorre com as services, onde elas extendem da BaseService.

As controllers utilizam-se de entidades DTO para validação de seus campos por meio do Class-Validator

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
