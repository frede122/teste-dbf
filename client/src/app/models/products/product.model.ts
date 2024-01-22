import { Category } from "./category.model";

export class Product {
    image_path?: string
    constructor(
        public name: string,
        public description: string,
        public category: Category,
        public value: number,
        public id: number = 0
    ) { }
}