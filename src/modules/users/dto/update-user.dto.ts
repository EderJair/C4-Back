import { IsEmail, IsString, IsOptional, IsEnum, IsPhoneNumber, Length, IsBoolean } from 'class-validator';
import { UserRole } from '../../../shared/entities';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(6, 100)
  password?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsString()
  @Length(10, 20)
  phone?: string;

  @IsOptional()
  @IsString()
  @Length(6, 20)
  dni?: string;

  @IsOptional()
  @IsString()
  @Length(10, 200)
  address?: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  companyName?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
