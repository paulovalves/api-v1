import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEntity } from '../entities/user-role.entity';
import { UserEntity } from '../entities/user.entity';

export class UserInputDto {
  constructor() {}

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: UserRoleEntity;

  static toUserInputDto(user: UserEntity): UserInputDto {
    const dto = new UserInputDto();
    dto.name = user.name;
    dto.email = user.email;
    dto.password = user.password;
    return dto;
  }
}
