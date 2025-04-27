import { DataSourceOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeormPostgresConfig {
  constructor() {}
  get(): DataSourceOptions {
    return {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      synchronize: false,
      entities: [__dirname + '/../../models/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../../migrations/**/*{.ts,.js}'],
      migrationsTableName: 'migrations',
      migrationsRun: true,
    };
  }
}