import { SwaggerCustomOptions } from '@nestjs/swagger';

export class OpenAPIConfig implements SwaggerCustomOptions {
  swaggerOptions: {
    persistAuthorization: boolean;
    docExpansion: string;
    filter: boolean;
    showExtensions: boolean;
    showCommonExtensions: boolean;
  };
  swaggerUrl: string;
  swaggerPath: string;
  swaggerTitle: string;
  swaggerDescription: string;
  swaggerVersion: string;

  constructor() {
    this.swaggerOptions = {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
    };
    this.swaggerUrl = '/api-docs';
    this.swaggerPath = '/api-docs-json';
    this.swaggerTitle = 'API Documentation';
    this.swaggerDescription = 'API Documentation';
    this.swaggerVersion = '1.0.0';
  }

  getOpenapiPath(): string {
    return this.swaggerPath;
  }

  getOpenapiUrl(): string {
    return this.swaggerUrl;
  }

  getOpenapiVersion(): string {
    return this.swaggerVersion;
  }

  getOpenapiTitle(): string {
    return this.swaggerTitle;
  }

  getOpenapiDescription(): string {
    return this.swaggerDescription;
  }

  getSwaggerOptions(): SwaggerCustomOptions {
    return {
      swaggerOptions: this.swaggerOptions,
    };
  }
}
