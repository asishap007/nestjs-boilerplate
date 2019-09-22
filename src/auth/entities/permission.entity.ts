import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';
import { BaseInfo } from './base-info';
import { RolePermission } from './role-permission.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(type => BaseInfo, { prefix: false })
  info: BaseInfo;

  @OneToMany(type => RolePermission, rolePermisson => rolePermisson.permisssion)
  rolePermissions: RolePermission[];
}
