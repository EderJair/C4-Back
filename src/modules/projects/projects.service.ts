// src/projects/projects.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project, ProjectStatus, User } from '../../shared/entities';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ['assignedEngineer', 'createdBy'],
    });
  }

  async findOne(id: number): Promise<Project | null> {
    return this.projectRepository.findOne({
      where: { id },
      relations: ['assignedEngineer', 'createdBy'],
    });
  }

  async create(projectData: Partial<Project>): Promise<Project> {
    const project = this.projectRepository.create(projectData);
    return this.projectRepository.save(project);
  }

  async update(id: number, updateData: Partial<Project>): Promise<Project | null> {
    await this.projectRepository.update(id, updateData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }

  // Métodos específicos para proyectos
  async findByStatus(status: ProjectStatus): Promise<Project[]> {
    return this.projectRepository.find({
      where: { status },
      relations: ['assignedEngineer', 'createdBy'],
    });
  }

  async findByEngineer(engineerId: number): Promise<Project[]> {
    return this.projectRepository.find({
      where: { assignedEngineerId: engineerId },
      relations: ['assignedEngineer', 'createdBy'],
    });
  }

  async assignEngineer(projectId: number, engineerId: number): Promise<Project | null> {
    const project = await this.findOne(projectId);
    const engineer = await this.userRepository.findOne({ where: { id: engineerId } });
    
    if (!project || !engineer) {
      return null;
    }

    project.assignedEngineer = engineer;
    project.assignedEngineerId = engineerId;
    
    return this.projectRepository.save(project);
  }

  async getProjectsByAdmin(adminId: number): Promise<Project[]> {
    return this.projectRepository.find({
      where: { createdById: adminId },
      relations: ['assignedEngineer', 'createdBy'],
    });
  }

  async updateStatus(projectId: number, status: ProjectStatus): Promise<Project | null> {
    const project = await this.findOne(projectId);
    
    if (!project) {
      return null;
    }

    project.status = status;
    
    if (status === ProjectStatus.COMPLETADO) {
      project.actualEndDate = new Date();
    }
    
    return this.projectRepository.save(project);
  }
}