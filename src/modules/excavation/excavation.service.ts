import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExcavationData, ProjectPhase, PhaseType } from '../../shared/entities';
import { CreateExcavationDataDto } from './dto/create-excavation-data.dto';

@Injectable()
export class ExcavationService {
  constructor(
    @InjectRepository(ExcavationData)
    private excavationRepository: Repository<ExcavationData>,
    @InjectRepository(ProjectPhase)
    private projectPhaseRepository: Repository<ProjectPhase>,
  ) {}

  async create(createExcavationDataDto: CreateExcavationDataDto): Promise<ExcavationData> {
    // Verificar que la fase del proyecto existe y es de tipo excavación
    const projectPhase = await this.projectPhaseRepository.findOne({
      where: { id: createExcavationDataDto.projectPhaseId, type: PhaseType.EXCAVACION }
    });

    if (!projectPhase) {
      throw new NotFoundException('Fase de excavación no encontrada');
    }

    const excavationData = this.excavationRepository.create(createExcavationDataDto);
    return await this.excavationRepository.save(excavationData);
  }

  async findByProjectPhase(projectPhaseId: number): Promise<ExcavationData[]> {
    return await this.excavationRepository.find({
      where: { projectPhaseId },
      relations: ['projectPhase'],
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<ExcavationData> {
    const excavationData = await this.excavationRepository.findOne({
      where: { id },
      relations: ['projectPhase']
    });

    if (!excavationData) {
      throw new NotFoundException('Datos de excavación no encontrados');
    }

    return excavationData;
  }

  async update(id: number, updateData: Partial<CreateExcavationDataDto>): Promise<ExcavationData> {
    const excavationData = await this.findOne(id);
    Object.assign(excavationData, updateData);
    return await this.excavationRepository.save(excavationData);
  }

  async remove(id: number): Promise<void> {
    const excavationData = await this.findOne(id);
    await this.excavationRepository.remove(excavationData);
  }

  // Calcular costos totales
  async calculateTotalCost(projectPhaseId: number): Promise<number> {
    const excavationData = await this.findByProjectPhase(projectPhaseId);
    return excavationData.reduce((total, data) => {
      return total + (data.materialCost || 0) + (data.equipmentCost || 0) + (data.laborCost || 0);
    }, 0);
  }
}