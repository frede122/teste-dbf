import { AbstractEntity } from "../../../base/abstract.entity";
import { Column, Entity } from "typeorm";

@Entity('categories')
export class Category extends AbstractEntity {

    @Column({
        nullable: false,
    })
    name: string
    
    @Column({
        nullable: false,
        default: true,
    })
    active: boolean
}