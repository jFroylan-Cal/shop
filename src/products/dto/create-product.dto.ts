import { Genders } from '../../common/enums/gender.enum';
import {
  IsArray,
  IsEnum,
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
  IsInt,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  stock?: number;

  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @IsEnum(Genders)
  gender: Genders;
}
