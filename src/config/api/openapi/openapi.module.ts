import { Module } from '@nestjs/common';
import { OpenapiService } from '@/config/api/openapi/openapi.service';

  @Module({
    providers: [OpenapiService],
    exports: [OpenapiService],
  })

export class OpenAPIModule {}