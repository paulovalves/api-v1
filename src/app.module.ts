import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { DomainsModule } from '@/domains/domains.module';
import { DatabaseModule } from '@/database/database.module';
import { TypeormDatabaseModule } from '@/database/typeorm/typeorm.database.module';
import { OpenAPIModule } from '@/config/api/openapi/openapi.module';

@Module({
  imports: [
    DomainsModule,
    DatabaseModule,
    TypeormDatabaseModule,
    OpenAPIModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
