import { UserEntity } from '@/domains/user/entities/user.entity';
import { UserRoleEntity } from '@/domains/user/entities/user-role.entity';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: UserRoleEntity;

  constructor(name: string, email: string, password: string, roleId: number) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = UserRoleEntity.fromId(roleId);
  }

  static toCreateDto(user: UserEntity) {
    return new CreateUserDto(
      user.name,
      user.email,
      user.password,
      user.roleId,
    );
  }
}
