// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { ProjectPhasesModule } from './modules/project-phases/project-phases.module';
import { ExcavationModule } from './modules/excavation/excavation.module';
import { AuthModule } from './modules/auth/auth.module';
import { getDatabaseConfig } from './config/database.config';
// import { validationSchema } from './config/validation.schema';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
    AuthModule,
    UsersModule,
    ProjectsModule,
    ProjectPhasesModule,
    ExcavationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}