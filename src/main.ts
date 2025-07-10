import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para tu frontend Next.js
  app.enableCors({
    origin: 'http://localhost:3000', // Tu frontend Next.js
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  await app.listen(3001); // Cambiar de 3000 a 3001
}
bootstrap();