import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly _productRepository: Repository<Product>,
  ) {}

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
        500,
      );
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const products = await this._productRepository.find();

      return products;
    } catch (error) {
      throw new HttpException(
        `Algo salio mal obteniendo todos los productos error: ${error}`,
        500,
      );
    }
  }

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
        500,
      );
    }
  }

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
        500,
      );
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      await this.findOne(id);

      await this._productRepository.delete({ id });

      return true;
    } catch (error) {
      throw new HttpException(
        `Algo salio mal eliminando el producto error: ${error}`,
        500,
      );
    }
  }
}
