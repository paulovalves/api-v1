import {
  Column,
  Entity,
} from 'typeorm';
import { BaseEntity } from '@/domains/common/entities/base.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  constructor() {
    super();
  }

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'role_id' })
  roleId: number;

  toUser(dto: any) {
    this.id = dto.id;
    this.name = dto.name;
    this.email = dto.email;
    this.password = dto.password;
    this.roleId = dto.role;
  }
}
