// Temporarily remove Joi validation until we install it
// import * as Joi from 'joi';

export const validationSchema = null; // Will be implemented later with Joi

/* Future implementation:
export const validationSchema = Joi.object({
  // App Configuration
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3001),
  API_PREFIX: Joi.string().default('api'),
  CORS_ORIGIN: Joi.string().default('http://localhost:3000'),

  // Database Configuration
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),

  // JWT Configuration (para futuro)
  JWT_SECRET: Joi.string().min(32).optional(),
  JWT_EXPIRES_IN: Joi.string().default('1h'),
  JWT_REFRESH_SECRET: Joi.string().min(32).optional(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
});
*/
