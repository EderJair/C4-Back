import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  UseGuards, 
  HttpStatus, 
  HttpException 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { UserRole } from '../../shared/entities';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.login(loginDto);
      return {
        success: true,
        message: 'Login exitoso',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Error en el login',
        },
        error.status || HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('register')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.authService.register(createUserDto);
      return {
        success: true,
        message: 'Usuario creado exitosamente',
        data: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          phone: user.phone,
          dni: user.dni,
          address: user.address,
          companyName: user.companyName,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Error creando usuario',
        },
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('refresh')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    try {
      const result = await this.authService.refreshToken(refreshToken);
      return {
        success: true,
        message: 'Token actualizado exitosamente',
        data: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Error actualizando token',
        },
        error.status || HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@GetUser() user: any) {
    try {
      const profile = await this.authService.getProfile(user.id);
      return {
        success: true,
        data: profile,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Error obteniendo perfil',
        },
        error.status || HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout() {
    return {
      success: true,
      message: 'Logout exitoso',
    };
  }
}
