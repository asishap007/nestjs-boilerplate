import { PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity()
export class UserRole {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => User, user => user.userRoles, { primary: true })
    user: User;

    @ManyToOne(type => Role, role => role.userRoles, { primary: true })
    role: Role;
}
