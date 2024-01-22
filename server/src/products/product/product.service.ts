import { Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import { Product } from './entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService extends BaseService {

  constructor(
    @InjectRepository(Product)
    public repository: Repository<Product>,
  ) {
    super(repository)
  }

   async findAll():  Promise<any> | null {
    return await this.repository.createQueryBuilder("products")
    .leftJoinAndSelect(
      'products.category', 
      'category', 
      "category.active = true"
      ).getMany();
  }
}
