import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')  // Define la ruta base
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Obtener todos los usuarios
  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // Obtener usuario por ID
/*   @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  } */

/*     El decorador @Param() en NestJS se usa para extraer parámetros de la URL en una petición HTTP.
los parámetros de ruta (@Param()) se reciben como strings por defecto y antes no funcionaba porque el id llegaba de tipo number */
    @Get(':id')
async getUserById(@Param('id') id: string) {  // Recibe el id como string
  return this.usersService.getUserById(Number(id)); // Convierte a número
}

  // Actualizar usuario
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() data: { nombre: string; email: string }
  ) {
    return this.usersService.updateUser(id, data);
  }

  // Registrar usuario
  @Post('register')
  async register(@Body() body: { name: string; email: string; password: string }) {
    return this.usersService.register(body.name, body.email, body.password);
  }
  // Iniciar sesión
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.usersService.login(body.email, body.password);
  }
}
