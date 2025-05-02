import { Module } from '@nestjs/common';
import { LiquibaseService } from '@/database/liquibase/liquibase.service';
import { PostgresConfigService } from '@/database/config/postgres/postgres.config.service';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@/config/app/app.config';

@Module({
  providers: [PostgresConfigService, LiquibaseService, AppConfig],
  exports: [LiquibaseService],
})
export class LiquibaseModule {}
