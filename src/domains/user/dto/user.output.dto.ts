import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user-role';
import { UserEntity } from '../entities/user.entity';

export class UserOutputDto {
  constructor(
    id: number,
    name: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
    role: UserRole,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
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
  role: UserRole;

  static toUserOutputDto(user: UserEntity): UserOutputDto {
    return new UserOutputDto(
      user.id,
      user.name,
      user.email,
      user.createdAt,
      user.updatedAt,
      user.role,
    );
  }
}
