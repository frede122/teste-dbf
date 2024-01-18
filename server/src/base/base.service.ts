import { Repository } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { BaseServiceInterface } from './base.service.interface';


export abstract class BaseService implements BaseServiceInterface {

  constructor(
    public repository: Repository<AbstractEntity>,
  ) { }

   async create(data: AbstractEntity): Promise<AbstractEntity> | null {
    const result = this.repository.create(data);
    return await this.repository.save(result);
  }

  async findAll(): Promise<AbstractEntity[]> | null {
    return await this.repository.find();
  }

  async show(id: number): Promise<AbstractEntity> | null {
    return await this.repository.findOne({
      where: {
        id
      }
    });
  }

  async update(id: number, data: AbstractEntity): Promise<any> | null {
    return await this.repository.update(id, data);
  }

  async delete(id: number): Promise<any> | null {
    return await this.repository.delete(id);
  }

}
