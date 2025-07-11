// src/modules/project-phases/project-phases.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectPhase, Project } from '../../shared/entities';
import { ProjectPhasesService } from './project-phases.service';
import { ProjectPhasesController } from './project-phases.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectPhase, Project])],
  providers: [ProjectPhasesService],
  controllers: [ProjectPhasesController],
  exports: [ProjectPhasesService],
})
export class ProjectPhasesModule {}