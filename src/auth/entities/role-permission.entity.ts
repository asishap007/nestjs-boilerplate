import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Permission } from './permission.entity';
import { Role } from './role.entity';

@Entity()
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(type => Role, role => role.rolePermissions)
  role: Role;
  @ManyToOne(type => Permission, permission => permission.rolePermissions)
  permisssion: Permission;
}
