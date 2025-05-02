import { UserRoleEntity } from '@/domains/user/entities/user-role.entity';
import { ApiProperty } from '@nestjs/swagger';
import { FindOptionsWhere } from 'typeorm';
import { UserEntity } from '@/domains/user/entities/user.entity';

export class UserFilterEntity {
  @ApiProperty({ name: 'id', type: 'number' })
  id?: number | null;
  @ApiProperty({ name: 'name', type: 'string' })
  name?: string | null;
  @ApiProperty({ name: 'email', type: 'string' })
  email?: string | null;
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
    name: 'createdAt',
    format: 'YYYY-MM-DD HH:mm:ss',
    example: '',
  })
  createdAt?: Date | null;
  @ApiProperty({
    name: 'updatedAt',
    format: 'YYYY-MM-DD HH:mm:ss',
    example: '',
  })
  updatedAt?: Date | null;
  @ApiProperty({
    name: 'deletedAt',
    format: 'YYYY-MM-DD HH:mm:ss',
    example: '',
  })
  deletedAt?: Date | null;
  @ApiProperty({ name: 'isActive', type: 'boolean' })
  isActive: boolean | null;

  static queryBuilder(filter: UserFilterEntity): FindOptionsWhere<UserEntity> {
    const where: FindOptionsWhere<UserEntity> = {};

    if (filter.id) where.id = filter.id;
    if (filter.name) where.name = filter.name;
    if (filter.email) where.email = filter.email;
    if (filter.role) where.role = { id: filter.role.id };
    if (filter.createdAt) where.status = { createdAt: filter.createdAt };
    if (filter.updatedAt) where.status = { updatedAt: filter.updatedAt };
    if (filter.deletedAt) where.status = { deletedAt: filter.deletedAt };
    if (filter.isActive) where.status = { isActive: filter.isActive };

    return where;
  }
}
