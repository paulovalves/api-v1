import { OpenAPIConfig } from '@/config/api/openapi/openapi.config';

export class OpenapiService {
  private readonly openapiConfig: OpenAPIConfig;

  constructor() {
    this.openapiConfig = new OpenAPIConfig();
  }

  getOpenapiPath(): string {
    return this.openapiConfig.getOpenapiPath();
  }

  getOpenapiUrl(): string {
    return this.openapiConfig.getOpenapiUrl();
  }

  getOpenapiVersion(): string {
    return this.openapiConfig.getOpenapiVersion();
  }

  getOpenapiTitle(): string {
    return this.openapiConfig.getOpenapiTitle();
  }

  getOpenapiDescription(): string {
    return this.openapiConfig.getOpenapiDescription();
  }

  getSwaggerOptions(): any {
    return this.openapiConfig.getSwaggerOptions();
  }
}
