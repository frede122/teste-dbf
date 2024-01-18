import { Category } from "src/products/category/entity/category.entity";
import { IsNumber, IsObject, IsString } from 'class-validator';

export class ProductDTO{

    @IsString()
    name: string;

    @IsString()    
    description: string;

    @IsNumber()
    value: number;

    @IsObject()
    category: Category
}