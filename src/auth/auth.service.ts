import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './auth.dto';
import {
  AppError,
  AppErrorTypeEnum,
} from '../shared/exception-filters/AppError';
import { HelperService } from '../shared/services/helper.service';

@Injectable()
export class AuthService {
  constructor(
    private helperService: HelperService,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(registerDto: RegisterDto): Promise<any> {
    registerDto.password = this.helperService.generateUUID();
    return this.userRepository
      .createUser(registerDto)
      .then(res => {
        return this.helperService.omit(res, ['password']);
      })
      .catch((err: any) => {
        if (err.code === '23505') {
          // Duplicate user
          throw new AppError(AppErrorTypeEnum.USER_EXISTS);
        } else {
          throw new HttpException(
            err.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      });
  }

  // async login(loginDto: LoginDto) {}
}
