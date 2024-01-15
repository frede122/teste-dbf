import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { CategoryService } from './category.service';
import { Category } from './entity/category.entity';
@Controller('category')
export class CategoryController extends BaseController<Category>{

    constructor(
        public categoryService: CategoryService
    ) {
        super()
        this.service = categoryService;
    }

}
