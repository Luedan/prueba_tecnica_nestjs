import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'products',
})
export class Product {
  /**
   * Identificador único del producto
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Nombre del producto
   */
  @Column({
    nullable: false,
  })
  nombre: string;

  /**
   * Descripción del producto
   */
  @Column({
    nullable: true,
  })
  descripcion?: string;

  /**
   * Precio del producto
   */
  @Column({
    nullable: false,
    type: 'decimal',
  })
  precio: number;

  /**
   * Cantidad de productos
   */
  @Column({
    nullable: false,
    type: 'int',
  })
  cantidad: number;

  /**
   * Fecha de creación del producto
   */
  @CreateDateColumn({
    nullable: false,
  })
  fecha_creacion?: Date;

  /**
   * Fecha de actualización del producto
   */
  @UpdateDateColumn({
    nullable: false,
  })
  fecha_actualizacion?: Date;
}
