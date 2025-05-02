import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeormPostgresConfig } from '@/database/typeorm/typeorm.postgres.config';

@Injectable()
export class TypeormDatabaseService implements TypeOrmOptionsFactory {
  constructor(private typeormPostgresConfig: TypeormPostgresConfig) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.info('Getting TypeORM options');
    return this.typeormPostgresConfig.get();
  }
}
