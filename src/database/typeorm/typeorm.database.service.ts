import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeormPostgresConfig } from '@/database/typeorm/typeorm.postgres.config';

@Injectable()
export class TypeormDatabaseService implements TypeOrmOptionsFactory {
  constructor(
    private typeormPostgresConfig: TypeormPostgresConfig
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.warn('Getting TypeORM options');
    console.log('GET: ', this.typeormPostgresConfig.get());
    return this.typeormPostgresConfig.get();
  }
}
