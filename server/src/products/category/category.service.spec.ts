import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { Repository, getConnection } from 'typeorm';
import { Product } from '../product/entity/product.entity';
import { Category } from './entity/category.entity';
import { categoryEntityList } from '../../testing/mocks/category/category-entity-list.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createConnection, getRepository, } from 'typeorm';
import { responseDelete } from '../../testing/response-delete';
import { responseUpdate } from '../../testing/response-update';

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: Repository<Category>;
  let conn: any;
  const args = process.argv.slice(2);

  beforeAll(async () => {
    if (args.includes('database')){

      await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'teste-dbf',
        entities: [Category],
        synchronize: false,
      });
      conn = getConnection();
      conn.query("DELETE FROM products;").then(() => {
        conn.query("DELETE FROM categories;")
      })
    }
  });

  afterAll(async () => {
    if (args.includes('database')){
    await conn.close();
    }
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        args.includes('database')?
        {
          provide: getRepositoryToken(Category),
          useValue: getRepository(Category),
        } :
        {
          provide: getRepositoryToken(Category),
          useClass: Repository<Category>,
        }
        ,
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get<Repository<Category>>(
      getRepositoryToken(Category),
    );



  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('create category - service', async () => {

    if(args.includes('database')){
      const data = await service.create(categoryEntityList[0]);
      expect(data).toEqual(categoryEntityList[0]);
    }else{
      jest.spyOn(repository, 'save').mockResolvedValue(categoryEntityList[0]);
      jest.spyOn(repository, 'create').mockReturnValue(categoryEntityList[0]);
      const data = await service.create(categoryEntityList[0]);
      expect(data).toEqual(categoryEntityList[0]);
    }
  });




  it('show category by id - service ', async () => {
    if(args.includes('database')){
      const data = await service.findAll();
      const result = await service.show(data[0].id);
      expect(result).toEqual(data[0]);

    }else{
      jest.spyOn(repository, 'findOne').mockResolvedValue(categoryEntityList[0]);
      const result = await service.show(1);
      expect(result).toEqual(categoryEntityList[0]);
    }

  });

  it('update category - service ', async () => {
    if(args.includes('database')){
      const data = await service.findAll();
      const result = await service.update(data[0].id, categoryEntityList[1]);
      expect(result).toEqual(responseUpdate);

    }else{
      jest.spyOn(repository, 'update').mockResolvedValue(responseUpdate);
      const result = await service.update(1, categoryEntityList[0]);
      expect(result).toEqual(responseUpdate);
    }
  });


  it('delete category by id - service ', async () => {
    if(args.includes('database')){
      const data = await service.findAll();
      const result = await service.delete(data[0].id);
      expect(result).toEqual(responseDelete);

    }else{
      jest.spyOn(repository, 'update').mockResolvedValue(responseDelete);
      const result = await service.delete(1);
      expect(result).toEqual(responseDelete);
    }
  });


});
