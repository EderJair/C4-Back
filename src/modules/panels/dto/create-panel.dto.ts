import { IsNumber, IsOptional, IsString, IsEnum, IsPositive, Length } from 'class-validator';

export class CreatePanelDto {
  @IsNumber()
  sectorId: number;

  @IsString()
  @Length(1, 100)
  name: string;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  width?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  height?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  thickness?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  position?: number;

  @IsOptional()
  @IsEnum(['active', 'inactive', 'completed'])
  status?: 'active' | 'inactive' | 'completed';

  @IsOptional()
  @IsString()
  @Length(1, 100)
  material?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  weight?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  cost?: number;
}
