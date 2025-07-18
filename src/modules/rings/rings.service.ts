import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRingDto } from './dto/create-ring.dto';
import { UpdateRingDto } from './dto/update-ring.dto';
import { Ring } from '../../shared/entities/ring.entity';

@Injectable()
export class RingsService {
  constructor(
    @InjectRepository(Ring)
    private ringRepository: Repository<Ring>,
  ) {}

  async create(createRingDto: CreateRingDto): Promise<Ring> {
    const ring = this.ringRepository.create(createRingDto);
    return await this.ringRepository.save(ring);
  }

  async findAll(): Promise<Ring[]> {
    return await this.ringRepository.find({
      relations: ['excavationData', 'sectors'],
    });
  }

  async findOne(id: number): Promise<Ring> {
    const ring = await this.ringRepository.findOne({
      where: { id },
      relations: ['excavationData', 'sectors'],
    });

    if (!ring) {
      throw new NotFoundException(`Ring with ID ${id} not found`);
    }

    return ring;
  }

  async findByExcavationId(excavationId: number): Promise<Ring[]> {
    return await this.ringRepository.find({
      where: { excavationData: { id: excavationId } },
      relations: ['sectors'],
    });
  }

  async update(id: number, updateRingDto: UpdateRingDto): Promise<Ring> {
    const ring = await this.findOne(id);
    Object.assign(ring, updateRingDto);
    return await this.ringRepository.save(ring);
  }

  async remove(id: number): Promise<void> {
    const ring = await this.findOne(id);
    await this.ringRepository.remove(ring);
  }
}
