import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePanelDto } from './dto/create-panel.dto';
import { UpdatePanelDto } from './dto/update-panel.dto';
import { Panel } from '../../shared/entities/panel.entity';

@Injectable()
export class PanelsService {
  constructor(
    @InjectRepository(Panel)
    private panelRepository: Repository<Panel>,
  ) {}

  async create(createPanelDto: CreatePanelDto): Promise<Panel> {
    const panel = this.panelRepository.create(createPanelDto);
    return await this.panelRepository.save(panel);
  }

  async findAll(): Promise<Panel[]> {
    return await this.panelRepository.find({
      relations: ['sector'],
    });
  }

  async findOne(id: number): Promise<Panel> {
    const panel = await this.panelRepository.findOne({
      where: { id },
      relations: ['sector'],
    });

    if (!panel) {
      throw new NotFoundException(`Panel with ID ${id} not found`);
    }

    return panel;
  }

  async findBySectorId(sectorId: number): Promise<Panel[]> {
    return await this.panelRepository.find({
      where: { sector: { id: sectorId } },
    });
  }

  async update(id: number, updatePanelDto: UpdatePanelDto): Promise<Panel> {
    const panel = await this.findOne(id);
    Object.assign(panel, updatePanelDto);
    return await this.panelRepository.save(panel);
  }

  async remove(id: number): Promise<void> {
    const panel = await this.findOne(id);
    await this.panelRepository.remove(panel);
  }
}
