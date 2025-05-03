import { Injectable } from '@nestjs/common';
import { TypeormDatabaseService } from '@/database/typeorm/typeorm.database.service';
import { OpenapiService } from '@/config/api/openapi/openapi.service';

@Injectable()
export class AppService {
  constructor(
    private readonly typeormDatabaseService: TypeormDatabaseService,
    private readonly openapiService: OpenapiService,
  ) {}

  getHome() {
    return 'index';
  }

  getModules() {
    return this.typeormDatabaseService.createTypeOrmOptions();
  }

  getSwaggerOptions() {
    return this.openapiService.getSwaggerOptions();
  }
}
