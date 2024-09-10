import { ResponseUserDto } from '../dto/reponse-user.dto';
import { User } from '../entities/user.entity';

export class UserMapper {
  static mapEntityToDto(user: User): ResponseUserDto {
    return {
      id: user.id,
      user: user.user,
    };
  }
}
