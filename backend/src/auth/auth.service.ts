import { Injectable } from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcryptjs'; // Para encriptar contraseñas
import { JwtService } from '@nestjs/jwt'; // Para manejar JWT en NestJS
import { UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common'; /* esta importación  permite manejar y mandar excepciones específicas de HTTP en un servidor NestJS, facilitando la gestión de errores y el control de acceso. */
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor( //inyeccion de servicios
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
   private readonly mailService: MailService, 
  ) {}

  async register(name: string, email: string, password: string) {
    try {
      console.log(' Registrando usuario:', { name, email, password });
  
      // Verificar si el usuario ya existe
      const existingUser = await this.prismaService.usuario.findUnique({
        where: { email },
      });
  
      if (existingUser) {
        console.log('El usuario ya existe:', existingUser);
        throw new HttpException('El correo electrónico ya está en uso', HttpStatus.BAD_REQUEST);
      }
  
      console.log('Encriptando la contraseña');
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Contraseña encriptada:', hashedPassword);
  
      // Creamos el usuario en la base de datos 
      const user = await this.prismaService.usuario.create({
        data: {
          nombre: name, // Mapeamos 'name' a 'nombre'
          email,
          contraseña: hashedPassword,  // Mapeamos 'password' a 'contraseña'
        },
      });
      console.log('Usuario creado correctamente:', user);


  // Enviamos el CORREO DE BIENVENIDA
    try {
      await this.mailService.sendMail(
        user.email,
        'Bienvenido a DinoDevs',
        `<h1>¡Hola ${user.nombre}!</h1><p>Gracias por registrarte en DinoDevs. ¡Esperamos que te diviertas aprendiendo!</p>`
      );
      console.log('Correo de bienvenida enviado a:', user.email);
    } catch (emailError) {
      console.error('Error enviando correo de bienvenida:', emailError.message);
    }

// generamos el JWT
/*cuando el usuario es creado en la base de datos (después de encriptar la contraseña y 
verificar que no existe ya un usuario con el mismo correo electrónico), se genera un token JWT 
para ese nuevo usuario. Este token se devuelve junto con la información básica del usuario.
Este token es utilizado para autenticar al usuario en futuras solicitudes, ya que es un mecanismo 
común en APIs para mantener la sesión activa.
 */      const payload = { userId: user.id };
      const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET || 'clave_secreta',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
      });
  
      return { user, token };

    } catch (error) {
      console.error('Error en register:', error);
      throw new HttpException(
        `Error al registrar usuario: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  // Lógica de inicio de sesión
  async login(email: string, password: string) {
    try {
      const user = await this.prismaService.usuario.findUnique({
        where: { email },
      });

      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      // Comparar la contraseña
      const isPasswordValid = await bcrypt.compare(password, user.contraseña);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Contraseña incorrecta');
      }

      // Generar el token JWT 
      const payload = { userId: user.id }; // Datos que se quieren incluir en el token
      const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET || 'secreto', // Usar una variable de entorno para el secreto
        expiresIn: '1h', 
      });

      // Retornar el token y la información básica del usuario
      return {
        token,
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
        },
      };
    } catch (error) {
      console.log(error); 
      throw new HttpException('Error al iniciar sesión', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
