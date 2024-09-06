import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';

/**
 * Controlador para la gestión de productos.
 */
@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * Crea un nuevo producto.
   *
   * @param createProductDto - Objeto que contiene los datos del producto a crear.
   * @returns El producto creado.
   */
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  /**
   * Obtiene todos los productos.
   *
   * @returns Lista de productos.
   */
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  /**
   * Obtiene un producto por su identificador.
   *
   * @param id - Identificador del producto.
   * @returns El producto encontrado.
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  /**
   * Actualiza un producto.
   *
   * @param id - Identificador del producto.
   * @param updateProductDto - Objeto que contiene los datos del producto a actualizar.
   * @returns El producto actualizado.
   */
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  /**
   * Elimina un producto.
   *
   * @param id - Identificador del producto.
   * @returns El producto eliminado.
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
