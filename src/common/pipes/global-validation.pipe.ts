import { Injectable, ValidationPipe } from '@nestjs/common';

@Injectable()
export class GlobalValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      validationError: {
        target: false,
        value: false,
      },
    });
  }
}
