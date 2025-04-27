import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeormPostgresConfig } from '@/config/database/typeorm/typeorm.postgres.config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private typeormPostgresConfig: TypeormPostgresConfig) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return this.typeormPostgresConfig.get();
  }
}
