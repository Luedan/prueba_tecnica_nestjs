import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { SecurityModule } from './security/security.module';

/**
 * Módulo principal de la aplicación.
 */
@Module({
  imports: [
    ProductModule,
    DatabaseModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: '15m' },
    }),
    SecurityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
