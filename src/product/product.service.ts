import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryProductDto } from './dto/Query-prodcut.dto';

/**
 * Servicio para la gestión de productos.
 */
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly _productRepository: Repository<Product>,
  ) {}

  /**
   * Crea un nuevo producto.
   *
   * @param createProductDto - Objeto que contiene los datos del producto a crear.
   * @returns Una promesa que se resuelve con el producto creado.
   * @throws {HttpException} Si ocurre un error al crear el producto.
   */
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const newProduct = await this._productRepository.insert(createProductDto);

      const productResponse = {
        id: newProduct.identifiers[0].id,
        ...createProductDto,
        fecha_creacion: newProduct.raw[0].fecha_creacion,
        fecha_actualizacion: newProduct.raw[0].fecha_actualizacion,
      };

      return productResponse;
    } catch (error) {
      throw new HttpException(
        `Algo salio mal creando el producto error: ${error}`,
        error.code || 500,
      );
    }
  }

  /**
   * Obtiene todos los productos.
   *
   * @returns Una promesa que se resuelve con la lista de productos.
   * @throws {HttpException} Si ocurre un error al obtener los productos.
   */
  async findAll(query?: QueryProductDto): Promise<Product[]> {
    try {
      console.log(query);

      const limit = +query?.limit;

      const page = +query.offset * limit;

      const products = await this._productRepository.find({
        take: limit,
        skip: page,
      });

      return products;
    } catch (error) {
      throw new HttpException(
        `Algo salio mal obteniendo todos los productos error: ${error}`,
        error.code || 500,
      );
    }
  }

  /**
   * Obtiene un producto por su identificador.
   *
   * @param id - Identificador del producto.
   * @returns Una promesa que se resuelve con el producto encontrado.
   * @throws {HttpException} Si ocurre un error al obtener el producto.
   * @throws {NotFoundException} Si el producto no existe.
   */
  async findOne(id: number): Promise<Product> {
    try {
      const product = await this._productRepository.findOne({ where: { id } });

      if (!product) {
        throw new NotFoundException(`El producto con el id ${id} no existe`);
      }

      return product;
    } catch (error) {
      throw new HttpException(
        `Algo salio mal obteniendo el producto error: ${error}`,
        error.code || 500,
      );
    }
  }

  async findByName(name: string) {
    try {
      const product = await this._productRepository.findOne({
        where: { nombre: name },
      });

      if (!product) {
        throw new NotFoundException(
          `El producto con el nombre ${name} no existe`,
        );
      }

      return product;
    } catch (error) {
      throw new HttpException(
        `Algo salio mal obteniendo el producto error: ${error}`,
        error.code || 500,
      );
    }
  }

  /**
   * Actualiza un producto.
   *
   * @param id - Identificador del producto.
   * @param updateProductDto - Objeto que contiene los datos del producto a actualizar.
   * @returns Una promesa que se resuelve con el producto actualizado.
   * @throws {HttpException} Si ocurre un error al actualizar el producto.
   * @throws {NotFoundException} Si el producto no existe.
   */
  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const productExist = await this.findOne(id);

      await this._productRepository.update({ id }, updateProductDto);

      const productResponse = {
        id,
        ...productExist,
        ...updateProductDto,
      };

      return productResponse;
    } catch (error) {
      throw new HttpException(
        `Algo salio mal actualizando el producto error: ${error}`,
        error.code || 500,
      );
    }
  }

  /**
   * Elimina un producto.
   *
   * @param id - Identificador del producto.
   * @returns Una promesa que se resuelve con un booleano.
   * @throws {HttpException} Si ocurre un error al eliminar el producto.
   * @throws {NotFoundException} Si el producto no existe.
   */
  async remove(id: number): Promise<boolean> {
    try {
      await this.findOne(id);

      await this._productRepository.delete({ id });

      return true;
    } catch (error) {
      throw new HttpException(
        `Algo salio mal eliminando el producto error: ${error}`,
        error.code || 500,
      );
    }
  }
}
