import { DataSourceOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PostgresConfigService } from '@/config/database/postgres/postgres.config.service';

@Injectable()
export class TypeormPostgresConfig {
  constructor(private  postgresConfigService: PostgresConfigService) {}
  get(): DataSourceOptions {
    return {
      type: 'postgres',
      host: this.postgresConfigService.getHost(),
      port: this.postgresConfigService.getPort(),
      username: this.postgresConfigService.getUsername(),
      password: this.postgresConfigService.getPassword(),
      synchronize: this.postgresConfigService.isSync(),
      entities: [__dirname + '/../../models/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../../migrations/**/*{.ts,.js}'],
      migrationsTableName: 'migrations',
      migrationsRun: true,
    };
  }
}