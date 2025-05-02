import { UserEntity } from '@/domains/user/entities/user.entity';
import { UserRoleEntity } from '@/domains/user/entities/user-role.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Property } from '@/common/decorators/decorator.common';

/**
 * @description DTO for creating a user
 * @class CreateUserDto
 * @property {number} _id - The ID of the user
 * @property {string} _name - The name of the user
 * @property {string} _email - The email of the user
 * @property {string} _password - The password of the user
 * @property {UserRoleEntity} _role - The role of the user
 */
export class CreateUserDto {
  @ApiProperty({ name: 'id', type: 'number', nullable: true, example: 1 })
  id?: number | null;

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

  constructor(
    name: string,
    email: string,
    password: string,
    role: UserRoleEntity,
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  static toCreateDto(user: UserEntity) {
    return new CreateUserDto(user.name, user.email, user.password, user.role);
  }
}
