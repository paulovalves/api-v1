import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresConfigModule } from './postgres/postgres.config.module';
import { PostgresConfigService } from './postgres/postgres.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostgresConfigModule,
  ],
  providers: [PostgresConfigService],
})
export class DatabaseConfigModule {}
