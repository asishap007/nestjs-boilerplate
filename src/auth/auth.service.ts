import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto, LoginDto } from './auth.dto';
import {
  AppError,
  AppErrorTypeEnum,
} from '../shared/exception-filters/AppError';
import { HelperService } from '../shared/services/helper.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private helperService: HelperService,
    private readonly jwtService: JwtService,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(registerDto: RegisterDto): Promise<any> {
    registerDto.password = this.helperService.generateUUID();
    // tslint:disable-next-line: no-console
    console.log('user password', registerDto.password);
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
}
