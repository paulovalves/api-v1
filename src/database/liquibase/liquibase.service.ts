import { LiquibaseConfig } from '@/database/liquibase/liquibase.config';
import { PostgresConfigService } from '@/database/config/postgres/postgres.config.service';
import { AppConfig } from '@/config/app/app.config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LiquibaseService {
  constructor(
    private readonly postgresConfigService: PostgresConfigService,
    private readonly appConfig: AppConfig,
  ) {}

  getConfig() {
    return LiquibaseConfig;
  }
}
