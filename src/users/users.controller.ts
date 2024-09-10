import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

/**
 * Controlador para la gestión de users.
 */
@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Crea un nuevo user.
   *
   * @param createUserDto - Objeto que contiene los datos del user a crear.
   * @returns El user creado.
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * Obtiene todos los users.
   *
   * @returns Lista de users.
   */
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /**
   * Obtiene un user por su identificador.
   *
   * @param id - Identificador del user.
   * @returns El user encontrado.
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  /**
   * Actualiza un user.
   *
   * @param id - Identificador del user.
   * @param updateUserDto - Objeto que contiene los datos del user a actualizar.
   * @returns El user actualizado.
   */
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * Elimina un user.
   *
   * @param id - Identificador del user.
   * @returns El user eliminado.
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
