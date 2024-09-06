import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';

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
      entities: [Product],
      synchronize: true,
      logging: true,
    }),
  ],
})
@Global()
export class DatabaseModule {}
