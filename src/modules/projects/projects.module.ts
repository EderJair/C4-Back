// src/modules/projects/projects.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project, User } from '../../shared/entities';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User])],
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}