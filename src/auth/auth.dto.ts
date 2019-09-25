import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @ApiModelProperty({ description: 'First name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @ApiModelProperty({ description: 'Last name' })
  lastName: string;
  @ApiModelProperty({ description: 'Email Id' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  password: string;
}

export class LoginDto {
  @ApiModelProperty({ description: 'Email Id' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiModelProperty({ description: 'Password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
