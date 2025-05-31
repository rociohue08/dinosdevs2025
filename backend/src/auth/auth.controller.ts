/* Este archivo debe definir las rutas de autenticación para el registro e inicio de sesión, y delegar la lógica al servicio correspondiente (auth.service.ts). */

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserResponseDto } from './dto/user.response.dto';

//agrupa las rutas bajo "auth"
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  //documentacion del registro
  @Post('register') //ruta para registrarse (sing up)
  @ApiOperation({summary:'Registrar un nuevo usuario'})
  @ApiBody({type: RegisterDto})
  @ApiResponse({
    status:201, 
    description:'Usuario registrado exitosamente',
    type:UserResponseDto
  })
  @ApiResponse({status: 400, description:'Error al registrarse'})
  async register(@Body() body: RegisterDto): Promise<UserResponseDto> {
    return this.authService.register(body.name, body.email, body.password);
  }


  // Documentacion para el inicio de sesion (login)
 @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión de usuario' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
  async login(@Body() body: LoginDto): Promise<UserResponseDto> {
    return this.authService.login(body.email, body.password);
  }
}