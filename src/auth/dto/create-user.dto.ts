import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ description: 'Email', minimum: 1, default: 1 })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password', minimum: 1, default: 1 })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({
    description: 'Needed a full name',
    minimum: 1,
    default: 1,
    type: String,
  })
  @IsString()
  fullName: string;
}
