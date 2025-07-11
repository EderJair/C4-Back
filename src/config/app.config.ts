export interface AppConfig {
  port: number;
  apiPrefix: string;
  corsOrigin: string;
  nodeEnv: string;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
  refreshSecret: string;
  refreshExpiresIn: string;
}

export interface AppConfiguration {
  app: AppConfig;
  database: DatabaseConfig;
  jwt: JwtConfig;
}

export const getAppConfig = (): AppConfiguration => ({
  app: {
    port: parseInt(process.env.PORT || '3001', 10),
    apiPrefix: process.env.API_PREFIX || 'api',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'c4_construction',
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
});
