import { Module } from '@nestjs/common';
import { DatabaseConfigModule } from '@/config/database/database.config.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    DatabaseConfigModule,
  ],
})
export class ConfigModule {}
