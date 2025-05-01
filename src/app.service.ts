import { Injectable } from '@nestjs/common';
import { TypeormDatabaseService } from '@/database/typeorm/typeorm.database.service';
import { OpenapiService } from '@/config/api/openapi/openapi.service';

@Injectable()
export class AppService {
  constructor(private typeormDatabaseService: TypeormDatabaseService, private openapiService: OpenapiService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getModules() {
    return this.typeormDatabaseService.createTypeOrmOptions();
  }

  getSwaggerOptions() {
    return this.openapiService.getSwaggerOptions();
  }
}
