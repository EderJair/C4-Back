// src/project-phases/project-phases.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectPhase, PhaseType, PhaseStatus, Project } from '../../shared/entities';

@Injectable()
export class ProjectPhasesService {
  constructor(
    @InjectRepository(ProjectPhase)
    private phaseRepository: Repository<ProjectPhase>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<ProjectPhase[]> {
    return this.phaseRepository.find({
      relations: ['project'],
    });
  }

  async findOne(id: number): Promise<ProjectPhase | null> {
    return this.phaseRepository.findOne({
      where: { id },
      relations: ['project'],
    });
  }

  async findByProject(projectId: number): Promise<ProjectPhase[]> {
    return this.phaseRepository.find({
      where: { projectId },
      relations: ['project'],
      order: { createdAt: 'ASC' },
    });
  }

  async findByType(type: PhaseType): Promise<ProjectPhase[]> {
    return this.phaseRepository.find({
      where: { type },
      relations: ['project'],
    });
  }

  async findByStatus(status: PhaseStatus): Promise<ProjectPhase[]> {
    return this.phaseRepository.find({
      where: { status },
      relations: ['project'],
    });
  }

  async create(phaseData: Partial<ProjectPhase>): Promise<ProjectPhase> {
    const phase = this.phaseRepository.create(phaseData);
    return this.phaseRepository.save(phase);
  }

  async createStandardPhases(projectId: number): Promise<ProjectPhase[]> {
    const project = await this.projectRepository.findOne({ where: { id: projectId } });
    
    if (!project) {
      throw new Error('Project not found');
    }

    const standardPhases = [
      {
        type: PhaseType.EXCAVACION,
        name: 'Excavación',
        description: 'Trabajos de excavación y preparación del terreno',
        projectId,
      },
      {
        type: PhaseType.DEMOLICION,
        name: 'Demolición',
        description: 'Demolición de estructuras existentes',
        projectId,
      },
      {
        type: PhaseType.CONSTRUCCION,
        name: 'Construcción',
        description: 'Construcción de la estructura principal',
        projectId,
      },
      {
        type: PhaseType.ACABADOS,
        name: 'Acabados',
        description: 'Trabajos de acabados y terminaciones',
        projectId,
      },
    ];

    const phases = this.phaseRepository.create(standardPhases);
    return this.phaseRepository.save(phases);
  }

  async update(id: number, updateData: Partial<ProjectPhase>): Promise<ProjectPhase | null> {
    await this.phaseRepository.update(id, updateData);
    return this.findOne(id);
  }

  async updateStatus(id: number, status: PhaseStatus): Promise<ProjectPhase | null> {
    const phase = await this.findOne(id);
    
    if (!phase) {
      return null;
    }

    phase.status = status;
    
    if (status === PhaseStatus.EN_PROGRESO && !phase.startDate) {
      phase.startDate = new Date();
    }
    
    if (status === PhaseStatus.COMPLETADO) {
      phase.actualEndDate = new Date();
      phase.progressPercentage = 100;
    }
    
    return this.phaseRepository.save(phase);
  }

  async updateProgress(id: number, percentage: number): Promise<ProjectPhase | null> {
    const phase = await this.findOne(id);
    
    if (!phase) {
      return null;
    }

    phase.progressPercentage = Math.min(Math.max(percentage, 0), 100);
    
    if (percentage === 100) {
      phase.status = PhaseStatus.COMPLETADO;
      phase.actualEndDate = new Date();
    } else if (percentage > 0 && phase.status === PhaseStatus.PENDIENTE) {
      phase.status = PhaseStatus.EN_PROGRESO;
      if (!phase.startDate) {
        phase.startDate = new Date();
      }
    }
    
    return this.phaseRepository.save(phase);
  }

  async delete(id: number): Promise<void> {
    await this.phaseRepository.delete(id);
  }
}