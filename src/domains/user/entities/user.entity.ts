import { UserRole } from './user-role';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserInputDto } from '../dto/user.input.dto';
import { UserOutputDto } from '../dto/user.output.dto';

@Entity()
export class UserEntity {
  constructor() {}

  @PrimaryGeneratedColumn()
  id: number;

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
