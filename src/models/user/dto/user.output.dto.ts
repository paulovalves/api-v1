import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user-role';
import { User } from '../entities/user.entity';

export class UserOutputDto {
  constructor() {}

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
  role: UserRole;

  static toUserOutputDto(user: User): UserOutputDto {
    const dto = new UserOutputDto();
    dto.name = user.name;
    dto.email = user.email;
    dto.createdAt = user.createdAt;
    dto.updatedAt = user.updatedAt;
    return dto;
  }
}
