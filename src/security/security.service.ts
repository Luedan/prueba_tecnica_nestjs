import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto, LoginResponseDto } from './dto/security.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SecurityService {
  constructor(
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
    private readonly _jwtService: JwtService,
  ) {}

  async login(loginRequest: LoginDto): Promise<LoginResponseDto> {
    try {
      const user = await this._userRepository.findOne({
        where: { user: loginRequest.user },
      });

      if (!user) {
        throw new BadRequestException('Usuario o contraseña invalida');
      }

      const passCompare = bcrypt.compareSync(
        loginRequest.password,
        user.password,
      );

      if (!passCompare) {
        throw new BadRequestException('Usuario o contraseña invalida');
      }

      const payload = { user: user.user, id: user.id };

      const token = this._jwtService.sign(payload);

      return { token };
    } catch (error) {
      throw new HttpException(
        error.message || 'Algo ha salido mal iniciando sesion',
        error.code || 500,
      );
    }
  }
}
