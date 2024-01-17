import { Category } from "./category.model";

export class Product {
    constructor(
        public name: string,
        public description: string,
        public category: Category,
        public value: number,
        public id: number = 0
    ) { }
}