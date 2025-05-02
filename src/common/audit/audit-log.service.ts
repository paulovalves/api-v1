import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLogEntity } from './audit-log.entity';
import { TableEnum } from '@/database/config/db/tables';
import { UpdateUserDto, UserEntity } from '@/domains/user';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLogEntity)
    private readonly auditRepo: Repository<AuditLogEntity>,
  ) {}

  async createAuditLog(
    table_name: TableEnum,
    updateUserDto: UpdateUserDto,
    user: UserEntity,
    id: number,
  ) {
    const changes = {};
    for (const key of Object.keys(updateUserDto)) {
      if (updateUserDto[key] !== user[key]) {
        changes[key] = {
          old: user[key],
          new: updateUserDto[key],
        };
      }
    }

    Object.assign(changes, updateUserDto);
    await this.logChange(
      table_name,
      id.toString(),
      changes,
      user.id.toString(),
    );
  }
  async logChange(
    table: string,
    recordId: string,
    changes: Record<string, { old: any; new: any }>,
    changedBy: string,
  ) {
    const entries = Object.entries(changes).map(
      ([column, { old, new: newVal }]) =>
        this.auditRepo.create(
          new AuditLogEntity(
            table,
            recordId,
            column,
            old ? old.toString() : null,
            newVal,
            changedBy,
            new Date(),
          ),
        ),
    );
    await this.auditRepo.save(entries);
  }
}
