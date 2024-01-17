import { AbstractEntity } from "src/base/abstract.entity";
import { Category } from "src/products/category/entity/category.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity('products')
export class Product extends AbstractEntity{

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    value: number;

    // @Column({ nullable: false, 
    // })
    // category_id: number

    @OneToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    category: Category

}