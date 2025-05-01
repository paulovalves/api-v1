import { UserEntity } from '@/domains/user/entities/user.entity';
import { UserRoleEntity } from '@/domains/user/entities/user-role.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ name: 'name', type: 'string', nullable: false })
  name: string;
  @ApiProperty({ name: 'email', type: 'string', nullable: false, example: 'any@email.com' })
  email: string;
  @ApiProperty({ name: 'password', type: 'string', nullable: false, example: 'password' })
  password: string;
  @ApiProperty({
    name: 'role', type: UserRoleEntity, nullable: false,
    enum: [
      UserRoleEntity.fromId(1),
      UserRoleEntity.fromId(2),
      UserRoleEntity.fromId(3)]
  })
  role: UserRoleEntity;

  constructor(name: string, email: string, password: string, roleId: number) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = UserRoleEntity.fromId(roleId);
  }

  static toCreateDto(user: UserEntity) {
    return new CreateUserDto(
      user.name,
      user.email,
      user.password,
      user.roleId,
    );
  }
}
