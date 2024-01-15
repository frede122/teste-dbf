import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class CategoryService extends BaseService{

    constructor(
        @InjectRepository(Category)
        public repository: Repository<Category>,
      ) {
        super(repository)
      }
    
}
