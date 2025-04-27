import { Injectable } from '@nestjs/common';
import { TypeormDatabaseService } from '@/database/typeorm/typeorm.database.service';

@Injectable()
export class AppService {
  constructor(private typeormDatabaseService: TypeormDatabaseService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getModules() {
    return this.typeormDatabaseService.createTypeOrmOptions();
  }
}
