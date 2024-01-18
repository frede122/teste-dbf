import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CategoryDTO{

    @IsString()
    name: string;

    @IsOptional()
    @IsBoolean()
    active: boolean
}