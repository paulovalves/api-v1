import { Module } from '@nestjs/common';
import { TypeOrmConfigService } from '@/database/typeorm/typeorm.config.service';
import { DatabaseConfigModule } from '@/config/database/database.config.module';

@Module({
  imports: [DatabaseConfigModule],
  providers: [TypeOrmConfigService],
})
export class TypeOrmConfigModule {}
