import { Column, Entity, JoinColumn } from 'typeorm';
import { BaseEntity } from '@/domains/common/entities/base.entity';

@Entity('user_status')
export class UserStatusEntity extends BaseEntity {
  constructor(
    id: number,
    id_user: number,
    description: string,
    created_at: Date,
    updated_at: Date,
    deletedAt: Date,
    isActive: boolean,
  ) {
    super();
    this.id = id;
    this.id_user = id_user;
    this.description = description;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
    this.deletedAt = deletedAt;
    this.isActive = isActive;
  }

  @JoinColumn({
    name: 'id_user',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_user_status_user',
  })
  id_user: number;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'created_at', nullable: false })
  createdAt: Date;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @Column({ name: 'is_active', nullable: false })
  isActive: boolean;
}
