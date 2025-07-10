// src/project-phases/project-phases.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ProjectPhasesService } from './project-phases.service';
import { ProjectPhase, PhaseType, PhaseStatus } from '../entities/project-phase.entity';

@Controller('project-phases')
export class ProjectPhasesController {
  constructor(private readonly phasesService: ProjectPhasesService) {}

  @Get()
  findAll(): Promise<ProjectPhase[]> {
    return this.phasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProjectPhase | null> {
    return this.phasesService.findOne(id);
  }

  @Get('project/:projectId')
  findByProject(@Param('projectId', ParseIntPipe) projectId: number): Promise<ProjectPhase[]> {
    return this.phasesService.findByProject(projectId);
  }

  @Get('type/:type')
  findByType(@Param('type') type: PhaseType): Promise<ProjectPhase[]> {
    return this.phasesService.findByType(type);
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: PhaseStatus): Promise<ProjectPhase[]> {
    return this.phasesService.findByStatus(status);
  }

  @Post()
  create(@Body() phaseData: Partial<ProjectPhase>): Promise<ProjectPhase> {
    return this.phasesService.create(phaseData);
  }

  @Post('project/:projectId/standard')
  createStandardPhases(@Param('projectId', ParseIntPipe) projectId: number): Promise<ProjectPhase[]> {
    return this.phasesService.createStandardPhases(projectId);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<ProjectPhase>,
  ): Promise<ProjectPhase | null> {
    return this.phasesService.update(id, updateData);
  }

  @Put(':id/status/:status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Param('status') status: PhaseStatus,
  ): Promise<ProjectPhase | null> {
    return this.phasesService.updateStatus(id, status);
  }

  @Put(':id/progress/:percentage')
  updateProgress(
    @Param('id', ParseIntPipe) id: number,
    @Param('percentage', ParseIntPipe) percentage: number,
  ): Promise<ProjectPhase | null> {
    return this.phasesService.updateProgress(id, percentage);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.phasesService.delete(id);
  }
}