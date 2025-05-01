import { Module } from '@nestjs/common';
import { TypeormDatabaseService } from '@/database/typeorm/typeorm.database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigModule } from '@/database/config/postgres/postgres.config.module';
import { randomUUID } from 'crypto';

@Module({
  imports: [
    PostgresConfigModule,
    TypeOrmModule.forRootAsync({
    imports: [PostgresConfigModule],
      useClass: TypeormDatabaseService,
    })
  ],
  providers: [TypeormDatabaseService],
  exports: [TypeormDatabaseService],
})
export class TypeormDatabaseModule {}
