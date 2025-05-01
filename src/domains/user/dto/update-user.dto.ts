import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UserEntity } from '@/domains/user/entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  private id: number;
  constructor(
    id: number,
    name?: string,
    email?: string,
    password?: string,
    role?: string,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
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
