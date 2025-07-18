import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RingsService } from './rings.service';
import { RingsController } from './rings.controller';
import { Ring } from '../../shared/entities/ring.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ring])],
  controllers: [RingsController],
  providers: [RingsService],
  exports: [RingsService],
})
export class RingsModule {}
