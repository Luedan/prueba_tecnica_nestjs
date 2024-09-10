import { IsOptional, IsString } from 'class-validator';

export class QueryProductDto {
  @IsString()
  @IsOptional()
  limit: string;

  @IsString()
  @IsOptional()
  offset: string;
}
