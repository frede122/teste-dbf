import { Body, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { Repository } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { json } from "stream/consumers";


export abstract class BaseController<typeEntity extends AbstractEntity> {

    public service: BaseServiceInterface;

    @Get()
    async index() {
        return this.service.findAll();
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return this.service.show(id);
    }

    @Post()
    async create(@Body() data: typeEntity): Promise<typeEntity> {
        return this.service.create(data);
    }


    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: typeEntity) {
        return this.service.update(id, data);
    }

    @Patch(':id')
    async updatePartial(@Param('id', ParseIntPipe) id: number, @Body() data: typeEntity) {
        return this.service.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.service.delete(id);
    }

}
