import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { GlobalValidationPipe, GlobalExceptionFilter } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // Global pipes
  app.useGlobalPipes(new GlobalValidationPipe());
  
  // Global filters
  app.useGlobalFilters(new GlobalExceptionFilter());
  
  // API prefix
  app.setGlobalPrefix('api');
  
  // CORS configuration
  app.enableCors({
    origin: configService.get('CORS_ORIGIN') || 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  const port = configService.get('PORT') || 3001;
  await app.listen(port);
  
  console.log(`🚀 Application is running on: http://localhost:${port}/api`);
}

bootstrap();