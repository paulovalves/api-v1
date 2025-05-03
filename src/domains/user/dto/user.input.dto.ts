import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEntity } from '../entities/user-role.entity';
import { UserEntity } from '../entities/user.entity';
import { Property } from '@/common/decorators/decorator.common';

export class UserInputDto {

  @ApiProperty({ name: 'id', type: 'number', nullable: true, example: 1 })
  @Property({
    getter: (value: number | null) => value,
    setter: (value: number | null) => value,
  })
  id: number;

  @ApiProperty({ name: 'name', type: 'string', nullable: false })
  name: string;

  @ApiProperty({
    name: 'email',
    type: 'string',
    nullable: false,
    example: 'any@email.com',
  })
  email: string;

  @ApiProperty({
    name: 'password',
    type: 'string',
    nullable: false,
    example: 'password',
  })
  password: string;

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

  static toUserInputDto(user: UserEntity): UserInputDto {
    const dto = new UserInputDto();
    dto.name = user.name;
    dto.email = user.email;
    dto.password = user.password;
    dto.role = UserRoleEntity.fromId(Number(user.role.id));
    return dto;
  }
}
