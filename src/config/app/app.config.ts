import { ConfigService } from '@nestjs/config';
import { AppConfigInterface } from '@/config/app/app-config.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfig implements AppConfigInterface {
  private readonly appName: string;
  private readonly appVersion: string;
  private readonly appPort: number;
  private readonly appEnv: string;
  private readonly rootPath: string;
  private readonly migrationsPath: string;

  constructor(private readonly configService: ConfigService) {
    this.appName = process.env.APP_NAME || 'MyApp';
    this.appVersion = process.env.APP_VERSION || '1.0.0';
  }

  getAppName(): string {
    return this.appName;
  }

  getAppVersion(): string {
    return this.appVersion;
  }

  getAppPort(): number {
    return this.appPort;
  }

  getAppEnv(): string {
    return this.appEnv;
  }

  getRootPath(): string {
    return this.configService.get<string>('ROOT_PATH')!;
  }

  getMigrationsPath(): string {
    return this.configService.get<string>('MIGRATIONS_PATH')!;
  }
}