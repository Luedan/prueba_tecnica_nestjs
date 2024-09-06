import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';

/**
 * Módulo principal de la aplicación.
 */
@Module({
  imports: [ProductModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
