import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '../..', 'public'));
  app.setBaseViewsDir(join(__dirname, '../..', 'views'));
  app.setViewEngine('hbs');

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });

  const config = new DocumentBuilder()
    .setTitle('API for tests')
    .setDescription('The tryout API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/api-docs', app, documentFactory);
  await app.listen(process.env.PORT ?? 8080, '0.0.0.0');

  const API_URL = process.env.API_URL ?? 'http://api.app.local';

  console.info(`Application is running on: ${API_URL}`);
  console.info(`Swagger is running on: ${API_URL}/api/api-docs`);
  console.info(`Static assets are served from: ${API_URL}/public`);
  console.info(`View engine is set to: ${API_URL}/views`);
  console.info(`CORS is enabled for all origins`);
}
bootstrap();
