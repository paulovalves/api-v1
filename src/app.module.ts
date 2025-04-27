import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { DomainsModule } from '@/domains/domains.module';
import { DatabaseModule } from '@/database/database.module';
import { DatabaseConfigModule } from '@/config/database/database.config.module';

@Module({
  imports: [DomainsModule, DatabaseModule, DatabaseConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
