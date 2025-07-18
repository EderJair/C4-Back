import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PanelsService } from './panels.service';
import { PanelsController } from './panels.controller';
import { Panel } from '../../shared/entities/panel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Panel])],
  controllers: [PanelsController],
  providers: [PanelsService],
  exports: [PanelsService],
})
export class PanelsModule {}
