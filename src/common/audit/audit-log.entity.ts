import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('audit_log')
export class AuditLogEntity {
  constructor(
    table_name: string,
    record_id: string,
    column_name: string,
    old_value: string,
    new_value: string,
    changed_by: string,
    changed_at: Date,
  ) {
    this.table_name = table_name;
    this.record_id = record_id;
    this.column_name = column_name;
    this.old_value = old_value;
    this.new_value = new_value;
    this.changed_by = changed_by;
    this.changed_at = changed_at;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  table_name: string;

  @Column()
  record_id: string;

  @Column({ nullable: true })
  column_name: string;

  @Column({ type: 'text', nullable: true })
  old_value: string | null;

  @Column({ type: 'text', nullable: true })
  new_value: string;

  @Column()
  changed_by: string;

  @CreateDateColumn()
  changed_at: Date;
}
