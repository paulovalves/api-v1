import { DataSourceOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PostgresConfigService } from '@/database/config/postgres/postgres.config.service';
import { AppConfig } from '@/config/app/app.config';

@Injectable()
export class TypeormPostgresConfig {
  constructor(private postgresConfigService: PostgresConfigService, private appConfig: AppConfig) {}

  get(): DataSourceOptions {
    const isDev = process.env.NODE_ENV !== 'production';

    const migrationsPath = isDev
      ? 'src/database/migrations/*{.ts}'
      : 'dist/database/migrations/*{.js}';

    const entitiesPath = isDev
      ? 'src/domains/**/entities/*.entity{.ts}'
      : 'dist/domains/**/entities/*.entity{.js}';

    return {
      type: 'postgres',
      host: this.postgresConfigService.getHost(),
      port: this.postgresConfigService.getPort(),
      username: this.postgresConfigService.getUsername(),
      password: this.postgresConfigService.getPassword(),
      synchronize: this.postgresConfigService.isSync(),
      database: this.postgresConfigService.getDatabase(),
      entities: [entitiesPath],
      migrations: [migrationsPath],
      migrationsTableName: 'migrations',
      migrationsRun: true,
    };
  }
}
