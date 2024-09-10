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
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { QueryProductDto } from './dto/Query-prodcut.dto';

/**
 * Controlador para la gestión de productos.
 */
@Controller('products')
@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(AuthGuard)
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

  @Get('findByName/:name')
  findByName(@Param('name') name: string) {
    return this.productService.findByName(name);
  }

  /**
   * Obtiene todos los productos.
   *
   * @returns Lista de productos.
   */
  @Get()
  findAll(@Query() query: QueryProductDto) {
    return this.productService.findAll(query);
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
