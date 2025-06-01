import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateUserDto } from '@/domains/user/dto/create-user.dto';
import { UserRoleEntity, UserStatusEntity } from '@/domains/user/entities';
import UserBuilder from '../builders/user.builder';
import { converteData } from '@/utils/date.utils';

/**
 * {@link UserEntity}
 *
 * @description Entidade que representa um usuário do sistema.
 * @property {string} name - Nome do usuário.
 * @property {string} email - E-mail do usuário.
 * @property {string} password - Senha do usuário.
 * @property {UserRoleEntity} role - Papel do usuário.
 * @property {UserStatusEntity} status - Status do usuário.
 *
 */
@Entity('users')
export class UserEntity {
  constructor() {}

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  @Column({
    type: 'bigint',
    name: 'id',
    generatedIdentity: 'ALWAYS',
    primary: true,
  })
  id: number;

  @Column({ type: 'varchar', name: 'name', unique: true, length: 255 })
  name: string;

  @Column({ type: 'varchar', name: 'email', unique: true, length: 255 })
  email: string;

  @Column({ type: 'varchar', name: 'password', length: 255 })
  password: string;

  @Column({ name: 'dob', nullable: false })
  date_of_birth: Date;

  @ManyToOne(() => UserRoleEntity)
  @JoinColumn({ name: 'id_userrole' })
  role: UserRoleEntity;

  @ManyToOne(() => UserStatusEntity)
  @JoinColumn({ name: 'id_current_status' })
  status: UserStatusEntity;

  /**
   * Converte um objeto DTO para a entidade UserEntity.
   *
   * @param { CreateUserDto } dto - Objeto DTO a ser convertido.
   *
   */
  toUser(dto: CreateUserDto, status: UserStatusEntity) {
    console.log("dto:", dto);
    const parsed = converteData(dto.date_of_birth);
    if (dto.id) {
      this.id = dto.id;
    }
    this.name = dto.name;
    this.email = dto.email;
    this.password = dto.password;
    this.date_of_birth = converteData(dto.date_of_birth);
    this.role = UserRoleEntity.fromId(dto.role.id);
    this.status = status;
    console.log("this", this);
  }

  toEntity(dto: CreateUserDto, status: UserStatusEntity) {
    const user = UserBuilder;
      if(dto.id) user.builder().id(dto.id);
         
      user.builder()
        .name(dto.name)
        .email(dto.email)
        .password(dto.password)
        .dob(new Date(dto.date_of_birth))
        .role(UserRoleEntity.fromId(dto.role.id))
        .status(status)
        .build();

        return user;
  }
}
