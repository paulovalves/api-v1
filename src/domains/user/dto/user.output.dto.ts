import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEntity } from '../entities/user-role.entity';
import { UserEntity } from '../entities/user.entity';

export class UserOutputDto {
  constructor(id: number, name: string, email: string, role: UserRoleEntity) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  role: UserRoleEntity;

  static toUserOutputDto(user: UserEntity): UserOutputDto {
    return new UserOutputDto(user.id, user.name, user.email, user.role);
  }
}
