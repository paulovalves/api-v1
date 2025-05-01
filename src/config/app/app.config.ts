import { ConfigService } from '@nestjs/config';
import { AppConfigInterface } from '@/config/app/app-config.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfig extends ConfigService implements AppConfigInterface {

  constructor() {
    super();
  }

  getAppName(): string {
    return this.get<string>('APP_NAME') || '';
  }

  getAppVersion(): string {
    return this.getOrThrow<string>('APP_VERSION');
  }

  getAppPort(): number {
    return this.getOrThrow<number>('APP_LOCALHOST_PORT');
  }

  getAppEnv(): string {
    return this.getOrThrow<string>('TEST_NODE_ENV')!;
  }

  getRootPath(): string {
    return this.getOrThrow<string>('ROOT_LOCALHOST_PATH')!;
  }

  getMigrationsPath(): string {
    return this.getOrThrow<string>('MIGRATIONS_LOCALHOST_PATH')!;
  }

  getClassPath() {
    return this.getOrThrow<string>('CLASSPATH_LOCALHOST_PATH')!;
  }

  getChangeLogFilePath() {
    return this.getOrThrow<string>('CHANGELOG_LOCALHOST_PATH')!;
  }
}