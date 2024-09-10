import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ResponseUserDto } from './dto/reponse-user.dto';
import { UserMapper } from './mapper/user.mapper';

/**
 * Servicio para la gestión de usuarios.
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  /**
   * Crea un nuevo usuario.
   *
   * @param createUserDto - Objeto que contiene los datos del usuario a crear.
   * @returns Una promesa que se resuelve con el usuario creado.
   * @throws {HttpException} Si ocurre un error al crear el usuario.
   */
  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    try {
      const pass = bcrypt.hashSync(createUserDto.password, 10);

      const newUser = await this._userRepository.insert({
        ...createUserDto,
        password: pass,
      });

      const userResponse = {
        id: newUser.identifiers[0].id,
        ...createUserDto,
        fecha_creacion: newUser.raw[0].fecha_creacion,
        fecha_actualizacion: newUser.raw[0].fecha_actualizacion,
      };

      return UserMapper.mapEntityToDto(userResponse);
    } catch (error) {
      throw new HttpException(
        `Algo salio mal creando el usuario error: ${error}`,
        error.code || 500,
      );
    }
  }

  /**
   * Obtiene todos los usuarios.
   *
   * @returns Una promesa que se resuelve con la lista de usuarios.
   * @throws {HttpException} Si ocurre un error al obtener los usuarios.
   */
  async findAll(): Promise<ResponseUserDto[]> {
    try {
      const users = await this._userRepository.find();

      return users.map(UserMapper.mapEntityToDto);
    } catch (error) {
      throw new HttpException(
        `Algo salio mal obteniendo todos los usuarios error: ${error}`,
        error.code || 500,
      );
    }
  }

  /**
   * Obtiene un usuario por su identificador.
   *
   * @param id - Identificador del usuario.
   * @returns Una promesa que se resuelve con el usuario encontrado.
   * @throws {HttpException} Si ocurre un error al obtener el usuario.
   * @throws {NotFoundException} Si el usuario no existe.
   */
  async findOne(id: number): Promise<ResponseUserDto> {
    try {
      const user = await this._userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`El usuario con el id ${id} no existe`);
      }

      return UserMapper.mapEntityToDto(user);
    } catch (error) {
      throw new HttpException(
        `Algo salio mal obteniendo el usuario error: ${error}`,
        error.code || 500,
      );
    }
  }

  /**
   * Actualiza un usuario.
   *
   * @param id - Identificador del usuario.
   * @param updateUserDto - Objeto que contiene los datos del usuario a actualizar.
   * @returns Una promesa que se resuelve con el usuario actualizado.
   * @throws {HttpException} Si ocurre un error al actualizar el usuario.
   * @throws {NotFoundException} Si el usuario no existe.
   */
  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    try {
      let password = '';
      const userExist = await this.findOne(id);

      if (updateUserDto.password) {
        password = bcrypt.hashSync(updateUserDto.password, 10);
      }

      await this._userRepository.update(
        { id },
        { ...updateUserDto, ...(password ? { password } : {}) },
      );

      const userResponse = {
        id,
        ...userExist,
        ...updateUserDto,
      };

      return UserMapper.mapEntityToDto({
        id: userResponse.id || 0,
        password: userResponse.password,
        user: userResponse.user,
      });
    } catch (error) {
      throw new HttpException(
        `Algo salio mal actualizando el usuario error: ${error}`,
        error.code || 500,
      );
    }
  }

  /**
   * Elimina un usuario.
   *
   * @param id - Identificador del usuario.
   * @returns Una promesa que se resuelve con un booleano.
   * @throws {HttpException} Si ocurre un error al eliminar el usuario.
   * @throws {NotFoundException} Si el usuario no existe.
   */
  async remove(id: number): Promise<boolean> {
    try {
      await this.findOne(id);

      await this._userRepository.delete({ id });

      return true;
    } catch (error) {
      throw new HttpException(
        `Algo salio mal eliminando el usuario error: ${error}`,
        error.code || 500,
      );
    }
  }
}
