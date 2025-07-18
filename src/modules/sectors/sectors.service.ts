import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { Sector } from '../../shared/entities/sector.entity';

@Injectable()
export class SectorsService {
  constructor(
    @InjectRepository(Sector)
    private sectorRepository: Repository<Sector>,
  ) {}

  async create(createSectorDto: CreateSectorDto): Promise<Sector> {
    const sector = this.sectorRepository.create(createSectorDto);
    return await this.sectorRepository.save(sector);
  }

  async findAll(): Promise<Sector[]> {
    return await this.sectorRepository.find({
      relations: ['ring', 'panels'],
    });
  }

  async findOne(id: number): Promise<Sector> {
    const sector = await this.sectorRepository.findOne({
      where: { id },
      relations: ['ring', 'panels'],
    });

    if (!sector) {
      throw new NotFoundException(`Sector with ID ${id} not found`);
    }

    return sector;
  }

  async findByRingId(ringId: number): Promise<Sector[]> {
    return await this.sectorRepository.find({
      where: { ring: { id: ringId } },
      relations: ['panels'],
    });
  }

  async update(id: number, updateSectorDto: UpdateSectorDto): Promise<Sector> {
    const sector = await this.findOne(id);
    Object.assign(sector, updateSectorDto);
    return await this.sectorRepository.save(sector);
  }

  async remove(id: number): Promise<void> {
    const sector = await this.findOne(id);
    await this.sectorRepository.remove(sector);
  }
}
