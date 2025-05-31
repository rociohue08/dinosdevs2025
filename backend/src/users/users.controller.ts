import { Controller, Get, Post, Body, Param, Put, Patch, Delete} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from 'src/auth/dto/user.response.dto';
import { UpdateUserDto } from './dto user/update-user.dto';
import { BadRequestException } from '@nestjs/common';



@ApiTags('users')
@Controller('users')  // Define la ruta base
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  // Obtener todos los usuarios
  @Get()
  @ApiOperation({summary:'Obtener todos los usuarios'})
  @ApiResponse({
    status:200,
    description:'Lista de usuarios',
    type: UserResponseDto,
  }
  )
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

// Obtener usuario por ID
/*     El decorador @Param() en NestJS se usa para extraer parámetros de la URL en una petición HTTP.
los parámetros de ruta (@Param()) se reciben como strings por defecto y antes no funcionaba porque el id llegaba de tipo number */
  @Get(':id')
  @ApiOperation({summary:'Obtener usuarios por ID'})
  @ApiParam({name:'id', description:'ID del usuario', required:true})
  @ApiResponse({
    status:200,
    description:'Usuario encontrado',
    type: [UserResponseDto],
  })
  @ApiResponse({status:404,description:'Usuario no encontrado'})
  async getUserById(@Param('id') id: string) {  // Recibe el id como string
  return this.usersService.getUserById(Number(id)); // Convierte a número
}

  // Actualizar usuario usuario por id 
@Patch(':id')
@ApiOperation({ summary: 'Editar usuario por ID' })
@ApiResponse({ status: 200, description: 'Usuario actualizado' })
@ApiResponse({ status: 404, description: 'Usuario no encontrado' })
@ApiResponse({ status: 400, description: 'Datos inválidos o ID incorrecto' })
async update(
  @Param('id') id: string, 
  @Body() data: UpdateUserDto,
) {
  const userId = Number(id); 

  if (isNaN(userId)) {
    throw new BadRequestException('ID debe ser un número válido');
  }

  return await this.usersService.updateUser(userId, data);
}


//eliminar usuario por id
@Delete(':id')
@ApiOperation({ summary: 'Eliminar usuario por ID' })
@ApiParam({ name: 'id', description: 'ID del usuario', required: true })
@ApiResponse({
  status: 200,
  description: 'Usuario encontrado y eliminado',
  type: UserResponseDto,
})
@ApiResponse({ status: 404, description: 'Usuario no encontrado' })
async deleteUser(@Param('id') id: string) {
  return this.usersService.deleteUser(Number(id));
}
  /*   El userController solo es para operaciones sobre usuarios ya
  autenticados como mostrar, editar, eliminar etc. 
  del registro e inicio de sesion se encarga el authController
  
*/
}
