import { CreateUserDto } from '@/domains/user/dto/create-user.dto';
import { UserEntity } from '@/domains/user/entities/user.entity';
import { UserRoleEntity } from '@/domains/user/entities/user-role.entity';

export class UpdateUserDto extends CreateUserDto {
  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    role: UserRoleEntity,
  ) {
    super(name, email, password, role);
    this.id = id;
  }

  static toUpdateDto(user: UserEntity) {
    return new UpdateUserDto(
      user.id,
      user.name,
      user.email,
      user.password,
      user.role,
    );
  }
}
