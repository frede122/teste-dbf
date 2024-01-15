import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { CategoryController } from './category/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category/entity/category.entity';
import { ProductService } from './product/product.service';
import { CategoryService } from './category/category.service';

@Module({
  controllers: [
    ProductController, 
    CategoryController
  ],
  imports: [
    TypeOrmModule.forFeature([
      Category
    ])
  ],
  providers: [ProductService, CategoryService]
})
export class ProductsModule { }
