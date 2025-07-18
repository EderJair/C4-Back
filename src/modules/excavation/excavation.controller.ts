import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  HttpStatus, 
  HttpException,
  UseGuards
} from '@nestjs/common';
import { ExcavationService } from './excavation.service';
import { CreateExcavationDataDto } from './dto/create-excavation-data.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../shared/entities';

@Controller('excavation')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExcavationController {
  constructor(
    private readonly excavationService: ExcavationService
  ) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.INGENIERO, UserRole.TRABAJADOR)
  async create(@Body() createExcavationDataDto: CreateExcavationDataDto) {
    try {
      const excavationData = await this.excavationService.create(createExcavationDataDto);
      return {
        success: true,
        message: 'Datos de excavación creados exitosamente',
        data: excavationData,
      };
    } catch (error) {
      console.error('🔥 Error creating excavation:', error);
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Error creando datos de excavación',
          error: error.message,
          details: error.stack,
        },
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('project/:projectId')
  @Roles(UserRole.ADMIN, UserRole.INGENIERO, UserRole.TRABAJADOR)
  async findByProject(@Param('projectId') projectId: string) {
    try {
      const excavationData = await this.excavationService.findByProject(+projectId);
      return {
        success: true,
        data: excavationData,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error obteniendo excavaciones del proyecto',
          error: error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('project-phase/:projectPhaseId')
  @Roles(UserRole.ADMIN, UserRole.INGENIERO, UserRole.TRABAJADOR)
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
  @Roles(UserRole.ADMIN, UserRole.INGENIERO, UserRole.TRABAJADOR)
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
  @Roles(UserRole.ADMIN, UserRole.INGENIERO, UserRole.TRABAJADOR)
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
  @Roles(UserRole.ADMIN)
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

  @Get('costs/project/:projectId')
  @Roles(UserRole.ADMIN, UserRole.INGENIERO, UserRole.TRABAJADOR)
  async getTotalCostByProject(@Param('projectId') projectId: string) {
    try {
      const totalCost = await this.excavationService.calculateTotalCostByProject(+projectId);
      return {
        success: true,
        data: { totalCost },
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error calculando costos totales del proyecto',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('costs/project-phase/:projectPhaseId')
  @Roles(UserRole.ADMIN, UserRole.INGENIERO, UserRole.TRABAJADOR)
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
