import { DataSourceOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PostgresConfigService } from '@/database/config/postgres/postgres.config.service';
import { AppConfig } from '@/config/app/app.config';
import { UserRoleEntity } from '@/domains/user/entities/user-role.entity';
import { UserEntity } from '@/domains/user/entities/user.entity';
import { UserStatusEntity } from '@/domains/user/entities/user-status.entity';

@Injectable()
export class TypeormPostgresConfig {
  constructor(
    private readonly postgresConfigService: PostgresConfigService,
    private readonly appConfig: AppConfig,
  ) {}

  get(): DataSourceOptions {
    const isDev = process.env.NODE_ENV !== 'production';

    const migrationsPath = isDev
      ? 'src/database/migrations/*{.ts}'
      : 'dist/database/migrations/*{.js}';

    const entitiesPath = isDev
      ? 'src/domains/**/entities/*.entities{.ts}'
      : 'dist/domains/**/entities/*.entities{.js}';

    return {
      type: 'postgres',
      host: this.postgresConfigService.getHost(),
      port: this.postgresConfigService.getPort(),
      username: this.postgresConfigService.getUsername(),
      password: this.postgresConfigService.getPassword(),
      synchronize: false,
      database: this.postgresConfigService.getDatabase(),
      entities: [UserRoleEntity, UserEntity, UserStatusEntity],
      migrations: [migrationsPath],
      migrationsTableName: 'migrations',
      migrationsRun: true,
    };
  }
}
