import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export abstract class AbstractEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

}
