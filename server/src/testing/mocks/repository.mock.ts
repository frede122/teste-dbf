import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from '../../products/category/entity/category.entity';
import { Repository } from 'typeorm';
import { categoryEntityList } from './category/category-entity-list.mock';

export const categoryRepositoryMock = {
    provide : getRepositoryToken(Category),
    useValue: {
        create: jest.fn().mockReturnValue(categoryEntityList[0]),
        save: jest.fn(),
        find: jest.fn(),
        findOneBy: jest.fn().mockResolvedValue([]),
        update: jest.fn(),
        delete: jest.fn(),
      },

    

}