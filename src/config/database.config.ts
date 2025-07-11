import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User, Project, ProjectPhase, ExcavationData } from '../shared/entities';
import { typeormLoggingConfig } from './logging.config';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [User, Project, ProjectPhase, ExcavationData],
  synchronize: configService.get<string>('NODE_ENV') !== 'production', // Solo en desarrollo
  
  // Configuración de logging limpia
  ...typeormLoggingConfig.clean,
  
  ssl: configService.get<string>('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  migrationsRun: false,
  migrationsTableName: 'migrations',
});
