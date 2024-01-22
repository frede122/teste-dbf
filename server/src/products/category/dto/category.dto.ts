import { IsBoolean, IsOptional, IsString, MaxLength, max } from 'class-validator';

export class CategoryDTO{

    @IsString()
    @MaxLength(50)
    name: string;

    @IsOptional()
    @IsBoolean()
    active: boolean
}