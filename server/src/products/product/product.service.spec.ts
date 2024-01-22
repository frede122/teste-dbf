import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product } from './entity/product.entity';
import { Any, Repository, createConnection, getConnection, getRepository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productEntityList } from '../../testing/mocks/product/product-entity-list.mock';
import { responseUpdate } from '../../testing/response-update';
import { responseDelete } from '../../testing/response-delete';
import { Category } from '../category/entity/category.entity';
import { insertCategories } from '../../testing/query/insert-categories';
import { insertProducts } from '../../testing/query/insert-products';

describe('ProductService', () => {
  let service: ProductService;
  let repository: Repository<Product>;
  let conn: any;
  const args = process.argv.slice(2);

  //Passagem de parametro "database" indica teste feito no banco, sem parametro é teste com retorno do banco mockado
  // npm run test -t src/products/product/product.service.spec.ts -- database
  beforeAll(async () => {
    if (args.includes('database'))
      await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'teste-dbf',
        entities: [Product, Category],
        synchronize: false,
      }).then(() => {

        conn = getConnection();
        conn.query("DELETE FROM products;").then(() => {
          conn.query("DELETE FROM categories;")
        })

      })
  });

  afterAll(async () => {
    if (args.includes('database'))
      conn.query("DELETE FROM products;").then(() => {
        conn.query("DELETE FROM categories;")
      }).then(() => {
        conn.close();
      })
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository<Product>,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );



  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create product - service', async () => {

    if (args.includes('database')) {
      conn.query("DELETE FROM products;").then(() => {
        conn.query("DELETE FROM categories;").then(() => {
          conn.query(insertCategories).then(() => {

            const data = service.create(productEntityList[0]);
            expect(data).toEqual(productEntityList[0]);

          })

        })
      })
    } else {

      jest.spyOn(repository, 'save').mockResolvedValue(productEntityList[0]);
      jest.spyOn(repository, 'create').mockReturnValue(productEntityList[0]);
      const data = await service.create(productEntityList[0])
      expect(data).toEqual(productEntityList[0]);

    }



  });




  it('show product by id - service ', async () => {

    if (args.includes('database')) {
      conn.query(insertProducts).then(() => {
        const result = service.show(productEntityList[0].id);
        expect(result).toEqual(productEntityList[0]);
      });
    } else {

      jest.spyOn(repository, 'findOne').mockResolvedValue(productEntityList[0]);
      const result = await service.show(productEntityList[0].id);
      expect(result).toEqual(productEntityList[0]);

    }

  });

  it('update product - service ', async () => {

    if (args.includes('database')) {
      conn.query(insertProducts).then(() => {
        const data = service.update(productEntityList[0].id, productEntityList[0]);
        expect(data).toEqual(responseUpdate);
      });
    } else {
      jest.spyOn(repository, 'update').mockResolvedValue(responseUpdate);
      const data = await service.update(productEntityList[0].id, productEntityList[0]);
      expect(data).toEqual(responseUpdate);
    }

  });

  it('index product - service ', async () => {

    if (args.includes('database')) {
      conn.query(insertProducts).then(() => {

        const data = service.findAll();
        expect(data).toEqual(productEntityList);

      });

    } else {

      type QueryBuilderMock<T> = {
        leftJoinAndSelect: jest.Mock;
        where: jest.Mock;
        getMany: jest.Mock<Promise<T>>;
      };
      const queryBuilderMock: QueryBuilderMock<Product> = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(productEntityList),
      };
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValue(queryBuilderMock as any);
      const data = await service.findAll();
      expect(data).toEqual(productEntityList);
    }
  });


  it('delete product by id - service ', async () => {

    if (args.includes('database')) {
      conn.query(insertProducts).then(() => {
        const result = service.delete(1);
        expect(result).toEqual(responseDelete);
      });

    } else {

      jest.spyOn(repository, 'delete').mockResolvedValue(responseDelete);
      const data = await service.delete(productEntityList[0].id);
      expect(data).toEqual(responseDelete);
    }

  })


});
