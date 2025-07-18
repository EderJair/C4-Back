
import { IsNumber, IsOptional, IsEnum, IsArray, IsString, IsDateString, IsPositive } from 'class-validator';

export class CreateExcavationDataDto {
  @IsNumber()
  projectPhaseId: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  excavationDepth?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  excavationArea?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  excavationVolume?: number;

  @IsOptional()
  @IsEnum(['clay', 'sand', 'rock', 'mixed'])
  soilType?: 'clay' | 'sand' | 'rock' | 'mixed';

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  equipment?: string[];

  @IsOptional()
  @IsNumber()
  @IsPositive()
  laborHours?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  materialCost?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  equipmentCost?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  laborCost?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photos?: string[];

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsEnum(['pending', 'in_progress', 'completed', 'paused'])
  status?: 'pending' | 'in_progress' | 'completed' | 'paused';
}
