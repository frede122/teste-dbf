import { AbstractEntity } from "./abstract.entity";

export interface BaseServiceInterface {
    create(data: AbstractEntity);
    findAll();
    show(id: number);
    update(id: number, data: AbstractEntity);
    delete(id: number);
}