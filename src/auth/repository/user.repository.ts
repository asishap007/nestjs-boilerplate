import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterDto } from '../auth.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  createUser(registerDto: RegisterDto): Promise<any> {
    const { firstName, lastName, email, password } = registerDto;
    const user = new User(firstName, lastName, email);
    user.password = password;
    return user.save();
  }
}
