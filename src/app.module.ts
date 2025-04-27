import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { DomainsModule } from '@/domains/domains.module';
import { DatabaseModule } from '@/database/database.module';
import { TypeormDatabaseModule } from '@/database/typeorm/typeorm.database.module';

@Module({
  imports: [DomainsModule, DatabaseModule, TypeormDatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
