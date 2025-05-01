import { AppConfig } from '@/config/app/app.config';

export class AppCOnfigService {
  private appConfig: AppConfig;

  constructor() {}

  getAppName(): string {
    return this.appConfig.getAppName();
  }

  getAppVersion(): string {
    return this.appConfig.getAppVersion();
  }

  getAppPort(): number {
    return this.appConfig.getAppPort();
  }

  getRootPath(): string {
    return this.appConfig.getRootPath();
  }

  getMigrationsPath(): string {
    return this.appConfig.getMigrationsPath();
  }

  getAppEnv(): string {
    return this.appConfig.getAppEnv();
  }
}