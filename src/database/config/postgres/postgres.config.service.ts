// src/config/database/postgres/postgres.config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { PostgresConfig } from '@/domains/interfaces/postgres-config.interface';

@Injectable()
export class PostgresConfigService implements PostgresConfig {
  constructor(private configService: NestConfigService) {}

  getHost(): string {

    return this.configService.get<string>('POSTGRES_HOST')!;
  }

  getPort(): number {
    return Number(this.configService.get<string>('POSTGRES_PORT'));
  }

  getUsername(): string {
    return this.configService.get<string>('POSTGRES_USER')!;
  }

  getPassword(): string {
    return this.configService.get<string>('POSTGRES_PASSWORD')!;
  }

  getDatabase(): string {
    return this.configService.get<string>('POSTGRES_DATABASE')!;
  }

  isLogging(): boolean {
    return this.configService.get<string>('POSTGRES_LOGGING') === 'true';
  }

  isSync(): boolean {
    return this.configService.get<string>('POSTGRES_SYNC') === 'true';
  }


}
