// src/config/database/postgres/postgres.config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { PostgresConfig } from '@/domains/interfaces/postgres-config.interface';

@Injectable()
export class PostgresConfigService implements PostgresConfig {
  constructor(private configService: NestConfigService) {}

  getHost(): string {

    return this.configService.getOrThrow<string>('POSTGRES_LOCALHOST_HOST')!;
  }

  getPort(): number {
    return Number(this.configService.getOrThrow<string>('POSTGRES_LOCALHOST_PORT'));
  }

  getUsername(): string {
    return this.configService.getOrThrow<string>('POSTGRES_LOCALHOST_USER')!;
  }

  getPassword(): string {
    return this.configService.getOrThrow<string>('POSTGRES_LOCALHOST_PASSWORD')!;
  }

  getDatabase(): string {
    return this.configService.getOrThrow<string>('POSTGRES_LOCALHOST_DATABASE')!;
  }

  isLogging(): boolean {
    return this.configService.getOrThrow<string>('POSTGRES_LOCALHOST_LOGGING') === 'true';
  }

  isSync(): boolean {
    return this.configService.getOrThrow<string>('POSTGRES_LOCALHOST_SYNC') === 'true';
  }


}
