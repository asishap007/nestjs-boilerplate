import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './repository/user.repository';
import { RegisterDto, LoginDto, ResetPasswordDto } from './auth.dto';
import { AppError, AppErrorTypeEnum } from '../shared/exception-filters/AppError';
import { HelperService } from '../shared/services/helper.service';
import { EmailService } from '../shared/services/email.service';

@Injectable()
export class AuthService {
  constructor(
    private helperService: HelperService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(registerDto: RegisterDto): Promise<any> {
    registerDto.password = this.helperService.generateUUID();
    // tslint:disable-next-line: no-console
    console.log('user password', registerDto.password);
    try {
      const user = await this.userRepository.createUser(registerDto);
      await this.resetPasswordLink(
        user.id,
        'resetPassword',
        'ICX-Change Password',
        { name: `${user.firstName} ${user.lastName}` },
        [`${user.email}`],
      );
      return this.helperService.omit(user, ['password']);
    } catch (exception) {
      if (exception.code === '23505') {
        // Duplicate user
        throw new AppError(AppErrorTypeEnum.USER_EXISTS);
      } else {
        throw new HttpException(exception.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.userRepository.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const userResponse: any = this.helperService.omit(user, ['password']);
    const accessToken: string = this.jwtService.sign(userResponse);
    userResponse.jwtToken = accessToken;
    return userResponse;
  }

  async resetPasswordLink(id, templateName, subject, locals, toEmails): Promise<void> {
    const resetPasswordToken = this.helperService.getRandomKeys();
    const resetPasswordTokenExpireDate = this.helperService.addHours(5);
    const user = await this.userRepository.updateResetToken(id, resetPasswordToken, resetPasswordTokenExpireDate);
    locals.token = `http://localhost/changepassword?resetToken=${user.resetPasswordToken}`;
    this.emailService.sendEmail(templateName, locals, subject, toEmails);
  }

  async changePassword(resetPasswordDto: ResetPasswordDto) {
    return this.userRepository.changePassword(resetPasswordDto);
  }
}
