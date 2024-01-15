import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';

const ROUTER = [
  // { path: 'products', module: ProductsModule }
]

const ENTITY = [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
