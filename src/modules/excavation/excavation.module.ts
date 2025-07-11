
// src/modules/excavation/excavation.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExcavationService } from './excavation.service';
import { ExcavationController } from './excavation.controller';
import { ExcavationData, ProjectPhase } from '../../shared/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ExcavationData, ProjectPhase])],
  controllers: [ExcavationController],
  providers: [ExcavationService],
  exports: [ExcavationService],
})
export class ExcavationModule {}