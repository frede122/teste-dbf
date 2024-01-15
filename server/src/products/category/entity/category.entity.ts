import { AbstractEntity } from "src/base/abstract.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Category extends AbstractEntity {

    @Column({
        unique: true,
        nullable: false,
    })
    name: string
    
    @Column({
        nullable: false,
        default: true,
    })
    active: boolean
}