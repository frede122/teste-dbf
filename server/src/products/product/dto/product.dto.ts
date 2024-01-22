import { Category } from "../../../products/category/entity/category.entity";
import { IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class ProductDTO{

    @MaxLength(100)
    @IsString()
    name: string;

    @IsString()    
    @MaxLength(500)
    description: string;

    @IsOptional()
    @IsString()    
    image_path?: string;

    @IsNumber()
    value: number;

    @IsObject()
    category: Category
}