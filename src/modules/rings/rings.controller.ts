import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { RingsService } from './rings.service';
import { CreateRingDto } from './dto/create-ring.dto';
import { UpdateRingDto } from './dto/update-ring.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('rings')
@UseGuards(JwtAuthGuard)
export class RingsController {
  constructor(private readonly ringsService: RingsService) {}

  @Post()
  create(@Body() createRingDto: CreateRingDto) {
    return this.ringsService.create(createRingDto);
  }

  @Get()
  findAll() {
    return this.ringsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ringsService.findOne(id);
  }

  @Get('excavation/:excavationId')
  findByExcavationId(@Param('excavationId', ParseIntPipe) excavationId: number) {
    return this.ringsService.findByExcavationId(excavationId);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRingDto: UpdateRingDto) {
    return this.ringsService.update(id, updateRingDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ringsService.remove(id);
  }
}
