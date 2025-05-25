import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserRoleEntity } from '@/domains/user/entities/user-role.entity';
import { UserStatusEntity } from '@/domains/user/entities/user-status.entity';
import { CreateUserDto } from '@/domains/user/dto/create-user.dto';

/**
 * UserEntity
 *
 * @description Entidade que representa um usuário do sistema.
 * @extends BaseEntity
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

  @Column({ type: 'bigint', name: 'id_user', generatedIdentity: 'ALWAYS' })
  id: number;

  @Column({ type: 'varchar', name: 'name', unique: true, length: 255 })
  name: string;

  @Column({ type: 'varchar', name: 'email', unique: true, length: 255 })
  email: string;

  @Column({ type: 'varchar', name: 'password', length: 255 })
  password: string;

  @ManyToOne(() => UserRoleEntity, { eager: true })
  @JoinColumn({ name: 'id_role' })
  role: UserRoleEntity;

  @ManyToOne(() => UserStatusEntity, { eager: true })
  @JoinColumn({ name: 'id_status' })
  status: UserStatusEntity;

  /**
   * Converte um objeto DTO para a entidade UserEntity.
   *
   * @param { CreateUserDto } dto - Objeto DTO a ser convertido.
   *
   */
  toUser(dto: CreateUserDto) {
    if (dto.id) {
      this.id = dto.id;
    }
    this.name = dto.name;
    this.email = dto.email;
    this.password = dto.password;
    this.role = dto.role;
  }
}
