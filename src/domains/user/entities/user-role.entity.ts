import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '@/domains/user/entities';

@Entity('user_role')
export class UserRoleEntity {
  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id_user-role' })
  @Column({ type: 'bigint', name: 'id_user_role', generatedIdentity: 'ALWAYS', primary: true })
  id: number;

  @Column({ type: 'varchar', name: 'name' })
  name: string;
  @Column({ type: 'varchar', name: 'description' })
  description: string;
  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];

  static toUserRole(userRole: UserRoleEntity): UserRoleEntity {
    const dto = new UserRoleEntity(
      userRole.id,
      userRole.name,
      userRole.description,
    );
    return dto;
  }

  static fromId(param: number | string): UserRoleEntity {
    const id = typeof param === 'string' ? parseInt(param) : param;
    if (!id) {
      throw new Error('Invalid user role ID: ' + id);
    }
    switch (id) {
      case 1:
        return new UserRoleEntity(
          1,
          'ADMIN',
          'Administrator role with full access',
        );
      case 2:
        return new UserRoleEntity(
          2,
          'USER',
          'Regular user role with limited access',
        );
      case 3:
        return new UserRoleEntity(
          3,
          'GUEST',
          'Guest user role with minimal access',
        );
      default:
        throw new Error('Invalid user role ID: ' + id);
    }
  }

  static fromName(name: string): UserRoleEntity {
    switch (name) {
      case 'ADMIN':
        return new UserRoleEntity(
          1,
          'Admin',
          'Administrator role with full access',
        );
      case 'USER':
        return new UserRoleEntity(
          2,
          'User',
          'Regular user role with limited access',
        );
      case 'GUEST':
        return new UserRoleEntity(
          3,
          'Guest',
          'Guest user role with minimal access',
        );
      default:
        throw new Error('Invalid user role name');
    }
  }
}
