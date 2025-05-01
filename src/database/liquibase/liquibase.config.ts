import { Liquibase } from 'liquibase';
import { PostgresConfigService } from '@/database/config/postgres/postgres.config.service';
import { AppConfig } from '@/config/app/app.config';

export class LiquibaseConfig {

  private static instance: LiquibaseConfig;
  private static isInitialized = false;
  private static isRunning = false;
  private static isUpdated = false;
  private static isRollback = false;

  constructor(private postgresConfigService: PostgresConfigService, private appConfig: AppConfig) {}

  getLiquibaseConfig(): Liquibase {
    return new Liquibase({
      url: this.postgresConfigService.getHost(),
      username: this.postgresConfigService.getUsername(),
      password: this.postgresConfigService.getPassword(),
      changeLogFile: this.appConfig.getChangeLogFilePath(),
      classpath: this.appConfig.getClassPath()
    });
  }

  async update(): Promise<void> {
    if (LiquibaseConfig.isRunning) {
      return;
    }
    LiquibaseConfig.isRunning = true;
    try {
      const liquibase = this.getLiquibaseConfig();
      await this.getLiquibaseConfig().update({ contexts: this.appConfig.getChangeLogFilePath() });
      LiquibaseConfig.isUpdated = true;
    } catch (error) {
      console.error('Error updating database:', error);
    } finally {
      LiquibaseConfig.isRunning = false;
    }
  }
}