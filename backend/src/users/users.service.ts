import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; 
import * as bcrypt from 'bcryptjs'; // Necesario para la comparación de contraseñas

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

   // Obtener todos los usuarios registrados
  async getAllUsers() {
    const users = await this.prisma.usuario.findMany();
    console.log('Usuarios obtenidos:', users);  // Verifica si hay datos
    return users;
  }

  // Obtener un usuario por su ID
  async getUserById(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id }, 
    });
  }

  // Actualizar usuario
  async updateUser(id: number, data: { nombre?: string; email?: string }) {
  return this.prisma.usuario.update({
    where: { id },
    data,
  });
}

//borrar usuario esto es solo de prueba
async deleteUser(id: number) {
  return this.prisma.usuario.delete({
    where: { id },
  });
}


  // Obtener el ranking de un usuario
  async getUserRanking(id: number) {
    return this.prisma.puntaje.findMany({
      where: { usuarioId: id },
      include: { juego: true },
    });
  }

 

  // Lógica de registro de un nuevo usuario
  async register(name: string, email: string, password: string) {
    const existingUser = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('El correo electrónico ya está en uso');
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = await this.prisma.usuario.create({
      data: {
        nombre: name,
        email,
        contraseña: hashedPassword,
      },
    });

    return newUser;
  }

  // Lógica de inicio de sesión
  async login(email: string, password: string) {
    // Buscar el usuario por su correo electrónico
    const user = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Comparar las contraseñas
    const isPasswordValid = await bcrypt.compare(password, user.contraseña);
    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    return user;
  }
}
