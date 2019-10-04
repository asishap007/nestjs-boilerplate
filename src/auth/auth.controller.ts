import { Controller, Post, Body, ValidationPipe, Get } from '@nestjs/common';
import { RegisterDto, LoginDto, ResetPasswordDto } from './auth.dto';
import { AuthService } from './auth.service';
import { EmailService } from '../shared/services/email.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly emailService: EmailService) {}
  @Post('/register')
  createUser(@Body(ValidationPipe) registerDto: RegisterDto): Promise<any> {
    return this.authService.createUser(registerDto);
  }

  @Post('/login')
  login(@Body(ValidationPipe) loginDto: LoginDto): Promise<any> {
    return this.authService.login(loginDto);
  }

  @Get('/sendEmail')
  sendEmail(): Promise<any> {
    const locals = { token: 'http://www.google.com', name: 'John Snow' };
    const toEmails = ['asish.a@tataelxsi.co.in', 'asishap007@gmail.com'];
    return this.emailService.sendEmail('resetPassword', locals, 'ICX-Change Password', toEmails);
  }

  @Post('/changePassword')
  changePassword(@Body(ValidationPipe) resetPasswordDto: ResetPasswordDto): Promise<any> {
    return this.authService.changePassword(resetPasswordDto);
  }
}
