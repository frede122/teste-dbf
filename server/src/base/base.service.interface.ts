
export interface BaseServiceInterface {
    create(data: any);
    findAll();
    show(id: number);
    update(id: number, data: any);
    delete(id: number);
}