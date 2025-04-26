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
export class User {
  constructor() {}

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  role: UserRole;

  static fromInput(dto: UserInputDto): User {
    const user = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;
    user.createdAt = dto.createdAt;
    user.updatedAt = dto.updatedAt;
    return user;
  }

  static fromOutput(dto: UserOutputDto): User {
    const user = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.createdAt = dto.createdAt;
    user.updatedAt = dto.updatedAt;
    return user;
  }
}
