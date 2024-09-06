import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

/**
 * DTO para la actualización de un producto
 */
export class UpdateProductDto extends PartialType(CreateProductDto) {}
