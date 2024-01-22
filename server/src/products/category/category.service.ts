import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../base/base.service';

@Injectable()
export class CategoryService extends BaseService{

    constructor(
        @InjectRepository(Category)
        public repository: Repository<Category>,
      ) {
        super(repository)
      }

      async findAll() {
        return await this.repository.find({
          where: {
            active: true
          }
        });
      }

      async delete(id: number) {
        return await this.repository.update(id, {active: false});
      }
    
}
