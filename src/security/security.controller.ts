import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/security.dto';
import { SecurityService } from './security.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('security')
@ApiTags('Security')
export class SecurityController {
  constructor(private readonly _securityService: SecurityService) {}

  @Post('login')
  login(@Body() loginRequest: LoginDto) {
    return this._securityService.login(loginRequest);
  }
}
