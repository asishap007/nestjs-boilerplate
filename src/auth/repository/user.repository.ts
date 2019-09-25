import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterDto } from '../auth.dto';
import { Injectable } from '@nestjs/common';
import { HelperService } from '../../shared/services/helper.service';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor(private readonly helperService: HelperService) {
    super();
  }
  createUser(registerDto: RegisterDto): Promise<any> {
    this.helperService.test();
    const { firstName, lastName, email, password } = registerDto;
    const user = new User(firstName, lastName, email);
    user.password = password;
    return user.save();
  }
}
