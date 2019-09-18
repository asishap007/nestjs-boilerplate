import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsNotEmpty,
  IsEmpty,
} from 'class-validator';

export class RegisterDto {
  @ApiModelProperty({ description: 'First name' })
  @IsString()
  @IsEmpty()
  firstName: string;
  @ApiModelProperty({ description: 'Last name' })
  lastName: string;
  @ApiModelProperty({ description: 'Email Id' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiModelProperty({ description: 'Password' })
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(8)
  password: string;
}
