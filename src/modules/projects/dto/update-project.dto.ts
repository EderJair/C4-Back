import { IsString, IsOptional, IsEnum, IsDate, IsNumber, IsPositive, Length, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';
import { ProjectStatus } from '../../../shared/entities';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(10, 500)
  description?: string;

  @IsOptional()
  @IsString()
  @Length(10, 200)
  address?: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  clientName?: string;

  @IsOptional()
  @IsString()
  @Length(10, 20)
  clientPhone?: string;

  @IsOptional()
  @IsEmail()
  clientEmail?: string;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

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
  totalBudget?: number;

  @IsOptional()
  @IsString()
  @Length(0, 1000)
  notes?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  assignedEngineerId?: number;
}
