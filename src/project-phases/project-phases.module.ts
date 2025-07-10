// src/project-phases/project-phases.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectPhase } from '../entities/project-phase.entity';
import { Project } from '../entities/project.entity';
import { ProjectPhasesService } from './project-phases.service';
import { ProjectPhasesController } from './project-phases.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectPhase, Project])],
  providers: [ProjectPhasesService],
  controllers: [ProjectPhasesController],
  exports: [ProjectPhasesService],
})
export class ProjectPhasesModule {}