import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { RegisterDto, LoginDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  createUser(@Body(ValidationPipe) registerDto: RegisterDto): Promise<any> {
    return this.authService.createUser(registerDto);
  }

  @Post('/login')
  login(@Body(ValidationPipe) loginDto: LoginDto): Promise<any> {
    return this.authService.login(loginDto);
  }
}
