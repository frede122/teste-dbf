import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { Repository, getRepository } from 'typeorm';
import { Product } from '../product/entity/product.entity';
import { Category } from './entity/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { categoryEntityList } from '../../testing/mocks/category/category-entity-list.mock';
import { categoryEntityListFail } from '../../testing/mocks/category/category-entity-list-fail.mock.';
import { CategoryService } from './category.service';
import { responseUpdate } from '../../testing/response-update';
import { responseDelete } from '../../testing/response-delete';

describe('CategoryController', () => {
  let controller: CategoryController;
  let repository: Repository<Category>;
  let service: CategoryService
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: Repository<Category>,
        },
      ]
    }).compile();

    // repository = module.get(getRepositoryToken(Category));
    service = module.get<CategoryService>(CategoryService);
    controller = module.get<CategoryController>(CategoryController);
  });
  
  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('create category - controller', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(categoryEntityList[0]); 
    const data = await controller.create(categoryEntityList[0])
    expect(data).toEqual(categoryEntityList[0]);
  });

  it('update category - controller', async () => {
    jest.spyOn(service, 'update').mockResolvedValue(responseUpdate); 
    const data = await controller.update(1, categoryEntityList[0])
    expect(data).toEqual(responseUpdate);
  });

  it('delete category - controller', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue(responseDelete); 
    const data = await controller.delete(1)
    expect(data).toEqual(responseDelete);
  });

  it('show category - controller', async () => {
    jest.spyOn(service, 'show').mockResolvedValue(categoryEntityList[0]); 
    const data = await controller.show(1)
    expect(data).toEqual(categoryEntityList[0]);
  });

  it('find category - controller', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue(categoryEntityList); 
    const data = await controller.index()
    expect(data).toEqual(categoryEntityList);
  });

 
});
