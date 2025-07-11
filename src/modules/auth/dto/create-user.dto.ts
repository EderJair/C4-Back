import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../../../shared/entities';

export class CreateUserDto {
  @IsString({ message: 'El nombre debe ser una cadena' })
  firstName: string;

  @IsString({ message: 'El apellido debe ser una cadena' })
  lastName: string;

  @IsEmail({}, { message: 'Email debe ser válido' })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsEnum(UserRole, { message: 'El rol debe ser válido' })
  role: UserRole;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  dni?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  companyName?: string;
}
