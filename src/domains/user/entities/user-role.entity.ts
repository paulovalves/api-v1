import { BaseEntity } from '@/domains/common/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserEntity } from '@/domains/user/entities/user.entity';

@Entity('user_role')
export class UserRoleEntity extends BaseEntity {
  constructor(id: number, name: string, description: string) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
  }

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

  static fromId(id: number): UserRoleEntity {
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
        throw new Error('Invalid user role ID');
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
