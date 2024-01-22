import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BaseController } from '../../base/base.controller';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/product.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { File } from 'buffer';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { json } from 'stream/consumers';

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

    @UseInterceptors(FileInterceptor('file'))
    @Post('photo')
    async upload(@UploadedFile('file') file : Express.Multer.File) {
        const path = join(__dirname, '..','..','..', 'storage', 'photos', file.originalname)
        await writeFile(path, file.buffer);
        // return JSON.parse('storage/'+file.originalname)
        
        return { img_path: 'storage/'+file.originalname}
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
