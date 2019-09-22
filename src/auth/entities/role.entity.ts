import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';
import { UserRole } from './user-role.entity';
import { RolePermission } from './role-permission.entity';
import { BaseInfo } from './base-info';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column(type => BaseInfo, { prefix: false })
  info: BaseInfo;

  @OneToMany(type => UserRole, userRole => userRole.role)
  userRoles: UserRole[];

  @OneToMany(type => RolePermission, rolePermission => rolePermission.role)
  rolePermissions: RolePermission[];
}
