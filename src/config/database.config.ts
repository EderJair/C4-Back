import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User, Project, ProjectPhase, ExcavationData, Ring, Sector, Panel } from '../shared/entities';
import { typeormLoggingConfig } from './logging.config';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [User, Project, ProjectPhase, ExcavationData, Ring, Sector, Panel],
  synchronize: true, // Forzar sincronización en desarrollo
  logging: ['query', 'schema'], // Ver logs de queries y schema
  
  ssl: configService.get<string>('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  migrationsRun: false,
  migrationsTableName: 'migrations',
});
