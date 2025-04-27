import { Module } from '@nestjs/common';
import { PostgresConfigService } from './postgres.config.service';
import { TypeormPostgresConfig } from '@/database/typeorm/typeorm.postgres.config';
import { ConfigModule } from '@/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [
    PostgresConfigService,
    TypeormPostgresConfig,
  ],
  exports: [
    PostgresConfigService,
    TypeormPostgresConfig,
  ],
})
export class PostgresConfigModule {}
