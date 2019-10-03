import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterDto, LoginDto } from '../auth.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  createUser(registerDto: RegisterDto): Promise<any> {
    const {
      firstName,
      lastName,
      email,
      password,
      resetPasswordToken,
      resetPasswordTokenExpireDate,
    } = registerDto;
    const user = new User(firstName, lastName, email);
    user.password = password;
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpiry = resetPasswordTokenExpireDate;
    return user.save();
  }

  async validateUser(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user: User = await this.findOne({ email });
    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  async updateResetToken(id, resetPasswordToken, resetPasswordTokenExpireDate) {
    const user: User = await this.findOne({ id });
    if (user) {
      user.resetPasswordToken = resetPasswordToken;
      user.resetPasswordTokenExpiry = resetPasswordTokenExpireDate;
    }
    return user.save();
  }
}
