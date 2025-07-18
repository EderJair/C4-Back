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
import { SectorsService } from './sectors.service';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('sectors')
@UseGuards(JwtAuthGuard)
export class SectorsController {
  constructor(private readonly sectorsService: SectorsService) {}

  @Post()
  create(@Body() createSectorDto: CreateSectorDto) {
    return this.sectorsService.create(createSectorDto);
  }

  @Get()
  findAll() {
    return this.sectorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sectorsService.findOne(id);
  }

  @Get('ring/:ringId')
  findByRingId(@Param('ringId', ParseIntPipe) ringId: number) {
    return this.sectorsService.findByRingId(ringId);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSectorDto: UpdateSectorDto) {
    return this.sectorsService.update(id, updateSectorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sectorsService.remove(id);
  }
}
