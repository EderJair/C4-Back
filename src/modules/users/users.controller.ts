// src/modules/users/users.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserRole } from '../../shared/entities';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard) // Proteger todos los endpoints de usuarios
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.INGENIERO) // Solo admin e ingenieros pueden ver usuarios
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.INGENIERO)
  findOne(@Param('id') id: number): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Get('role/:role')
  @Roles(UserRole.ADMIN, UserRole.INGENIERO)
  findByRole(@Param('role') role: UserRole): Promise<User[]> {
    return this.usersService.findByRole(role);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN) // Solo admin puede crear usuarios
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    // DEPRECATED: Usar auth/register en su lugar
    // Este endpoint ahora también hashea contraseñas
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  delete(@Param('id') id: number): Promise<void> {
    return this.usersService.delete(id);
  }
}