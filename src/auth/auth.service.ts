import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './auth.dto';
import {
  AppError,
  AppErrorTypeEnum,
} from '../shared/exception-filters/AppError';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(registerDto: RegisterDto): Promise<any> {
    return this.userRepository.createUser(registerDto).catch((err: any) => {
      if (err.code === '23505') {
        // Duplicate user
        throw new AppError(AppErrorTypeEnum.USER_EXISTS);
      } else {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  }
}
