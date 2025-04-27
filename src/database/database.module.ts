import { Module } from '@nestjs/common';
import { TypeormDatabaseModule } from '@/database/typeorm/typeorm.database.module';
import { PostgresConfigModule } from '@/database/config/postgres/postgres.config.module';

@Module({
  imports: [
    TypeormDatabaseModule,
    PostgresConfigModule,
  ],
  exports: [TypeormDatabaseModule, PostgresConfigModule],
})
export class DatabaseModule {}
