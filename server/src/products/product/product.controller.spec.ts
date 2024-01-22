import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Product } from './entity/product.entity';
import { productEntityList } from '../../testing/mocks/product/product-entity-list.mock';
import { responseDelete } from '../../testing/response-delete';
import { responseUpdate } from '../../testing/response-update';
import { productEntityListFail } from '../../testing/mocks/product/product-entity-list.mock-fail';
import { responseInvalidFields } from '../../testing/response/response-invalid-fields';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: Repository<Product>,
        },
      ]
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create product - controller', async () => {

    jest.spyOn(service, 'create').mockResolvedValue(productEntityList[0]); 
    const data = await controller.create(productEntityList[0])
    expect(data).toEqual(productEntityList[0]);
  });

  it('update product - controller', async () => {
    jest.spyOn(service, 'update').mockResolvedValue(responseUpdate); 
    const data = await controller.update(1, productEntityList[0])
    expect(data).toEqual(responseUpdate);
  });

  it('delete product - controller', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue(responseDelete); 
    const data = await controller.delete(1)
    expect(data).toEqual(responseDelete);
  });

  it('show product - controller', async () => {
    jest.spyOn(service, 'show').mockResolvedValue(productEntityList[0]); 
    const data = await controller.show(1)
    expect(data).toEqual(productEntityList[0]);
  });

  it('find product - controller', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue(productEntityList); 
    const data = await controller.index()
    expect(data).toEqual(productEntityList);
  });

  
});
