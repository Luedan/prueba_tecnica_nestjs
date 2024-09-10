import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

/**
 * Módulo para la configuración de la base de datos.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_CONNECTION_STRING,
      entities: [Product, User],
      synchronize: true,
      logging: true,
    }),
  ],
})
@Global()
export class DatabaseModule {}
