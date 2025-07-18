import { IsString, IsOptional, IsEnum, IsDate, IsNumber, IsPositive, Length, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { PhaseType, PhaseStatus } from '../../../shared/entities';

export class CreateProjectPhaseDto {
  @IsEnum(PhaseType)
  type: PhaseType;

  @IsString()
  @Length(2, 100)
  name: string;

  @IsOptional()
  @IsString()
  @Length(10, 500)
  description?: string;

  @IsNumber()
  @IsPositive()
  projectId: number;

  @IsOptional()
  @IsEnum(PhaseStatus)
  status?: PhaseStatus;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  estimatedEndDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  actualEndDate?: Date;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  estimatedCost?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  actualCost?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  progressPercentage?: number;

  @IsOptional()
  @IsString()
  @Length(0, 200)
  requiredEquipment?: string;

  @IsOptional()
  @IsString()
  @Length(0, 200)
  requiredMaterials?: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  notes?: string;
}
