import { IsNumber, IsOptional, IsString, IsEnum, IsPositive, Length } from 'class-validator';

export class CreateRingDto {
  @IsNumber()
  excavationDataId: number;

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
  diameter?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  depth?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  height?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  position?: number;

  @IsOptional()
  @IsEnum(['active', 'inactive', 'completed'])
  status?: 'active' | 'inactive' | 'completed';
}
