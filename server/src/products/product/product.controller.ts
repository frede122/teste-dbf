import { Controller, Get, Post } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController extends BaseController<Product> {

    constructor(
        public productService: ProductService
    ) {
        super()
        this.service = productService;
    }

}
