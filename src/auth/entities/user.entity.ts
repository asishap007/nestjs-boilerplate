import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserRole } from './user-role.entity';

@Entity()
export class User extends BaseEntity {
  constructor(firstName: string, lastName: string, email: string) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ type: 'timestamptz', nullable: true })
  resetPasswordTokenExpiry: Date;

  @OneToMany(type => UserRole, userRole => userRole.user)
  userRoles: UserRole[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
