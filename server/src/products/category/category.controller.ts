import { Body, Controller, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { BaseController } from "../../base/base.controller"
import { CategoryService } from './category.service';
import { CategoryDTO } from './dto/category.dto';

@Controller('category')
export class CategoryController extends BaseController{

    constructor(
        public categoryService: CategoryService
    ) {
        super()
        this.service = categoryService;
    }

    @Post()
    async create(@Body() data: CategoryDTO) {
        return this.service.create(data);
    }
    
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: CategoryDTO) {
        return this.service.update(id, data);
    }

    @Patch(':id')
    async updatePartial(@Param('id', ParseIntPipe) id: number, @Body() data: CategoryDTO) {
        return this.service.update(id, data);
    }

}
