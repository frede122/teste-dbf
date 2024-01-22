import { Category } from "../../../products/category/entity/category.entity";
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class ProductDTO{

    @IsString()
    name: string;

    @IsString()    
    description: string;

    @IsOptional()
    @IsString()    
    image_path: string;

    @IsNumber()
    value: number;

    @IsObject()
    category: Category
}