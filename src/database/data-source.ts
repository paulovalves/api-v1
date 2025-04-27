import { DataSource } from 'typeorm';
import { InitialMigration1745743481664 } from '@/database/migrations/1745743481664-InitialMigration';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'secret',
  database: 'teste',
  entities: ['src/domains/**/entities/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
});
