import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config/dist/config.module';
import { AuditService } from '@/common/audit/audit-log.service';
import { AuditLogEntity } from '@/common/audit/audit-log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuditLogEntity]),
    NestConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [AuditService],
  exports: [AuditService],
})
export class AuditLogModule {}
