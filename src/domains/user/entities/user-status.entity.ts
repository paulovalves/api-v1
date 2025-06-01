import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_status')
export class UserStatusEntity {
  constructor() {}

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  @Column({
    type: 'bigint',
    name: 'id',
    generatedIdentity: 'ALWAYS',
    primary: true,
  })
  id: number;

  @JoinColumn({
    name: 'id_user',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_userstatus_user',
  })
  id_user: number;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'created_at', nullable: false })
  created_at: Date;

  @Column({ name: 'updated_at', nullable: true })
  updated_at: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deleted_at: Date;

  @Column({ name: 'is_active', nullable: false })
  is_active: boolean;


}
