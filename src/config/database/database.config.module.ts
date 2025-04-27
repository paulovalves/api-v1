import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresConfigModule } from './postgres/postgres.config.module';
import { PostgresConfigService } from './postgres/postgres.config.service';
import { TypeormPostgresConfig } from '@/config/database/typeorm/typeorm.postgres.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostgresConfigModule,
  ],
  providers: [
    PostgresConfigService,
    {
      provide: TypeormPostgresConfig,
      useClass: TypeormPostgresConfig,
    },
  ],
  exports: [TypeormPostgresConfig],
})
export class DatabaseConfigModule {}
