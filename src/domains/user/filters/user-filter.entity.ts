import { UserRoleEntity } from '@/domains/user/entities/user-role.entity';
import { ApiProperty } from '@nestjs/swagger';
import { FindOptionsWhere } from 'typeorm';
import { UserEntity } from '@/domains/user/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '@/domains/user';
import { UserStatusEntity } from '@/domains/user/entities/user-status.entity';

export class UserFilterEntity {
  constructor(
    entity: CreateUserDto | UpdateUserDto | UserEntity,
    status: UserStatusEntity | null,
  ) {
    this.id = entity.id;
    this.name = entity.name;
    this.email = entity.email;
    this.role = entity.role;
    if (status) {
      this.created_at = status.created_at;
      this.updated_at = status.updated_at;
      this.deleted_at = status.deleted_at;
      this.is_active = status.is_active;
    }
  }

  @ApiProperty({ name: 'id', type: 'number' })
  id: number | null | undefined = null;

  @ApiProperty({ name: 'name', type: 'string' })
  name: string | null = null;

  @ApiProperty({ name: 'email', type: 'string' })
  email: string | null = null;

  @ApiProperty({
    name: 'role',
    enumName: 'UserRoleEntity',
    enum: [
      UserRoleEntity.fromId(1),
      UserRoleEntity.fromId(2),
      UserRoleEntity.fromId(3),
    ],
  })
  role?: UserRoleEntity | null;

  @ApiProperty({
    name: 'created_at',
    format: 'YYYY-MM-DD HH:mm:ss',
    example: '',
  })
  created_at: Date | null = null;

  @ApiProperty({
    name: 'updated_at',
    format: 'YYYY-MM-DD HH:mm:ss',
    example: '',
  })
  updated_at: Date | null = null;

  @ApiProperty({
    name: 'deleted_at',
    format: 'YYYY-MM-DD HH:mm:ss',
    example: '',
  })
  deleted_at: Date | null = null;

  @ApiProperty({ name: 'is_active', type: 'boolean' })
  is_active: boolean | null;

  @ApiProperty({ name: 'documento', type: 'string' })
  documento: string | null;

  static queryBuilder(filter: UserFilterEntity): FindOptionsWhere<UserEntity> {
    const where: FindOptionsWhere<UserEntity> = {};

    if (filter.id) where.id = filter.id;
    if (filter.name) where.name = filter.name;
    if (filter.email) where.email = filter.email;
    if (filter.role) where.role = { id: filter.role.id };
    if (filter.created_at) where.status = { created_at: filter.created_at };
    if (filter.updated_at) where.status = { updated_at: filter.updated_at };
    if (filter.deleted_at) where.status = { deleted_at: filter.deleted_at };
    if (filter.is_active) where.status = { is_active: filter.is_active };

    return where;
  }
}
