import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from '@/database/typeorm/typeorm.config.module';

@Module({
  imports: [TypeOrmConfigModule],
})
export class DatabaseModule {}
