import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { ExcavationService } from './excavation.service';
import { CreateExcavationDataDto } from './dto/create-excavation-data.dto';

@Controller('excavation')
export class ExcavationController {
  constructor(private readonly excavationService: ExcavationService) {}

  @Post()
  async create(@Body() createExcavationDataDto: CreateExcavationDataDto) {
    try {
      const excavationData = await this.excavationService.create(createExcavationDataDto);
      return {
        success: true,
        message: 'Datos de excavación creados exitosamente',
        data: excavationData,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error creando datos de excavación',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('project-phase/:projectPhaseId')
  async findByProjectPhase(@Param('projectPhaseId') projectPhaseId: string) {
    try {
      const excavationData = await this.excavationService.findByProjectPhase(+projectPhaseId);
      return {
        success: true,
        data: excavationData,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error obteniendo datos de excavación',
          error: error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const excavationData = await this.excavationService.findOne(+id);
      return {
        success: true,
        data: excavationData,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Datos de excavación no encontrados',
          error: error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<CreateExcavationDataDto>) {
    try {
      const excavationData = await this.excavationService.update(+id, updateData);
      return {
        success: true,
        message: 'Datos de excavación actualizados exitosamente',
        data: excavationData,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error actualizando datos de excavación',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.excavationService.remove(+id);
      return {
        success: true,
        message: 'Datos de excavación eliminados exitosamente',
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error eliminando datos de excavación',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('costs/project-phase/:projectPhaseId')
  async getTotalCost(@Param('projectPhaseId') projectPhaseId: string) {
    try {
      const totalCost = await this.excavationService.calculateTotalCost(+projectPhaseId);
      return {
        success: true,
        data: { totalCost },
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error calculando costos totales',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}