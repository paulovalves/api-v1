import { Module } from '@nestjs/common';
import { UserService, UserController, UserEntity } from '@/domains/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleEntity, UserStatusEntity } from './entities';
import { UserStatusService } from './user-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserStatusEntity, UserRoleEntity])],
  controllers: [UserController],
  providers: [UserService, UserStatusService],
  exports: [TypeOrmModule],
})
export class UserModule {}
