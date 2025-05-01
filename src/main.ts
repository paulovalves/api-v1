import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'api-v1',
      context: 'NestApplication',
      timestamp: true,
      logLevels: ['error', 'warn', 'log', 'debug', 'verbose'],
      colors: true,
    })
  });
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
