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

  @ApiProperty({ name: 'id', type: Number })
  id: number;

  @ApiProperty({ name: 'name', type: String })
  name: string;

  @ApiProperty({ name: 'email', type: String })
  email: string;

  @ApiProperty({
    name: 'role',
    type: UserRoleEntity,
    nullable: false,
    enum: [
      UserRoleEntity.fromId(1),
      UserRoleEntity.fromId(2),
      UserRoleEntity.fromId(3),
    ],
  })
  role: UserRoleEntity;

  static toUserOutputDto(user: UserEntity): UserOutputDto {
    return new UserOutputDto(
      user.id,
      user.name,
      user.email,
      UserRoleEntity.fromId(user.role.id),
    );
  }
}
