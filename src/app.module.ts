import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModelsModule } from './domains/models.module';
import { ProvidersModule } from './providers/providers.module';
import { CommonModule } from './common/common.module';
import { DatabaseConfigModule } from './config/database/database.config.module';
import { DatabaseModule } from './database/database.module';
import { JobsModule } from './jobs/jobs.module';
import { MailsModule } from './mails/mails.module';

@Module({
  imports: [
    CommonModule,
    DatabaseConfigModule,
    DatabaseModule,
    JobsModule,
    MailsModule,
    ModelsModule,
    ProvidersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
