import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { SecurityService } from './security.service';
import { SecurityController } from './security.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SecurityController],
  providers: [SecurityService],
})
export class SecurityModule {}
