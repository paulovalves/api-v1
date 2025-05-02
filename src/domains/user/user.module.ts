import { Module } from '@nestjs/common';
import { UserService, UserController, UserEntity } from '@/domains/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLogModule } from '@/common/audit/audit-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuditLogModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule],
})
export class UserModule {}
