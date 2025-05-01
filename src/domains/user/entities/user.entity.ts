import { UserRoleEntity } from './user-role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserInputDto } from '../dto/user.input.dto';
import { UserOutputDto } from '../dto/user.output.dto';
import { BaseEntity } from '@/domains/common/entities/base.entity';

@Entity()
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
