import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProductsModule } from './products/products.module';
import { Category } from './products/category/entity/category.entity';
import { Product } from './products/product/entity/product.entity';

const ROUTER = [
  { path: 'products', module: ProductsModule }
]

const ENTITY = [
  Category,
  Product
]

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: ENTITY,
      synchronize: false,
    }),
    RouterModule.register(ROUTER),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'storage', 'photos'), 
      serveRoot: '/storage',
    }),
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {


}
