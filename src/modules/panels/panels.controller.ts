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
import { PanelsService } from './panels.service';
import { CreatePanelDto } from './dto/create-panel.dto';
import { UpdatePanelDto } from './dto/update-panel.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('panels')
@UseGuards(JwtAuthGuard)
export class PanelsController {
  constructor(private readonly panelsService: PanelsService) {}

  @Post()
  create(@Body() createPanelDto: CreatePanelDto) {
    return this.panelsService.create(createPanelDto);
  }

  @Get()
  findAll() {
    return this.panelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.panelsService.findOne(id);
  }

  @Get('sector/:sectorId')
  findBySectorId(@Param('sectorId', ParseIntPipe) sectorId: number) {
    return this.panelsService.findBySectorId(sectorId);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePanelDto: UpdatePanelDto) {
    return this.panelsService.update(id, updatePanelDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.panelsService.remove(id);
  }
}
