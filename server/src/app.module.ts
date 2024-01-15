import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';
import { ProductsModule } from './products/products.module';
import { Category } from './products/category/entity/category.entity';

const ROUTER = [
  { path: 'products', module: ProductsModule }
]

const ENTITY = [
  Category
]

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'teste-dbf',
      entities: ENTITY,
      synchronize: true,
    }),
    RouterModule.register(ROUTER),
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
