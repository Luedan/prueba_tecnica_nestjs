import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

/**
 * DTO para la creación de un producto
 */
export class CreateProductDto {
  /**
   * Nombre del producto
   */
  @IsString()
  @IsNotEmpty()
  nombre: string;

  /**
   * Descripción del producto
   */
  @IsString()
  @IsOptional()
  descripcion?: string;

  /**
   * Precio del producto
   */
  @IsPositive()
  @IsNumber()
  precio: number;

  /**
   * Cantidad de productos
   */
  @IsPositive()
  @IsInt()
  cantidad: number;
}
