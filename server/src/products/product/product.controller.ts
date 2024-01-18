import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/product.dto';

@Controller('product')
export class ProductController extends BaseController {

    constructor(
        public productService: ProductService
    ) {
        super()
        this.service = productService;
    }

    @Post()
    async create(@Body() data: ProductDTO) {
        return this.service.create(data);
    }


    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: ProductDTO) {
        return this.service.update(id, data);
    }

    @Patch(':id')
    async updatePartial(@Param('id', ParseIntPipe) id: number, @Body() data: ProductDTO) {
        return this.service.update(id, data);
    }

}
