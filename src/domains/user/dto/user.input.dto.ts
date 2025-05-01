import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user-role';
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
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  role: UserRole;

  static toUserInputDto(user: UserEntity): UserInputDto {
    const dto = new UserInputDto();
    dto.name = user.name;
    dto.email = user.email;
    dto.password = user.password;
    dto.createdAt = user.createdAt;
    dto.updatedAt = user.updatedAt;
    return dto;
  }
}
