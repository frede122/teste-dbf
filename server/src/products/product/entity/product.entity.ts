import { AbstractEntity } from "../../../base/abstract.entity";
import { Category } from "../../../products/category/entity/category.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity('products')
export class Product extends AbstractEntity{

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false, type: 'decimal' })
    value: number;

    @OneToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    category: Category

}