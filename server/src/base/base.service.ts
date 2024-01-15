import { Repository } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { BaseServiceInterface } from './base.service.interface';


export abstract class BaseService implements BaseServiceInterface {

  constructor(
    public repository: Repository<AbstractEntity>,
  ) { }

  async create(data: AbstractEntity): Promise<AbstractEntity> {
    const result = this.repository.create(data);
    return await this.repository.save(result);
  }

  async findAll() {
    return await this.repository.find();
  }

  async show(id: number) {
    return await this.repository.findOne({
      where: {
        id
      }
    });
  }

  async update(id: number, data: AbstractEntity) {
    return await this.repository.update(id, data);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }

}
