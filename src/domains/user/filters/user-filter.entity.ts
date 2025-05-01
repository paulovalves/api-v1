import { UserRoleEntity } from '@/domains/user/entities/user-role.entity';

export class UserFilterEntity {
  id: number;
  name: string;
  email: string;
  role: UserRoleEntity;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  isActive: boolean;

  static queryBuilder(filter: UserFilterEntity) {
    const where = {};
    if (filter.id) {
      where['id'] = filter.id;
    }
    if (filter.name) {
      where['name'] = filter.name;
    }
    if (filter.email) {
      where['email'] = filter.email;
    }
    if (filter.role) {
      where['roleId'] = filter.role.id;
    }
    if(filter.createdAt) {
      where['createdAt'] = filter.createdAt;
    }
    if(filter.updatedAt) {
      where['updatedAt'] = filter.updatedAt;
    }
    if(filter.deletedAt) {
      where['deletedAt'] = filter.deletedAt;
    }
    if(filter.isActive) {
      where['isActive'] = filter.isActive;
    }
    return where;
  }
}