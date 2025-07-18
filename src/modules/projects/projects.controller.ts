// src/modules/projects/projects.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project, ProjectStatus } from '../../shared/entities';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Project | null> {
    return this.projectsService.findOne(id);
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: ProjectStatus): Promise<Project[]> {
    return this.projectsService.findByStatus(status);
  }

  @Get('engineer/:engineerId')
  findByEngineer(@Param('engineerId', ParseIntPipe) engineerId: number): Promise<Project[]> {
    return this.projectsService.findByEngineer(engineerId);
  }

  @Get('admin/:adminId')
  getProjectsByAdmin(@Param('adminId', ParseIntPipe) adminId: number): Promise<Project[]> {
    return this.projectsService.getProjectsByAdmin(adminId);
  }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(createProjectDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project | null> {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Put(':id/assign-engineer/:engineerId')
  assignEngineer(
    @Param('id', ParseIntPipe) projectId: number,
    @Param('engineerId', ParseIntPipe) engineerId: number,
  ): Promise<Project | null> {
    return this.projectsService.assignEngineer(projectId, engineerId);
  }

  @Put(':id/status/:status')
  updateStatus(
    @Param('id', ParseIntPipe) projectId: number,
    @Param('status') status: ProjectStatus,
  ): Promise<Project | null> {
    return this.projectsService.updateStatus(projectId, status);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.projectsService.delete(id);
  }
}